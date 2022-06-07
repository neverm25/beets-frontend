import { Box, Text, Container, Heading, VStack, useTheme, Flex, Button } from '@chakra-ui/react';
import { useBoolean } from '@chakra-ui/hooks';
import { ChevronsDown } from 'react-feather';
import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, useAnimation, motion } from 'framer-motion';
import TokenSelect from '~/components/token-select/TokenSelect';
import { GqlSorSwapType, useGetTokenPricesQuery } from '~/apollo/generated/graphql-codegen-generated';
import TokenInput from '~/components/inputs/TokenInput';
import Card from '~/components/card/Card';
import BeetsButton from '~/components/button/Button';
import { tradeContextVar, tradeStateVar, useTrade } from '../lib/useTrade';
import { TokenInputSwapButton } from '~/modules/trade/components/TokenInputSwapButton';
import { useGetTokens } from '~/lib/global/useToken';
import { useDebouncedCallback } from 'use-debounce';
import { formatUnits } from '@ethersproject/units';
import { useReactiveVar } from '@apollo/client';
import { oldBnumToFixed } from '~/lib/services/pool/lib/old-big-number';

interface TradeCardState {
    buyAmount: string;
    sellAmount: string;
    isFetching: boolean;
}

function useTradeCard() {
    const { tradeState, loadSwaps: _loadSwaps, loadingSwaps, tradeContext, clearSwaps } = useTrade();
    const { tokens, getToken } = useGetTokens();

    // refetching the swaps may not always trigger the query loading state,
    // so we use a fallback flag to make sure that we always have some loading
    // even if the query is retrieving the 'same' value from the cache.
    const [isFetching, setIsFetching] = useBoolean();
    const [tokenSelectKey, setTokenSelectKey] = useState<'tokenIn' | 'tokenOut'>('tokenIn');

    const [sellAmount, setSellAmount] = useState<string>('');
    const [buyAmount, setBuyAmount] = useState<string>('');

    const isLoadingOrFetching = loadingSwaps || isFetching;

    useEffect(() => {
        tradeStateVar({
            ...tradeState,
            tokenIn: tradeState.tokenIn,
            tokenOut: tradeState.tokenOut,
        });
    }, []);

    const fetchTrade = async (type: GqlSorSwapType, amount: string) => {
        tradeStateVar({
            ...tradeState,
            swapType: type,
            swapAmount: amount,
        });

        tradeContextVar({
            ...tradeContext,
            isPreviewVisible: false,
        });

        const trade = await _loadSwaps(type, amount);
        const resultAmount = trade?.returnAmount || '0';
        const resultAmountFixed = resultAmount ? oldBnumToFixed(resultAmount, 6) : '';

        if (type === 'EXACT_IN') {
            setBuyAmount(resultAmountFixed);
        } else {
            setSellAmount(resultAmountFixed);
        }
        setIsFetching.off();
    };

    const dFetchTrade = useDebouncedCallback((type: 'EXACT_IN' | 'EXACT_OUT', amount: string) => {
        fetchTrade(type, amount);
    }, 300);

    const handleSellAmountChanged = async (event: FormEvent<HTMLInputElement>) => {
        const amount = event.currentTarget.value;

        if (amount === '' || parseFloat(amount) === 0) {
            dFetchTrade.cancel();
            setSellAmount(amount);
            setBuyAmount('');
            setIsFetching.off();
            clearSwaps();
        } else {
            setIsFetching.on();
            dFetchTrade('EXACT_IN', amount);
            setSellAmount(amount);
        }
    };

    const handleBuyAmountChanged = async (event: FormEvent<HTMLInputElement>) => {
        const amount = event.currentTarget.value;

        if (amount === '' || parseFloat(amount) === 0) {
            dFetchTrade.cancel();
            setBuyAmount(amount);
            setSellAmount('');
            setIsFetching.off();
            clearSwaps();
        } else {
            setIsFetching.on();
            dFetchTrade('EXACT_OUT', amount);
            setBuyAmount(amount);
        }
    };

    const handleTokenSelected = (address: string) => {
        tradeState[tokenSelectKey] = address;
        setIsFetching.on();
        dFetchTrade('EXACT_IN', sellAmount);
    };

    const handleTokensSwitched = () => {
        const sellTokenBeforeSwitch = tradeState.tokenIn;

        tradeState.tokenIn = tradeState.tokenOut;
        tradeState.tokenOut = sellTokenBeforeSwitch;

        setBuyAmount(sellAmount);
        setSellAmount(buyAmount);
    };

    const handleReviewClicked = () => {
        tradeContextVar({
            ...tradeContext,
            isPreviewVisible: true,
        });
    };

    return {
        tokenIn: tradeState.tokenIn,
        tokenOut: tradeState.tokenOut,
        tokenSelectKey,
        sellAmount,
        buyAmount,
        isLoadingOrFetching,
        setTokenSelectKey,
        handleTokenSelected,
        handleSellAmountChanged,
        handleBuyAmountChanged,
        handleTokensSwitched,
        handleReviewClicked,
    };
}

function TradeCard() {
    const controls = useAnimation();
    const [showTokenSelect, setShowTokenSelect] = useBoolean();

    const {
        sellAmount,
        buyAmount,
        isLoadingOrFetching,
        tokenSelectKey,
        tokenIn,
        tokenOut,
        setTokenSelectKey,
        handleTokenSelected,
        handleBuyAmountChanged,
        handleSellAmountChanged,
        handleTokensSwitched,
        handleReviewClicked,
    } = useTradeCard();

    const isReviewDisabled = parseFloat(sellAmount || '0') === 0.0 || parseFloat(buyAmount || '0') === 0.0;

    const toggleTokenSelect = (tokenKey: 'tokenIn' | 'tokenOut') => () => {
        setShowTokenSelect.toggle();
        setTokenSelectKey(tokenKey);
        if (!showTokenSelect) {
            controls.set({ position: 'absolute', top: '0', height: 'fit-content' });
            controls.start({
                scale: 0.9,
                opacity: 0,
                transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                },
            });
        } else {
            controls.set({
                translateX: '0px',
                translateY: '0px',
                opacity: 1,
                position: 'absolute',
            });
            controls.start({
                scale: 1,
                opacity: 1,
                transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                },
            });
        }
    };

    return (
        <Box width="full" position="relative">
            <Card animate={controls} title="Swap" position="relative" height="md" shadow="lg">
                <VStack spacing="2" padding="4" width="full">
                    <Box position="relative" width="full">
                        <TokenInput
                            label="Sell"
                            address={tokenIn}
                            toggleTokenSelect={toggleTokenSelect('tokenIn')}
                            onChange={handleSellAmountChanged}
                            value={sellAmount}
                        />
                        <TokenInputSwapButton onSwap={handleTokensSwitched} isLoading={isLoadingOrFetching} />
                    </Box>
                    <TokenInput
                        label="Buy"
                        address={tokenOut}
                        toggleTokenSelect={toggleTokenSelect('tokenOut')}
                        onChange={handleBuyAmountChanged}
                        value={buyAmount}
                    />
                    <Box width="full" paddingTop="2">
                        <BeetsButton disabled={isReviewDisabled} onClick={handleReviewClicked} isFullWidth size="lg">
                            Review Swap
                        </BeetsButton>
                    </Box>
                </VStack>
            </Card>
            <AnimatePresence>
                {showTokenSelect && (
                    <TokenSelect onTokenSelected={handleTokenSelected} onClose={toggleTokenSelect(tokenSelectKey)} />
                )}
            </AnimatePresence>
        </Box>
    );
}
export default TradeCard;