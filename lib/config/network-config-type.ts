import { GqlChain } from '~/apollo/generated/graphql-codegen-generated';
export type BoostedByType =
    | 'reaper-aave'
    | 'reaper-aave-granary'
    | 'yearn'
    | 'reaper-sonne'
    | 'overnight'
    | 'reaper'
    | 'beefy-exactly';

export interface PoolDetailWarning {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    link?: {
        url: string;
        text: string;
    };
}

export interface NetworkConfig {
    appName: string;
    chainId: string;
    networkName: string;
    chainName: GqlChain;
    networkShortName: string;
    etherscanName: string;
    etherscanUrl: string;
    testnet: boolean;
    eth: {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        iconUrl: string;
    };
    wethAddress: string;
    wethAddressFormatted: string;
    rpcUrl: string;
    coingecko: {
        nativeAssetId: string;
        platformId: string;
    };
    multicall: string;
    beets: {
        address: string;
    };
    fbeets: {
        address: string;
        farmId: string;
        poolId: string;
        poolAddress: string;
    };
    reliquary: {
        address: string;
        fbeets: {
            poolAddress: string;
            poolId: string;
            farmId: number;
            maxLevel: number;
        };
    };
    balancer: {
        vault: string;
        batchRelayer: string;
        composableStableFactories: string[];
        composableStableV1Factory: string;
        weightedPoolV2PlusFactories: string[];
        linearFactories: {
            erc4626: string[];
            reaper: string[];
        };
        linearRebalancers: { [poolAddress: string]: string };
        reaperManualRebalancer?: string;
        sorQueries: string;
        balancerQueries: string;
        unwrapExceptions: {
            reaper: string[];
        };
    };
    beetsPoolOwnerAddress: string;
    masterChefContractAddress: string;
    defaultTokenIn: string;
    defaultTokenOut: string;
    additionalLinks: { url: string; title: string; subTitle?: string }[];
    farmTypeName: string;
    priceImpact: {
        invest: {
            noticeable: number;
            high: number;
        };
        trade: {
            noticeable: number;
            high: number;
        };
        withdraw: {
            noticeable: number;
            high: number;
        };
    };
    gauge: {
        rewardHelperAddress: string;
    };
    createPoolUrl: string;
    launchUrl?: string;
    stakeUrl?: string;
    warnings: {
        poolDetail: { [poolId: string]: PoolDetailWarning };
        poolInvest: { [poolId: string]: string };
        poolWithdraw: { [poolId: string]: string };
        poolList: { [poolId: string]: string };
    };
    investDisabled: { [poolId: string]: boolean };
    boostedByTypes: {
        [poolId: string]: BoostedByType;
    };
    maBeetsEnabled: boolean;
    claimAllRewardsEnabled: boolean;
}
