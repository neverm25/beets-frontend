import { Box, VStack, Heading, HStack, Divider, Spacer, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { WalletConnectButton } from '~/components/button/WalletConnectButton';
import Card from '~/components/card/Card';
import { FtmTokenInput } from '~/components/inputs/FtmTokenInput';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useEffect, useState } from 'react';
import { useSftmxGetCalculatePenalty } from './useSftmxGetCalculatePenalty';
import { formatFixed } from '@ethersproject/bignumber';
import { SftmxUnstakeButton } from './SftmxUnstakeButton';
import { useSftmxGetFtmxAmountForFtm } from './useSftmxGetFtmxAmountForFtm';
import { InfoButton } from '~/components/info-button/InfoButton';

export default function SftmxUnstakeTab() {
    const [amount, setAmount] = useState('');
    const [sftmxAmount, setSftmxAmount] = useState('');
    const { isConnected } = useUserAccount();
    const { data: sftmxAmountData, isLoading: isLoadingSftmxAmountData } = useSftmxGetFtmxAmountForFtm('1'); // set to 1 FTM to get current rate
    const { data: penaltyData, isLoading: isLoadingPenaltyData } = useSftmxGetCalculatePenalty(amount);

    useEffect(() => {
        if (!isLoadingSftmxAmountData && sftmxAmountData) {
            setSftmxAmount(formatFixed(sftmxAmountData.amountSftmx, 18));
        }
    }, [isLoadingSftmxAmountData, sftmxAmountData]);

    const exchangeRateFtm = 1 / parseFloat(sftmxAmount);

    return (
        <Card shadow="lg" h="full">
            <VStack spacing="4" p={{ base: '4', lg: '8' }} align="flex-start" h="full">
                <Heading size="md">Enter amount to unstake</Heading>
                <FtmTokenInput
                    address={networkConfig.sftmx.address}
                    label="Unstake"
                    value={amount}
                    onChange={setAmount}
                />
                <HStack w="full" justifyContent="space-between">
                    <Text>You will get</Text>
                    <Text>
                        {`${
                            amount && amount !== '0' && !isLoadingSftmxAmountData
                                ? tokenFormatAmount(parseFloat(amount) * exchangeRateFtm)
                                : '--'
                        } FTM`}
                    </Text>
                </HStack>
                <Divider w="full" />
                <HStack w="full" justifyContent="space-between">
                    <Text>1 sFTMX is</Text>
                    <Text>{isLoadingSftmxAmountData ? '-' : tokenFormatAmount(exchangeRateFtm)} FTM</Text>
                </HStack>
                <HStack w="full" justifyContent="space-between">
                    <InfoButton label="Penalty" infoText="explainer text" />
                    <Text>
                        {penaltyData && !isLoadingPenaltyData ? formatFixed(penaltyData.amountPenalty, 18) : '-'}%
                    </Text>
                </HStack>
                <Spacer />
                <Alert status="warning" mb="4">
                    <AlertIcon />
                    Unstaked FTM will be withdrawable after 7 days
                </Alert>
                <Box w="full">
                    {!isConnected && <WalletConnectButton width="full" size="lg" />}
                    {isConnected && (
                        <SftmxUnstakeButton
                            amount={amount}
                            penalty={penaltyData?.amountPenalty}
                            onConfirmed={() => setAmount('')}
                        />
                    )}
                </Box>
            </VStack>
        </Card>
    );
}
