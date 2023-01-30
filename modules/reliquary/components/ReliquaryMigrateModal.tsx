import React, { useMemo, useRef, useState } from 'react';
import TokenRow from '~/components/token/TokenRow';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalOverlay,
    Select,
    StackDivider,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { BeetsTransactionStepsSubmit, TransactionStep } from '~/components/button/BeetsTransactionStepsSubmit';
import { BeetsModalContent } from '~/components/modal/BeetsModal';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useStakingWithdraw } from '~/lib/global/useStakingWithdraw';
import { useGetTokens } from '~/lib/global/useToken';
import { useHasBatchRelayerApproval } from '~/lib/util/useHasBatchRelayerApproval';
import { useUserAllowances } from '~/lib/util/useUserAllowances';
import { useLegacyFBeetsBalance } from '../lib/useLegacyFbeetsBalance';
import { useReliquaryFbeetsMigrateContractCallData } from '../lib/useReliquaryFbeetsMigrateContractCallData';
import { useReliquaryZap } from '../lib/useReliquaryZap';
import useReliquary from '../lib/useReliquary';
import { BeetsBox } from '~/components/box/BeetsBox';
import { ReliquaryFarmPosition } from '~/lib/services/staking/reliquary.service';
import { ChevronDown } from 'react-feather';
import BeetsTooltip from '~/components/tooltip/BeetsTooltip';

