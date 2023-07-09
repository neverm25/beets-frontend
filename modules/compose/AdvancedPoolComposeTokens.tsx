import { Box, Button, HStack, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useCompose } from './ComposeProvider';
import { TokenInput } from '~/components/inputs/TokenInput';
import TokenRow from '~/components/token/TokenRow';
import Card from '~/components/card/Card';
import { Plus, X } from 'react-feather';
import { BeetsBox } from '~/components/box/BeetsBox';
import BeetsTooltip from '~/components/tooltip/BeetsTooltip';
import { TokenSelectModal } from '~/components/token-select/TokenSelectModal';
import { GenericTokenSelectModal } from '~/components/token-select/GenericTokenSelectModal';
import { ToastType, useToast } from '~/components/toast/BeetsToast';

interface Props {}

function AddTokenButton(_: any) {
    const { addBlankToken, removeTokenByAddress, removeTokenByIndex } = useCompose();
    return (
        <Button onClick={addBlankToken} width="full">
            <Plus />
        </Button>
    );
}

export default function AdvancedPoolComposeTokens(props: Props) {
    const { poolTypes, tokens, MAX_TOKENS, removeTokenByAddress, removeTokenByIndex, setTokens } = useCompose();
    const [activeTokenSelectIndex, setActiveTokenSelectIndex] = useState<number | null>(null);
    const tokenSelectDisclosure = useDisclosure();
    const { showToast, removeToast } = useToast();
    const isMaxTokens = tokens.length === MAX_TOKENS;
    const finalRefTokenIn = useRef(null);

    function removeToken(tokenAddress: string, index: number) {
        if (!tokenAddress) {
            removeTokenByIndex(index);
        } else {
            removeTokenByAddress(tokenAddress);
        }
    }

    function showTokenSelect(tokenIndex: number) {
        setActiveTokenSelectIndex(tokenIndex);
        tokenSelectDisclosure.onOpen();
    }

    function handleTokenSelectedForIndex(tokenIndex: number | null) {
        if (tokenIndex === null) return (address: string) => {};
        return function (address: string) {
            if (tokens.find((token) => token.address === address)) {
                showToast({
                    id: 'compose-existing-token',
                    content: 'You already have this token added',
                    auto: true,
                    type: ToastType.Error,
                });
                return;
            }
            const newTokens = [...tokens];
            newTokens[tokenIndex] = {
                ...newTokens[tokenIndex],
                address: address,
            };
            setTokens(newTokens);
        };
    }

    function handleTokenAmountChangedForIndex(tokenIndex: number | null) {
        // type doesn't matter here, just a blank event
        if (tokenIndex === null) return (event: any) => {};
        return function (event: { currentTarget: { value: string } }) {
            const newTokens = [...tokens];
            newTokens[tokenIndex] = {
                ...newTokens[tokenIndex],
                amount: event.currentTarget.value,
            };
            console.log('newTokens', newTokens);
            setTokens(newTokens);
        };
    }

    return (
        <Card py="3" px="3" width="100%">
            <VStack spacing="2" width="full" alignItems="flex-start">
                <VStack width="full" spacing="3">
                    <VStack spacing="1" width="full" alignItems="flex-start">
                        <Heading size="sm">Choose tokens</Heading>
                        <Text lineHeight="1rem" fontSize="0.85rem">
                            Customize the weight of each pool token and the amount of liquidity you want to seed for
                            each. You can add up to 8 tokens.
                        </Text>
                    </VStack>
                    <VStack width="full" spacing="2">
                        {tokens.map((token, i) => (
                            <HStack key={`compose-token-select-${token}-${i}`} width="full">
                                <BeetsBox width="full" pl="2" pr="3" py="2" key={`${token.address}-${i}`}>
                                    <HStack width="full" spacing="4">
                                        <VStack spacing="0" width="full">
                                            <TokenInput
                                                toggleTokenSelect={() => showTokenSelect(i)}
                                                address={token.address}
                                                value={token.amount}
                                                onChange={handleTokenAmountChangedForIndex(i)}
                                            />
                                        </VStack>
                                        <BeetsTooltip noImage label="Remove this token">
                                            <Button
                                                onClick={() => removeToken(token.address, i)}
                                                bg="red.500"
                                                _hover={{ bg: 'red.600' }}
                                                rounded="full"
                                                p="0"
                                            >
                                                <X width="12px" />
                                            </Button>
                                        </BeetsTooltip>
                                    </HStack>
                                </BeetsBox>
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
                {!isMaxTokens && (
                    <HStack width="full">
                        <AddTokenButton />
                    </HStack>
                )}
            </VStack>
            <GenericTokenSelectModal
                finalFocusRef={finalRefTokenIn}
                isOpen={tokenSelectDisclosure.isOpen}
                onOpen={tokenSelectDisclosure.onOpen}
                onClose={tokenSelectDisclosure.onClose}
                handleTokenSelected={handleTokenSelectedForIndex(activeTokenSelectIndex)}
                title="Choose a token"
            />
        </Card>
    );
}
