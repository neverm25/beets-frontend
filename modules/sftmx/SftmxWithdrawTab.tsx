import { VStack, Text } from '@chakra-ui/react';
import { WalletConnectButton } from '~/components/button/WalletConnectButton';
import Card from '~/components/card/Card';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useSftmxGetWithdrawalRequests } from './lib/useSftmxGetWithdrawalRequests';
import { PaginatedTable } from '~/components/table/PaginatedTable';
import SftmxWithdrawalRequestsHeader from './SftmxWithdrawalRequestsHeader';
import SftmxWithdrawalRequestsRow from './SftmxWithdrawalRequestsRow';
import { useSftmxGetStakingData } from './lib/useSftmxGetStakingData';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';

export default function SftmxWithdrawTab() {
    const { isConnected } = useUserAccount();
    const { data: requestsData, loading: isLoading } = useSftmxGetWithdrawalRequests();
    const { data: stakingData } = useSftmxGetStakingData();

    const requests = orderBy(requestsData?.sftmxGetWithdrawalRequests, 'requestTimestamp', 'desc');
    const skip = 5;
    const [first, setFirst] = useState(0);
    const [requestsView, setRequestsView] = useState(requests.slice(first, skip));

    useEffect(() => {
        const start = first * skip;
        if (requests.length - skip - start < 0) {
            setRequestsView(requests.slice(start));
        } else {
            console.log({ req: requests.slice(start, start + skip) });
            setRequestsView(requests.slice(start, start + skip));
        }
    }, [first]);

    return (
        <Card shadow="lg" h="full" title="Withdrawal requests">
            {!isConnected && (
                <VStack h="full" justifyContent="center" alignItems="center">
                    <WalletConnectButton width="200px" size="lg" />
                </VStack>
            )}
            {isConnected && requests && stakingData && (
                <VStack spacing="4" p="4" align="flex-start" h="full">
                    <Text color="gray.200" fontSize="sm" mt="-8">
                        If you have just unstaked FTM it can take up to 5 minutes before your request is visible here.
                    </Text>
                    <PaginatedTable
                        width="full"
                        items={requestsView}
                        loading={isLoading}
                        renderTableHeader={() => <SftmxWithdrawalRequestsHeader />}
                        renderTableRow={(item) => (
                            <SftmxWithdrawalRequestsRow
                                item={item}
                                withdrawalDelay={stakingData.sftmxGetStakingData.withdrawalDelay}
                            />
                        )}
                        noResultLabel="No withdrawal requests found!"
                        hidePageSizeChange
                        count={requests.length}
                        currentPage={first + 1}
                        onPageChange={(page) => {
                            setFirst(page - 1);
                        }}
                        pageSize={5}
                    />
                </VStack>
            )}
        </Card>
    );
}
