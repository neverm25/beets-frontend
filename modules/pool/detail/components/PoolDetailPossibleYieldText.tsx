import { Flex, Link, Text } from '@chakra-ui/react';
import numeral from 'numeral';
import { usePool } from '~/modules/pool/lib/usePool';
import { usePoolUserPoolTokenBalances } from '~/modules/pool/lib/usePoolUserPoolTokenBalances';
import { usePoolUserDepositBalance } from '~/modules/pool/lib/usePoolUserDepositBalance';

const DEFAULT_AMOUNT = 2000;

export function PoolDetailPossibleYieldText() {
    const { pool, totalApr } = usePool();
    const { investableAmount, hasBpt } = usePoolUserPoolTokenBalances();
    const { data, userPoolBalanceUSD, isLoading } = usePoolUserDepositBalance();
    const weeklyYield = totalApr / 52;
    const userHasBalance = userPoolBalanceUSD > 100;
    const weeklyYieldUSD = (userHasBalance ? userPoolBalanceUSD : DEFAULT_AMOUNT) * weeklyYield;

    return (
        <>
            <Text fontSize="xl" fontWeight="bold" flex={1} textAlign="center">
                At{' '}
                <Text fontSize="3xl" display="inline" color="beets.green.300" as="span">
                    {` ${numeral(totalApr).format('0.00%')} `}
                </Text>{' '}
                APR, you could earn
                <Text fontSize="3xl" display="inline" color="beets.green.300" as="span">
                    {` ${numeral(weeklyYield).format('0.00%')} `}
                </Text>
                or approx
                <Text fontSize="3xl" display="inline" color="beets.green.300" as="span">
                    {isLoading ? ' -- ' : ` ${numeral(weeklyYieldUSD).format('$0,0.00')} `}
                </Text>
                in the next week
                {!userHasBalance ? (
                    <>
                        {' '}
                        if you invest
                        <Text fontSize="3xl" display="inline" color="beets.green.300" as="span">
                            {isLoading ? ' -- ' : ` ${numeral(DEFAULT_AMOUNT).format('$0,0')}`}
                        </Text>{' '}
                        into this pool.
                    </>
                ) : (
                    '.'
                )}
            </Text>
            <Flex justifyContent="center" mt={4}>
                <Link textDecoration="underline" color="beets.green.400">
                    Show detailed breakdown
                </Link>
            </Flex>
        </>
    );
}