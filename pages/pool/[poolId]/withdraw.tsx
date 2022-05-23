import { useRouter } from 'next/router';
import { GetPoolQuery, GetPoolQueryVariables, GqlPoolUnion } from '~/apollo/generated/graphql-codegen-generated';
import { initializeApolloClient, loadApolloState } from '~/apollo/client';
import { GetPool } from '~/apollo/generated/operations';
import PoolWithdraw from '~/modules/pool/withdraw/PoolWithdraw';
import { PoolProvider } from '~/modules/pool/components/PoolProvider';

interface Props {
    pool: GqlPoolUnion;
}

const Withdraw = ({ pool }: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Rendering fallback...</div>;
    }

    return (
        <PoolProvider pool={pool}>
            <PoolWithdraw />
        </PoolProvider>
    );
};

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps({ params }: { params: { poolId: string } }) {
    const client = initializeApolloClient();
    const { data } = await client.query<GetPoolQuery, GetPoolQueryVariables>({
        query: GetPool,
        variables: { id: params.poolId },
    });

    return loadApolloState({
        client,
        props: { pool: data.pool },
    });
}

export default Withdraw;