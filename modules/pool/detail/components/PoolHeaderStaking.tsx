import { networkConfig } from '~/lib/config/network-config';
import { PoolHeaderStakingAura } from './thirdparty/PoolHeaderStakingAura';
import { PoolHeaderStakingFmoney } from './thirdparty/PoolHeaderStakingFmoney';

export function PoolHeaderStaking({ poolId }: { poolId: string }) {
    const name = networkConfig.thirdPartyStakingPools.find((pool) => pool.poolId === poolId)?.name;

    switch (name) {
        case 'aura':
            return <PoolHeaderStakingAura poolId={poolId} />;
        case 'fmoney':
            return <PoolHeaderStakingFmoney poolId={poolId} />;
        default:
            return null;
    }
}