export default function ReliquaryMigrateModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [migrationTarget, setMigrationTarget] = useState<number | undefined>(undefined);

    const initialRef = useRef(null);
    const networkConfig = useNetworkConfig();

    const { getToken } = useGetTokens();
    const legacyfBeets = getToken(networkConfig.fbeets.address);

    const { legacyBptBalance, legacyFbeetsBalance, relicPositions } = useReliquary();
    const { data: hasBatchRelayerApproval, isLoading: isLoadingBatchRelayerApproval } = useHasBatchRelayerApproval();
    const { staked, isLoading: isLoadingLegacyFbeetsBalance, unstaked } = useLegacyFBeetsBalance();
    const { reliquaryZap, ...reliquaryMigrateQuery } = useReliquaryZap('MIGRATE');
    const { data: reliquaryContractCalls } = useReliquaryFbeetsMigrateContractCallData(migrationTarget);
    // TODO FIX TYPE
    const { withdraw, ...unstakeQuery } = useStakingWithdraw({
        farm: { id: networkConfig.fbeets.farmId, type: 'FRESH_BEETS' },
    } as any);
    const {
        hasApprovalForAmount,
        isLoading: isLoadingUserAllowances,
        data: allowances,
    } = useUserAllowances([legacyfBeets], networkConfig.balancer.vault);

    const steps = useMemo<TransactionStep[]>(() => {
        const _steps: TransactionStep[] = [
            {
                id: 'reliquary-migrate',
                type: 'other',
                buttonText: 'Migrate',
                tooltipText: 'Migrate your old fBeets to a relic',
            },
        ];

        // migrate pre-requisites
        if (!hasBatchRelayerApproval) {
            _steps.unshift({
                id: 'batch-relayer',
                type: 'other',
                buttonText: 'Approve Batch Relayer',
                tooltipText: 'The migration flow requires you to approve the batch relayer.',
            });
        }

        // unstake fbeets
        if (parseFloat(staked || '0') > 0) {
            _steps.unshift({
                id: 'unstake',
                tooltipText: 'Unstake your fBEETS',
                type: 'other',
                buttonText: 'Unstake fBEETS',
            });
        }
        // approve the vault to spend legacy fbeets
        if (!hasApprovalForAmount(networkConfig.fbeets.address, unstaked) && legacyfBeets) {
            _steps.unshift({
                id: 'approve-vault',
                tooltipText: 'Approve the vault to spend your fBEETS',
                type: 'tokenApproval',
                buttonText: 'Approve Vault',
                token: {
                    ...(legacyfBeets || {}),
                    amount: unstaked,
                },
            });
        }

        return _steps;
    }, [
        hasBatchRelayerApproval,
        isLoadingBatchRelayerApproval,
        isLoadingLegacyFbeetsBalance,
        staked,
        allowances,
        isLoadingUserAllowances,
        legacyfBeets,
    ]);

    const isComplete = legacyFbeetsBalance === 0 && parseFloat(legacyBptBalance) === 0;
    return (
        <Box width={{ base: 'full', md: 'fit-content' }}>
            <Button variant="primary" onClick={onOpen} width={{ base: 'full', md: 'fit-content' }}>
                Migrate
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg" initialFocusRef={initialRef}>
                <ModalOverlay bg="blackAlpha.900" />
                <BeetsModalContent width="full">
                    <AnimatePresence>
                        <Box p="4" width="full">
                            <VStack spacing="4" width="full">
                                <VStack width="full" alignItems="flex-start">
                                    <Heading fontSize="1.25rem">Migrate to a relic</Heading>
                                    <VStack spacing="1" width="full" alignItems="flex-start">
                                        <Text>
                                            To get started with a Relic, let's begin by migrating your old fBEETS stake
                                            and BPT to a relic.
                                        </Text>
                                        {!isComplete && (
                                            <Text>Your existing stake and BPT balances are shown below.</Text>
                                        )}
                                    </VStack>
                                </VStack>
                                {isComplete && (
                                    <Alert status="success">
                                        <AlertIcon />
                                        You've successfully migrated your fBeets to a relic. Click return and check out
                                        your new relic.
                                    </Alert>
                                )}

                                {!isComplete && (
                                    <BeetsBox width="full">
                                        <VStack
                                            width="full"
                                            divider={<StackDivider borderColor="whiteAlpha.200" />}
                                            p="4"
                                        >
                                            {legacyFbeetsBalance > 0 && (
                                                <TokenRow
                                                    address={networkConfig.fbeets.address}
                                                    amount={legacyFbeetsBalance.toString()}
                                                />
                                            )}
                                            {parseFloat(legacyBptBalance) > 0 && (
                                                <TokenRow
                                                    address={networkConfig.fbeets.poolAddress}
                                                    amount={legacyBptBalance}
                                                />
                                            )}
                                        </VStack>
                                    </BeetsBox>
                                )}
                                {!isComplete && relicPositions.length > 0 && (
                                    <VStack width="full" alignItems='flex-start'>
                                        <Text>Choose where to migrate your balance to:</Text>
                                        <Select
                                            value={migrationTarget}
                                            onChange={(e) =>
                                                setMigrationTarget(
                                                    e.currentTarget.value === undefined
                                                        ? undefined
                                                        : parseInt(e.currentTarget.value, 10),
                                                )
                                            }
                                            width="full"
                                            variant="filled"
                                        >
                                            <option value={undefined}>New relic</option>
                                            {relicPositions.map((relic) => (
                                                <option
                                                    value={relic.relicId}
                                                    key={`migrate-to-${relic.relicId}`}
                                                    onClick={() => setMigrationTarget(parseInt(relic.relicId, 10))}
                                                >
                                                    <Box flex="1">
                                                        Relic {relic.relicId} - Level {relic.level}
                                                    </Box>
                                                </option>
                                            ))}
                                        </Select>
                                    </VStack>
                                )}
                                <Box width="full">
                                    <BeetsTransactionStepsSubmit
                                        // TODO implement hide hide modal
                                        onCompleteButtonClick={onClose}
                                        loadingButtonText="Migrate"
                                        completeButtonText="Return"
                                        onSubmit={(id) => {
                                            if (id === 'unstake') {
                                                withdraw(staked.toString());
                                            }
                                            if (id === 'reliquary-migrate' && reliquaryContractCalls) {
                                                reliquaryZap(reliquaryContractCalls);
                                            }
                                        }}
                                        isLoading={reliquaryMigrateQuery.isSubmitting || unstakeQuery.isSubmitting}
                                        steps={steps}
                                        // TODO redirect to relic UI if not already there
                                        onConfirmed={() => false}
                                        queries={[
                                            { ...unstakeQuery, id: 'unstake' },
                                            { ...reliquaryMigrateQuery, id: 'reliquary-migrate' },
                                        ]}
                                    />
                                </Box>
                            </VStack>
                        </Box>
                    </AnimatePresence>
                </BeetsModalContent>
            </Modal>
        </Box>
    );
}
