import {
    Box,
    Flex,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BeetsBox } from '~/components/box/BeetsBox';
import { tokenFormatAmount, tokenGetAmountForAddress } from '~/lib/services/token/token-util';
import TokenAvatar from '~/components/token/TokenAvatar';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { usePool } from '~/modules/pool/lib/usePool';
import { usePoolUserTokenBalancesInWallet } from '~/modules/pool/lib/usePoolUserTokenBalancesInWallet';
import { useGetTokens } from '~/lib/global/useToken';
import BeetsButton from '~/components/button/Button';
import { PoolInvestSettings } from '~/modules/pool/invest/components/PoolInvestSettings';
import { PoolInvestTokenApproval } from '~/modules/pool/invest/components/PoolInvestTokenApproval';
import { ModalSectionHeadline } from '~/components/modal/ModalSectionHeadline';
import { PoolInvestPriceImpactAndYield } from '~/modules/pool/invest/components/PoolInvestPriceImpactAndYield';
import { TokenSelectInline } from '~/components/token-select-inline/TokenSelectInline';
import { BeetsBoxLineItem } from '~/components/box/BeetsBoxLineItem';

export function PoolInvestProportional() {
    const [sliderValue, setSliderValue] = useState(50);
    const { pool } = usePool();
    const { investableAmount, userPoolTokenBalances, canInvestProportionally } = usePoolUserTokenBalancesInWallet();
    const { priceForAmount } = useGetTokens();
    const investOptions = pool.investConfig.options;

    return (
        <Box>
            <Flex mt="4" mb="4">
                <Box flex="1" mr="8">
                    <ModalSectionHeadline
                        headline="1. Configure token amounts"
                        description="Drag the slider below to configure your investment amount."
                        mb="0"
                    />
                    <Slider
                        mt="12"
                        aria-label="slider-ex-1"
                        defaultValue={50}
                        value={sliderValue}
                        onChange={setSliderValue}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={4} />
                        <SliderMark
                            value={sliderValue}
                            textAlign="center"
                            bg="beets.base.500"
                            color="white"
                            mt="-10"
                            ml="-30px"
                            w="12"
                            fontSize="md"
                            width="60px"
                            borderRadius="md"
                        >
                            {sliderValue}%
                        </SliderMark>
                    </Slider>
                    <BeetsBox mt="4" pt="0.5">
                        {investOptions.map((option, index) => {
                            const tokenOption = option.tokenOptions[0];
                            const userBalance = tokenGetAmountForAddress(tokenOption.address, userPoolTokenBalances);

                            return (
                                <BeetsBoxLineItem
                                    key={tokenOption.address}
                                    last={index === investOptions.length - 1}
                                    pl={option.tokenOptions.length > 1 ? '1.5' : '3'}
                                    leftContent={
                                        option.tokenOptions.length > 1 ? (
                                            <Box flex="1">
                                                <TokenSelectInline
                                                    tokenOptions={option.tokenOptions}
                                                    selectedAddress={option.tokenOptions[0].address}
                                                />
                                            </Box>
                                        ) : (
                                            <HStack spacing="1.5" flex="1">
                                                <TokenAvatar width="20px" height="20px" address={tokenOption.address} />
                                                <Text>{tokenOption.symbol}</Text>
                                            </HStack>
                                        )
                                    }
                                    rightContent={
                                        <Box>
                                            <Box textAlign="right">{tokenFormatAmount(userBalance)}</Box>
                                            <Box textAlign="right" fontSize="sm" color="gray.200">
                                                {numberFormatUSDValue(
                                                    priceForAmount({
                                                        address: tokenOption.address,
                                                        amount: userBalance,
                                                    }),
                                                )}
                                            </Box>
                                        </Box>
                                    }
                                />
                            );
                        })}
                    </BeetsBox>

                    <PoolInvestPriceImpactAndYield mt="4" />
                </Box>
                <Box flex="1">
                    <PoolInvestTokenApproval stepNumber={2} />
                    <PoolInvestSettings mt="6" stepNumber={3} />
                </Box>
            </Flex>
            <BeetsButton isFullWidth mt="4" isDisabled={true}>
                Invest $1,221.22
            </BeetsButton>
        </Box>
    );
}
