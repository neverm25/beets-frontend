import { NetworkConfig, PoolDetailWarning } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

// warnings
const poolListWarningString =
    'A vulnerability has been discovered that effects this pool. Existing liquidity providers should remove liquidity immediately, and no new deposits should be made.';
const PoolDetailWarningObject: PoolDetailWarning = {
    id: 'composable-nested-vulnerability',
    message:
        'A vulnerability has been discovered that effects this pool. Existing liquidity providers should remove liquidity immediately, and no new deposits should be made.',
    type: 'warning',
    link: {
        url: 'https://x.com/beethoven_x/status/1694015080717787244',
        text: 'Read more',
    },
};

export const fantomNetworkConfig: NetworkConfig = {
    appName: 'Beethoven X',
    chainId: '250',
    networkName: 'Fantom Opera',
    networkShortName: 'Fantom',
    chainName: 'FANTOM',
    etherscanName: 'FTM Scan',
    etherscanUrl: 'https://ftmscan.com',
    testnet: false,
    eth: {
        name: 'Fantom',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'FTM',
        decimals: 18,
        iconUrl: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png',
        minGasAmount: '0.1',
    },
    wethAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    wethAddressFormatted: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingecko: {
        nativeAssetId: 'fantom',
        platformId: 'fantom',
    },
    rpcUrl: 'https://rpc.ftm.tools',
    //rpcUrl: 'https://rpc.ankr.com/fantom',
    multicall: '0x66335d7ad8011f6aa3f48aadcb523b62b38ed961',
    beets: {
        address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
        migration: AddressZero,
        oldAddress: '',
    },
    fbeets: {
        address: '0xfcef8a994209d6916eb2c86cdd2afd60aa6f54b1',
        farmId: '22',
        poolId: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837000200000000000000000019',
        poolAddress: '0xcdE5a11a4ACB4eE4c805352Cec57E236bdBC3837',
    },
    reliquary: {
        address: '0x1ed6411670c709f4e163854654bd52c74e66d7ec',
        fbeets: {
            poolId: '0x9e4341acef4147196e99d648c5e43b3fc9d026780002000000000000000005ec',
            poolAddress: '0x9e4341acef4147196e99d648c5e43b3fc9d02678',
            farmId: 2,
            maxLevel: 10,
        },
    },
    sftmx: {
        address: '0xd7028092c830b5c8fce061af2e593413ebbc1fc1',
        ftmStakingProxyAddress: '0xB458BfC855ab504a8a327720FcEF98886065529b',
    },
    snapshot: {
        contractAddress: '0x469788fe6e9e9681c6ebf3bf78e7fd26fc015446',
        delegateAddress: '0x641e10Cd6132D3e3FA01bfd65d2e0afCf64b136A', // MD delegator address case sensitive!
        id: '0x62656574732e6574680000000000000000000000000000000000000000000000', // BeethovenX Snapshot id
    },
    balancer: {
        vault: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
        batchRelayer: '0x0faa25293a36241c214f3760c6ff443e1b731981',
        balToken: AddressZero,
        weightedPoolFactory: '0xb841Df73861E65E6D61a80F503F095a91ce75e15',
        linearFactories: {
            erc4626: ['0x89857161e0ad36f8c5a537733c1fcf7145220aae'],
            reaper: ['0xd448c4156b8de31e56fdfc071c8d96459bb28119'],
        },
        linearRebalancers: {
            '0x92502cd8e00f5b8e737b2ba203fdd7cd27b23c8f': '0x377ef852870ff2817e04b20629efdd583db49bac', // wftm
            '0xc385e76e575b2d71eb877c27dcc1608f77fada99': '0x268292559d120e101a38eff1d04e6d20a67334ea', // usdc
            '0x685056d3a4e574b163d0fa05a78f1b0b3aa04a80': '0x8553fdc738521b0408c22897f6ceeed7f753a2c9', // dai
            '0xa0051ab2c3eb7f17758428b02a07cf72eb0ef1a3': '0x6ab39ca2a627f3d3762a47666c2046292097914a', // weth
            '0x3c1420df122ac809b9d1ba77906f833764d64501': '0xb7880303215e8cbcfad05a43ffde1a1396795df1', // wbtc
            '0x442988091cdc18acb8912cd3fe062cda9233f9dc': '0x4e568a948fe772e36b696ac5b11b174e9807dfaa', // fusdt
        },
        reaperManualRebalancer: '0xb4dda8543c1b8991ab81ca40b1e732b2993ebb9f',
        sorQueries: '0x290c793b7779bcdc14ce0f8909739fde12b8b149',
        balancerQueries: '0x1b0a42663df1edea171cd8732d288a81efff6d23',
        unwrapExceptions: {
            reaper: [
                '0x92502cd8e00f5b8e737b2ba203fdd7cd27b23c8f',
                '0xc385e76e575b2d71eb877c27dcc1608f77fada99',
                '0x685056d3a4e574b163d0fa05a78f1b0b3aa04a80',
                '0xa0051ab2c3eb7f17758428b02a07cf72eb0ef1a3',
                '0x3c1420df122ac809b9d1ba77906f833764d64501',
                '0x442988091cdc18acb8912cd3fe062cda9233f9dc',
            ],
        },
        minimumBoost: 1.0,
    },
    rateproviders: { '0xd7028092c830b5c8fce061af2e593413ebbc1fc1': '0x629d4c27057915e59dd94bca8d48c6d80735b521' },
    beetsPoolOwnerAddress: '0xcd983793adb846dce4830c22f30c7ef0c864a776',
    masterChefContractAddress: '0x8166994d9ebBe5829EC86Bd81258149B87faCfd3',
    defaultTokenIn: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    defaultTokenOut: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
    farmTypeName: 'farm',
    additionalLinks: [
        {
            title: 'Vote',
            url: 'https://snapshot.org/#/beets.eth',
        },
        {
            title: 'Analytics',
            url: 'https://info.beets.fi',
        },
        {
            title: 'Docs & Help',
            url: 'https://docs.beets.fi',
        },
        {
            title: 'Github',
            url: 'https://github.com/beethovenxfi',
        },
        {
            title: 'Twitter',
            url: 'https://twitter.com/beethoven_x',
        },
        {
            title: 'Medium',
            url: 'https://beethovenxio.medium.com/',
        },
        {
            title: 'Discord',
            url: 'https://beets.fi/discord',
        },
        {
            title: 'Olympus Bonds',
            url: 'https://pro.olympusdao.finance/#/bond',
        },
        {
            title: 'AllBridge',
            subTitle: 'SOL / MATIC / CELO',
            url: 'https://app.allbridge.io/bridge?from=SOL&to=FTM&asset=SOL',
        },
    ],
    priceImpact: {
        invest: {
            noticeable: 0.005,
            high: 0.01,
        },
        trade: {
            noticeable: 0.01,
            high: 0.05,
        },
        withdraw: {
            noticeable: 0.005,
            high: 0.01,
        },
    },
    gauge: {
        rewardHelperAddress: AddressZero,
        balancerPseudoMinterAddress: AddressZero,
        veBALDelegationProxyAddress: AddressZero,
        workingBalanceHelperAddress: AddressZero,
        checkpointHelper: AddressZero,
    },
    createPoolUrl: 'https://v1.beets.fi/#/pool-create',
    stakeUrl: 'https://beets.fi/#/stake',
    warnings: {
        poolList: {
            '0xa10285f445bcb521f1d623300dc4998b02f11c8f00000000000000000000043b': poolListWarningString,
            '0xc0064b291bd3d4ba0e44ccfc81bf8e7f7a579cd200000000000000000000042c': poolListWarningString,
            '0x6e6dc948ce85c62125ff7a1e543d761a88f0a4cb000000000000000000000743': poolListWarningString,
            '0x302b8b64795b064cadc32f74993a6372498608070001000000000000000003e0': poolListWarningString,
            '0x6da14f5acd58dd5c8e486cfa1dc1c550f5c61c1c0000000000000000000003cf': poolListWarningString,
            '0x5ddb92a5340fd0ead3987d3661afcd6104c3b757000000000000000000000187': poolListWarningString,
            '0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e': poolListWarningString,
            '0xf47f4d59c863c02cbfa3eefe6771b9c9fbe7b97800000000000000000000072b': poolListWarningString,
            '0x592fa9f9d58065096f2b7838709c116957d7b5cf00020000000000000000043c': poolListWarningString,
            '0xba0e9aea8a7fa1daab4edf244191f2387a4e472b000100000000000000000737': poolListWarningString,
            '0xdfc65c1f15ad3507754ef0fd4ba67060c108db7e000000000000000000000406': poolListWarningString,
            '0x10441785a928040b456a179691141c48356eb3a50001000000000000000002fa': poolListWarningString,
            '0x64b301e21d640f9bef90458b0987d81fb4cf1b9e00020000000000000000022e': poolListWarningString,
            '0x78ab08bf98f90f29a09c9b1d85b3b549369b03a3000100000000000000000354': poolListWarningString,
            '0x56897add6dc6abccf0ada1eb83d936818bc6ca4d0002000000000000000002e8': poolListWarningString,
            '0x7449f09c8f0ed490472d7c14b4eef235620d027000010000000000000000072d': poolListWarningString,
            '0x1e2576344d49779bdbb71b1b76193d27e6f996b700020000000000000000032d': poolListWarningString,
            '0x2e0d46d884af4053787e1838793bf98dcb87488e00020000000000000000072c': poolListWarningString,
            '0xa55318e5d8b7584b8c0e5d3636545310bf9eeb8f000000000000000000000337': poolListWarningString,
            '0x8c63702d4d4a521a6a8ecec8ab8f7ce9d1d6299e000200000000000000000443': poolListWarningString,
            '0x1352fd97a1828093bf375f62e088bc196facd1ee000000000000000000000404': poolListWarningString,
            '0xff09914bf3d1f61ff3468cfcc4529665b908afa3000100000000000000000741': poolListWarningString,
            '0x93c7defe51d787010babfdb19504d5a72166e11200020000000000000000041c': poolListWarningString,
            '0x0392ebb4aea38233e5b89acfabf7b418cdea8e4300010000000000000000073f': poolListWarningString,
            '0x624601b34e64a48ef91a6bf888e74ef3eceb1bf9000100000000000000000419': poolListWarningString,
            '0xe1c86d3908dc524aa3555e56adf973de7d3acdba000100000000000000000267': poolListWarningString,
            '0x31adc46737ebb8e0e4a391ec6c26438badaee8ca000000000000000000000306': poolListWarningString,
            '0x30c016f5cf1d34c1bce4c8c9c302f66a268847fd0001000000000000000003f6': poolListWarningString,
            '0xd90dc295d571adc7575563d892aa96ac3811d21c000200000000000000000402': poolListWarningString,
            '0x015f34e47ca0a88675098c4d6601817403f07a32000200000000000000000723': poolListWarningString,
            '0xd69959fa7910ceb3a2d359ed33cb8297670b69370000000000000000000005b2': poolListWarningString,
            '0xf86785fe1cefd5069e6df1b4b54b72b1992003110000000000000000000005b3': poolListWarningString,
            '0xf7705cd188a8ac806d28f85bdb13a38313e985ff0000000000000000000005b7': poolListWarningString,
            '0x8d13d878e44e8005efc0db4a831b95f84cb4b1540000000000000000000003c6': poolListWarningString,
            '0x91e96deddca930669feb699d16cc3416289ec7aa000100000000000000000748': poolListWarningString,
            '0xa9cb51abfbbf2ca877b290e988b453f8bf4ab630000000000000000000000430': poolListWarningString,
            '0xd4500f270880488a481de1b3256a19b3d9c8fd7e000000000000000000000710': poolListWarningString,
            '0xdb455199d96d5513d831f0029bd819597bc9d158000200000000000000000728': poolListWarningString,
            '0xac6286126044e2ee2589d394a102cb54b7ab15a7000200000000000000000629': poolListWarningString,
            '0xc46066ff87b3861ffc5c26ad2e9705190c22aa56000000000000000000000727': poolListWarningString,
            '0x57793d39e8787ee6295f6a27a81b6cca68e85cdf000000000000000000000397': poolListWarningString,
            '0xecc53ac812123d471360ea3d90023318868b56a5000000000000000000000429': poolListWarningString,
            '0xe191504f9127deb015910768c8a6ac71d185bf91000200000000000000000603': poolListWarningString,
            '0x904018c54b2382929b15abaae55136a392af4294000100000000000000000729': poolListWarningString,
            '0x2b4af4bb149cc06f5de580be013e86f81e4d2b30000100000000000000000373': poolListWarningString,
            '0xeb38aa08bc00ba68237543d2daa1476b4dfd37f800000000000000000000073a': poolListWarningString,
            '0xf51776b52dfb5bf9a7f3ed150c20e78d4dff6e640002000000000000000004e9': poolListWarningString,
            '0x547e9ad4b824f09e9cf1c6d163cf308d4cf998120001000000000000000003c9': poolListWarningString,
            '0xf52fc9d5aa16c782c9ba51be0da10f1ccf05c702000100000000000000000394': poolListWarningString,
            '0x4b18597d3f7c9786a133827572e6a318d55c9fd200020000000000000000028b': poolListWarningString,
            '0xfe48fefea11cceb3bdeb328428f1b25446edad700001000000000000000003d2': poolListWarningString,
            '0xea52e5eb660ba64b9ba10ad9ae55a8156aa4d29a0002000000000000000003a2': poolListWarningString,
            '0xcf87708ea94916d7ccd13b86ce56006472d806fe000100000000000000000378': poolListWarningString,
            '0xe0042e7ee284ff355622b7660ccb34be114936fa000100000000000000000400': poolListWarningString,
            '0x8d7ca68d9a33148daf3ad1a495ed290f4eee013e0001000000000000000003b9': poolListWarningString,
            '0xff600724d670727872a1f7483049326c111d993d000100000000000000000448': poolListWarningString,
            '0x59cfc2307e8b218c242ba61407a07cade73bd6d7000100000000000000000585': poolListWarningString,
            '0x7839210cd48356bdd6fd400e30cfc7140e1e5ad6000100000000000000000449': poolListWarningString,
            '0xea256adb68dffd067d27e95f4ad14eba12e86079000100000000000000000586': poolListWarningString,
            '0x53dd233c2af0147846579010b7c80bf9440afff4000200000000000000000602': poolListWarningString,
            '0x4c36a9a52ca3baf1069e3531d57d96c171a66a230002000000000000000001e9': poolListWarningString,
            '0x88e2a551655daadd7e4e67d14cf48bfb413d72680001000000000000000005d2': poolListWarningString,
            '0x980dfa8bd5c4a96e1b762fe8154b8a2045dab2d70002000000000000000003ef': poolListWarningString,
            '0xf227486361252907cb768142a2f4caed08a3d7cb0001000000000000000005dd': poolListWarningString,
            '0x559d2ac340216e3a6630741147cda6a2cdbc2be10001000000000000000005de': poolListWarningString,
            '0xa5eb9166679a85bdb3eaa2941ed35c8d909484db00020000000000000000052b': poolListWarningString,
            '0x50fd4d5d60d6df38f5e29721bc241b537e182bf40002000000000000000005f9': poolListWarningString,
            '0x174d2608b1d794e9078ae2a4861684a38d4e7ae200020000000000000000065b': poolListWarningString,
            '0x198a22e73aadd2d0ea8e2963799d38ae26adee2e000000000000000000000577': poolListWarningString,
            '0x64dea772866476c9f88fbe95ee83664d6c909c1800000000000000000000022c': poolListWarningString,
            '0xffecea216f0d0d08bfe2cf572e03f217f8a2bf1300020000000000000000041a': poolListWarningString,
            '0xefc1bb0b97780cf7c22059aa7c7e7e88a049d21100020000000000000000041b': poolListWarningString,
        },
        poolDetail: {
            '0xa10285f445bcb521f1d623300dc4998b02f11c8f00000000000000000000043b': {
                id: 'composable-nested-vulnerability',
                message:
                    'A vulnerability has been discovered that effects this pool. Existing liquidity providers should remove liquidity immediately, and no new deposits should be made.',
                type: 'warning',
            },
            '0x6e6dc948ce85c62125ff7a1e543d761a88f0a4cb000000000000000000000743': PoolDetailWarningObject,
            '0x302b8b64795b064cadc32f74993a6372498608070001000000000000000003e0': PoolDetailWarningObject,
            '0x6da14f5acd58dd5c8e486cfa1dc1c550f5c61c1c0000000000000000000003cf': PoolDetailWarningObject,
            '0x5ddb92a5340fd0ead3987d3661afcd6104c3b757000000000000000000000187': PoolDetailWarningObject,
            '0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e': PoolDetailWarningObject,
            '0xf47f4d59c863c02cbfa3eefe6771b9c9fbe7b97800000000000000000000072b': PoolDetailWarningObject,
            '0x592fa9f9d58065096f2b7838709c116957d7b5cf00020000000000000000043c': PoolDetailWarningObject,
            '0xba0e9aea8a7fa1daab4edf244191f2387a4e472b000100000000000000000737': PoolDetailWarningObject,
            '0xdfc65c1f15ad3507754ef0fd4ba67060c108db7e000000000000000000000406': PoolDetailWarningObject,
            '0x10441785a928040b456a179691141c48356eb3a50001000000000000000002fa': PoolDetailWarningObject,
            '0x64b301e21d640f9bef90458b0987d81fb4cf1b9e00020000000000000000022e': PoolDetailWarningObject,
            '0x78ab08bf98f90f29a09c9b1d85b3b549369b03a3000100000000000000000354': PoolDetailWarningObject,
            '0x56897add6dc6abccf0ada1eb83d936818bc6ca4d0002000000000000000002e8': PoolDetailWarningObject,
            '0x7449f09c8f0ed490472d7c14b4eef235620d027000010000000000000000072d': PoolDetailWarningObject,
            '0x1e2576344d49779bdbb71b1b76193d27e6f996b700020000000000000000032d': PoolDetailWarningObject,
            '0x2e0d46d884af4053787e1838793bf98dcb87488e00020000000000000000072c': PoolDetailWarningObject,
            '0xa55318e5d8b7584b8c0e5d3636545310bf9eeb8f000000000000000000000337': PoolDetailWarningObject,
            '0x8c63702d4d4a521a6a8ecec8ab8f7ce9d1d6299e000200000000000000000443': PoolDetailWarningObject,
            '0x1352fd97a1828093bf375f62e088bc196facd1ee000000000000000000000404': PoolDetailWarningObject,
            '0xff09914bf3d1f61ff3468cfcc4529665b908afa3000100000000000000000741': PoolDetailWarningObject,
            '0x93c7defe51d787010babfdb19504d5a72166e11200020000000000000000041c': PoolDetailWarningObject,
            '0x0392ebb4aea38233e5b89acfabf7b418cdea8e4300010000000000000000073f': PoolDetailWarningObject,
            '0x624601b34e64a48ef91a6bf888e74ef3eceb1bf9000100000000000000000419': PoolDetailWarningObject,
            '0xe1c86d3908dc524aa3555e56adf973de7d3acdba000100000000000000000267': PoolDetailWarningObject,
            '0x31adc46737ebb8e0e4a391ec6c26438badaee8ca000000000000000000000306': PoolDetailWarningObject,
            '0x30c016f5cf1d34c1bce4c8c9c302f66a268847fd0001000000000000000003f6': PoolDetailWarningObject,
            '0xd90dc295d571adc7575563d892aa96ac3811d21c000200000000000000000402': PoolDetailWarningObject,
            '0x015f34e47ca0a88675098c4d6601817403f07a32000200000000000000000723': PoolDetailWarningObject,
            '0xd69959fa7910ceb3a2d359ed33cb8297670b69370000000000000000000005b2': PoolDetailWarningObject,
            '0xf86785fe1cefd5069e6df1b4b54b72b1992003110000000000000000000005b3': PoolDetailWarningObject,
            '0xf7705cd188a8ac806d28f85bdb13a38313e985ff0000000000000000000005b7': PoolDetailWarningObject,
            '0x8d13d878e44e8005efc0db4a831b95f84cb4b1540000000000000000000003c6': PoolDetailWarningObject,
            '0x91e96deddca930669feb699d16cc3416289ec7aa000100000000000000000748': PoolDetailWarningObject,
            '0xa9cb51abfbbf2ca877b290e988b453f8bf4ab630000000000000000000000430': PoolDetailWarningObject,
            '0xd4500f270880488a481de1b3256a19b3d9c8fd7e000000000000000000000710': PoolDetailWarningObject,
            '0xdb455199d96d5513d831f0029bd819597bc9d158000200000000000000000728': PoolDetailWarningObject,
            '0xac6286126044e2ee2589d394a102cb54b7ab15a7000200000000000000000629': PoolDetailWarningObject,
            '0xc46066ff87b3861ffc5c26ad2e9705190c22aa56000000000000000000000727': PoolDetailWarningObject,
            '0x57793d39e8787ee6295f6a27a81b6cca68e85cdf000000000000000000000397': PoolDetailWarningObject,
            '0xecc53ac812123d471360ea3d90023318868b56a5000000000000000000000429': PoolDetailWarningObject,
            '0xe191504f9127deb015910768c8a6ac71d185bf91000200000000000000000603': PoolDetailWarningObject,
            '0x904018c54b2382929b15abaae55136a392af4294000100000000000000000729': PoolDetailWarningObject,
            '0x2b4af4bb149cc06f5de580be013e86f81e4d2b30000100000000000000000373': PoolDetailWarningObject,
            '0xeb38aa08bc00ba68237543d2daa1476b4dfd37f800000000000000000000073a': PoolDetailWarningObject,
            '0xf51776b52dfb5bf9a7f3ed150c20e78d4dff6e640002000000000000000004e9': PoolDetailWarningObject,
            '0x547e9ad4b824f09e9cf1c6d163cf308d4cf998120001000000000000000003c9': PoolDetailWarningObject,
            '0xf52fc9d5aa16c782c9ba51be0da10f1ccf05c702000100000000000000000394': PoolDetailWarningObject,
            '0x4b18597d3f7c9786a133827572e6a318d55c9fd200020000000000000000028b': PoolDetailWarningObject,
            '0xfe48fefea11cceb3bdeb328428f1b25446edad700001000000000000000003d2': PoolDetailWarningObject,
            '0xea52e5eb660ba64b9ba10ad9ae55a8156aa4d29a0002000000000000000003a2': PoolDetailWarningObject,
            '0xcf87708ea94916d7ccd13b86ce56006472d806fe000100000000000000000378': PoolDetailWarningObject,
            '0xe0042e7ee284ff355622b7660ccb34be114936fa000100000000000000000400': PoolDetailWarningObject,
            '0x8d7ca68d9a33148daf3ad1a495ed290f4eee013e0001000000000000000003b9': PoolDetailWarningObject,
            '0xff600724d670727872a1f7483049326c111d993d000100000000000000000448': PoolDetailWarningObject,
            '0x59cfc2307e8b218c242ba61407a07cade73bd6d7000100000000000000000585': PoolDetailWarningObject,
            '0x7839210cd48356bdd6fd400e30cfc7140e1e5ad6000100000000000000000449': PoolDetailWarningObject,
            '0xea256adb68dffd067d27e95f4ad14eba12e86079000100000000000000000586': PoolDetailWarningObject,
            '0x53dd233c2af0147846579010b7c80bf9440afff4000200000000000000000602': PoolDetailWarningObject,
            '0x4c36a9a52ca3baf1069e3531d57d96c171a66a230002000000000000000001e9': PoolDetailWarningObject,
            '0x88e2a551655daadd7e4e67d14cf48bfb413d72680001000000000000000005d2': PoolDetailWarningObject,
            '0x980dfa8bd5c4a96e1b762fe8154b8a2045dab2d70002000000000000000003ef': PoolDetailWarningObject,
            '0xf227486361252907cb768142a2f4caed08a3d7cb0001000000000000000005dd': PoolDetailWarningObject,
            '0x559d2ac340216e3a6630741147cda6a2cdbc2be10001000000000000000005de': PoolDetailWarningObject,
            '0xa5eb9166679a85bdb3eaa2941ed35c8d909484db00020000000000000000052b': PoolDetailWarningObject,
            '0x50fd4d5d60d6df38f5e29721bc241b537e182bf40002000000000000000005f9': PoolDetailWarningObject,
            '0x174d2608b1d794e9078ae2a4861684a38d4e7ae200020000000000000000065b': PoolDetailWarningObject,
            '0x198a22e73aadd2d0ea8e2963799d38ae26adee2e000000000000000000000577': PoolDetailWarningObject,
            '0x64dea772866476c9f88fbe95ee83664d6c909c1800000000000000000000022c': PoolDetailWarningObject,
            '0xffecea216f0d0d08bfe2cf572e03f217f8a2bf1300020000000000000000041a': PoolDetailWarningObject,
            '0xefc1bb0b97780cf7c22059aa7c7e7e88a049d21100020000000000000000041b': PoolDetailWarningObject,
        },
        poolInvest: {},
        poolWithdraw: {},
    },
    poolBadgeTypes: {
        '0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e': 'reaper',
        '0x7449f09c8f0ed490472d7c14b4eef235620d027000010000000000000000072d': 'reaper',
        '0x2e0d46d884af4053787e1838793bf98dcb87488e00020000000000000000072c': 'reaper',
        '0xf47f4d59c863c02cbfa3eefe6771b9c9fbe7b97800000000000000000000072b': 'reaper',
        '0xba0e9aea8a7fa1daab4edf244191f2387a4e472b000100000000000000000737': 'reaper',
        '0x6e6dc948ce85c62125ff7a1e543d761a88f0a4cb000000000000000000000743': 'reaper',
        '0xd67041d2d93f03774092caaeb4553e26c51ae4ed0002000000000000000007e9': 'experimental',
    },
    thirdPartyStakingPools: [
        {
            poolId: '0x2ddcd6916ee7ccc6300cb0fe2919a341be0ee8bb0002000000000000000007eb', // fMoney with Attitude
            url: 'https://www.fmoney.market/stake',
            name: 'fmoney',
        },
    ],
    investDisabled: {
        '0xa10285f445bcb521f1d623300dc4998b02f11c8f00000000000000000000043b': true,
        '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837000200000000000000000019': true,
        '0xc0064b291bd3d4ba0e44ccfc81bf8e7f7a579cd200000000000000000000042c': true,
        '0x6e6dc948ce85c62125ff7a1e543d761a88f0a4cb000000000000000000000743': true,
        '0x302b8b64795b064cadc32f74993a6372498608070001000000000000000003e0': true,
        '0x6da14f5acd58dd5c8e486cfa1dc1c550f5c61c1c0000000000000000000003cf': true,
        '0x5ddb92a5340fd0ead3987d3661afcd6104c3b757000000000000000000000187': true,
        '0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e': true,
        '0xf47f4d59c863c02cbfa3eefe6771b9c9fbe7b97800000000000000000000072b': true,
        '0x592fa9f9d58065096f2b7838709c116957d7b5cf00020000000000000000043c': true,
        '0xba0e9aea8a7fa1daab4edf244191f2387a4e472b000100000000000000000737': true,
        '0xdfc65c1f15ad3507754ef0fd4ba67060c108db7e000000000000000000000406': true,
        '0x10441785a928040b456a179691141c48356eb3a50001000000000000000002fa': true,
        '0x64b301e21d640f9bef90458b0987d81fb4cf1b9e00020000000000000000022e': true,
        '0x78ab08bf98f90f29a09c9b1d85b3b549369b03a3000100000000000000000354': true,
        '0x56897add6dc6abccf0ada1eb83d936818bc6ca4d0002000000000000000002e8': true,
        '0x7449f09c8f0ed490472d7c14b4eef235620d027000010000000000000000072d': true,
        '0x1e2576344d49779bdbb71b1b76193d27e6f996b700020000000000000000032d': true,
        '0x2e0d46d884af4053787e1838793bf98dcb87488e00020000000000000000072c': true,
        '0xa55318e5d8b7584b8c0e5d3636545310bf9eeb8f000000000000000000000337': true,
        '0x8c63702d4d4a521a6a8ecec8ab8f7ce9d1d6299e000200000000000000000443': true,
        '0x1352fd97a1828093bf375f62e088bc196facd1ee000000000000000000000404': true,
        '0xff09914bf3d1f61ff3468cfcc4529665b908afa3000100000000000000000741': true,
        '0x93c7defe51d787010babfdb19504d5a72166e11200020000000000000000041c': true,
        '0x0392ebb4aea38233e5b89acfabf7b418cdea8e4300010000000000000000073f': true,
        '0x624601b34e64a48ef91a6bf888e74ef3eceb1bf9000100000000000000000419': true,
        '0xe1c86d3908dc524aa3555e56adf973de7d3acdba000100000000000000000267': true,
        '0x31adc46737ebb8e0e4a391ec6c26438badaee8ca000000000000000000000306': true,
        '0x30c016f5cf1d34c1bce4c8c9c302f66a268847fd0001000000000000000003f6': true,
        '0xd90dc295d571adc7575563d892aa96ac3811d21c000200000000000000000402': true,
        '0x015f34e47ca0a88675098c4d6601817403f07a32000200000000000000000723': true,
        '0xd69959fa7910ceb3a2d359ed33cb8297670b69370000000000000000000005b2': true,
        '0xf86785fe1cefd5069e6df1b4b54b72b1992003110000000000000000000005b3': true,
        '0xf7705cd188a8ac806d28f85bdb13a38313e985ff0000000000000000000005b7': true,
        '0x8d13d878e44e8005efc0db4a831b95f84cb4b1540000000000000000000003c6': true,
        '0x91e96deddca930669feb699d16cc3416289ec7aa000100000000000000000748': true,
        '0xa9cb51abfbbf2ca877b290e988b453f8bf4ab630000000000000000000000430': true,
        '0xd4500f270880488a481de1b3256a19b3d9c8fd7e000000000000000000000710': true,
        '0xdb455199d96d5513d831f0029bd819597bc9d158000200000000000000000728': true,
        '0xac6286126044e2ee2589d394a102cb54b7ab15a7000200000000000000000629': true,
        '0xc46066ff87b3861ffc5c26ad2e9705190c22aa56000000000000000000000727': true,
        '0x57793d39e8787ee6295f6a27a81b6cca68e85cdf000000000000000000000397': true,
        '0xecc53ac812123d471360ea3d90023318868b56a5000000000000000000000429': true,
        '0xe191504f9127deb015910768c8a6ac71d185bf91000200000000000000000603': true,
        '0x904018c54b2382929b15abaae55136a392af4294000100000000000000000729': true,
        '0x2b4af4bb149cc06f5de580be013e86f81e4d2b30000100000000000000000373': true,
        '0xeb38aa08bc00ba68237543d2daa1476b4dfd37f800000000000000000000073a': true,
        '0xf51776b52dfb5bf9a7f3ed150c20e78d4dff6e640002000000000000000004e9': true,
        '0x547e9ad4b824f09e9cf1c6d163cf308d4cf998120001000000000000000003c9': true,
        '0xf52fc9d5aa16c782c9ba51be0da10f1ccf05c702000100000000000000000394': true,
        '0x4b18597d3f7c9786a133827572e6a318d55c9fd200020000000000000000028b': true,
        '0xfe48fefea11cceb3bdeb328428f1b25446edad700001000000000000000003d2': true,
        '0xea52e5eb660ba64b9ba10ad9ae55a8156aa4d29a0002000000000000000003a2': true,
        '0xcf87708ea94916d7ccd13b86ce56006472d806fe000100000000000000000378': true,
        '0xe0042e7ee284ff355622b7660ccb34be114936fa000100000000000000000400': true,
        '0x8d7ca68d9a33148daf3ad1a495ed290f4eee013e0001000000000000000003b9': true,
        '0xff600724d670727872a1f7483049326c111d993d000100000000000000000448': true,
        '0x59cfc2307e8b218c242ba61407a07cade73bd6d7000100000000000000000585': true,
        '0x7839210cd48356bdd6fd400e30cfc7140e1e5ad6000100000000000000000449': true,
        '0xea256adb68dffd067d27e95f4ad14eba12e86079000100000000000000000586': true,
        '0x53dd233c2af0147846579010b7c80bf9440afff4000200000000000000000602': true,
        '0x4c36a9a52ca3baf1069e3531d57d96c171a66a230002000000000000000001e9': true,
        '0x88e2a551655daadd7e4e67d14cf48bfb413d72680001000000000000000005d2': true,
        '0x980dfa8bd5c4a96e1b762fe8154b8a2045dab2d70002000000000000000003ef': true,
        '0xf227486361252907cb768142a2f4caed08a3d7cb0001000000000000000005dd': true,
        '0x559d2ac340216e3a6630741147cda6a2cdbc2be10001000000000000000005de': true,
        '0xa5eb9166679a85bdb3eaa2941ed35c8d909484db00020000000000000000052b': true,
        '0x50fd4d5d60d6df38f5e29721bc241b537e182bf40002000000000000000005f9': true,
        '0x174d2608b1d794e9078ae2a4861684a38d4e7ae200020000000000000000065b': true,
        '0x198a22e73aadd2d0ea8e2963799d38ae26adee2e000000000000000000000577': true,
        '0x64dea772866476c9f88fbe95ee83664d6c909c1800000000000000000000022c': true,
        '0xffecea216f0d0d08bfe2cf572e03f217f8a2bf1300020000000000000000041a': true,
        '0xefc1bb0b97780cf7c22059aa7c7e7e88a049d21100020000000000000000041b': true,
    },
    maBeetsEnabled: true,
    claimAllRewardsEnabled: true,
    layerZeroChainId: -1,
    beetsMigrationEnabled: false,
    gaugeEnabled: false,
    sftmxEnabled: true,
};
