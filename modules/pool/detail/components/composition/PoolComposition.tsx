/* eslint-disable react/jsx-key */
// https://github.com/TanStack/table/discussions/2647
import {
    Box,
    Flex,
    FormLabel,
    HStack,
    Progress,
    Spacer,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { CornerDownRight } from 'react-feather';
import { useExpanded, useTable } from 'react-table';

import Card from '~/components/card/Card';
import React from 'react';
import TokenAvatar from '~/components/token/TokenAvatar';
import numeral from 'numeral';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useGetTokens } from '~/lib/global/useToken';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { usePoolUserInvestedTokenBalances } from '~/modules/pool/lib/usePoolUserInvestedTokenBalances';
import { usePool } from '~/modules/pool/lib/usePool';
import { GqlPoolTokenUnion } from '~/apollo/generated/graphql-codegen-generated';

interface TableDataTemplate {
    symbol: string;
    name: string;
    weight: string | number;
    myBalance: string;
    myValue: string;
    balance: string;
    value: string;
}

interface TableData extends TableDataTemplate {
    subRows?: TableDataTemplate[];
}

enum Columns {
    Expander = 'expander',
    Symbol = 'symbol',
    Name = 'name',
    Weight = 'weight',
    MyBalance = 'myBalance',
    MyValue = 'myValue',
    Balance = 'balance',
    Value = 'value',
}

function PoolCompositionTable({ columns, data, hasBpt, hasNestedTokens }: any) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        toggleAllRowsExpanded,
        state: { expanded },
    } = useTable(
        {
            columns,
            data,
            autoResetExpanded: false,
        },
        useExpanded,
    );

    function parseCell(cell: any) {
        // hide the 'collapse all' button when there are NO tokens in the pool have nested tokens
        if (cell.column.id === Columns.Expander && !hasNestedTokens) {
            cell.column.toggleHidden(true);
        } else if (cell.column.id === Columns.Symbol) {
            const value = cell.value.split('--'); // here we split the 'symbol' & 'address' values to use the separately
            return (
                <HStack>
                    {cell.row.depth > 0 ? (
                        <Box color="whiteAlpha.400" paddingLeft={cell.row.depth === 1 ? '2' : '12'}>
                            <CornerDownRight />
                        </Box>
                    ) : null}
                    <TokenAvatar size="xs" address={value[1]} />
                    <Text fontSize="sm" color="beets.base.50">
                        {value[0]}
                    </Text>
                </HStack>
            );
        } else if (cell.column.id === Columns.Weight) {
            // only show the progress bar for the pool tokenWithAmount and not for any nested tokens
            if (cell.row.depth === 0) {
                return <Progress width="80%" rounded="lg" value={parseFloat(cell.value || '0') * 100} />;
            } else {
                return null;
            }
        } else if (cell.column.id === Columns.MyBalance || cell.column.id === Columns.MyValue) {
            // hide the 'My Balance' & 'My Value' columns when the user has no BPT
            if (!hasBpt) {
                cell.column.toggleHidden(true);
                // or else don't display anything for nested tokens
            } else if (cell.row.depth > 0) {
                return null;
                // or else just display the value
            } else {
                return cell.render('Cell');
            }
            // else just display the value
        } else {
            return cell.render('Cell');
        }
    }

    return (
        <>
            {hasNestedTokens && (
                <Flex justifyContent="flex-end">
                    <Spacer />
                    <Flex>
                        <FormLabel htmlFor="nested-tokens" mb="0">
                            Show nested tokens?
                        </FormLabel>
                        <Switch id="nested-tokens" onChange={() => toggleAllRowsExpanded()} />
                    </Flex>
                </Flex>
            )}
            <TableContainer>
                <Table {...getTableProps()} style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}>
                    <Thead width="full" paddingX="2">
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        {...column.getHeaderProps()}
                                        border="none"
                                        padding={column.id === Columns.Expander ? '0' : '2'}
                                    >
                                        {column.id === Columns.Expander ? (
                                            <Box color="beets.base.50">{column.render('Header')}</Box>
                                        ) : (
                                            <Text fontSize="xs" color="beets.base.50">
                                                {column.render('Header')}
                                            </Text>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()} padding="2" width="full" background="whiteAlpha.100">
                                    {row.cells.map((cell, i) => {
                                        return (
                                            <Td
                                                {...cell.getCellProps()}
                                                borderBottom="0"
                                                p="2"
                                                marginBottom="4"
                                                borderTopLeftRadius={i == 0 ? 'lg' : undefined}
                                                borderBottomLeftRadius={i == 0 ? 'lg' : undefined}
                                                borderTopRightRadius={i == row.cells.length - 1 ? 'lg' : undefined}
                                                borderBottomRightRadius={i == row.cells.length - 1 ? 'lg' : undefined}
                                            >
                                                {parseCell(cell)}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export function PoolComposition() {
    const { pool } = usePool();
    const { hasBpt } = usePoolUserBptBalance();
    const { getUserInvestedBalance } = usePoolUserInvestedTokenBalances();
    const { priceFor } = useGetTokens();
    const hasNestedTokens = pool.tokens.some((token) =>
        ['GqlPoolTokenLinear', 'GqlPoolTokenPhantomStable'].includes(token.__typename),
    );

    const columns = [
        {
            Header: 'Symbol',
            accessor: Columns.Symbol,
        },
        {
            Header: 'Name',
            accessor: Columns.Name,
        },
        {
            Header: 'Weight',
            accessor: Columns.Weight,
        },
        {
            Header: 'My balance',
            accessor: Columns.MyBalance,
        },
        {
            Header: 'My value',
            accessor: Columns.MyValue,
        },
        {
            Header: 'Balance',
            accessor: Columns.Balance,
        },
        {
            Header: 'Value',
            accessor: Columns.Value,
        },
    ];

    const getTokenData = (tokens: GqlPoolTokenUnion[]): TableData[] => {
        return tokens.map((token) => {
            const userBalance = getUserInvestedBalance(token.address);
            const tokenPrice = priceFor(token.address);
            const totalTokenValue = parseFloat(token.balance) * tokenPrice;
            return {
                symbol: `${token.symbol}--${token.address}`,
                name: token.name,
                weight: token.weight ?? totalTokenValue / parseFloat(pool.dynamicData.totalLiquidity),
                myBalance: tokenFormatAmount(userBalance),
                myValue: numeral(parseFloat(userBalance) * tokenPrice).format('$0,0.00a'),
                balance: tokenFormatAmount(token.balance),
                value: numeral(totalTokenValue).format('$0,0.00a'),
                ...(hasNestedTokens && 'pool' in token && { subRows: getTokenData(token.pool.tokens) }),
            };
        });
    };

    const data = getTokenData(pool.tokens);

    return (
        <Card px="2" py="2" mt={4} width="full">
            <PoolCompositionTable
                columns={columns}
                data={data}
                hasBpt={hasBpt && !hasNestedTokens}
                hasNestedTokens={hasNestedTokens}
            />
        </Card>
    );
}
