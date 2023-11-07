import { Box, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BeetsTokenApprovalButton } from '~/components/button/BeetsTokenApprovalButton';
import { TokenBase } from '~/lib/services/token/token-types';
import { networkConfig } from '~/lib/config/network-config';
import { BeetsMigrationButton } from './BeetsMigrationButton';
import { useUserAllowances } from '~/lib/util/useUserAllowances';

interface Props {
    beetsBalance: string;
    tokenData: TokenBase | null;
}

export function BeetsMigration({ beetsBalance, tokenData }: Props) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { hasApprovalForAmount, isLoading, refetch } = useUserAllowances([tokenData], networkConfig.beets.migration);
    const hasApprovedToken = hasApprovalForAmount(tokenData?.address || '', beetsBalance);

    return (
        <HStack>
            {isConfirmed && <Text>You have successfully migrated multiBEETS to (lz)BEETS!</Text>}
            {!isConfirmed && (
                <>
                    <Text>You have {beetsBalance} multiBEETS that you can migrate 1:1 to (lz)BEETS.</Text>
                    {hasApprovedToken && (
                        <BeetsMigrationButton
                            amount={beetsBalance}
                            onConfirmed={() => {
                                setIsConfirmed(true);
                            }}
                            inline
                            size="lg"
                            isLoading={isLoading}
                        />
                    )}
                    {!hasApprovedToken && tokenData && (
                        <Box w="200px">
                            <BeetsTokenApprovalButton
                                contractToApprove={networkConfig.beets.migration}
                                tokenWithAmount={{ ...tokenData, amount: beetsBalance }}
                                onConfirmed={() => {
                                    refetch();
                                }}
                                inline
                                size="lg"
                                isLoading={isLoading}
                            />
                        </Box>
                    )}
                </>
            )}
        </HStack>
    );
}
