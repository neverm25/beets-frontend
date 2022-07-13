import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { InfoButton } from '~/components/info-button/InfoButton';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { BeetsBox } from '~/components/box/BeetsBox';
import { usePool } from '~/modules/pool/lib/usePool';
import { BeetsBoxLineItem } from '~/components/box/BeetsBoxLineItem';
import { numberFormatUSDValue } from '~/lib/util/number-formats';

interface Props extends BoxProps {
    weeklyYield: number;
}

export function PoolInvestPriceImpactAndYield({ weeklyYield, ...rest }: Props) {
    const { pool } = usePool();

    return (
        <BeetsBox {...rest}>
            <BeetsBoxLineItem
                leftContent={
                    <InfoButton
                        label="Price impact"
                        moreInfoUrl="https://docs.beets.fi"
                        infoText="Nunc rutrum aliquet ligula ut tincidunt. Nulla ligula justo, laoreet laoreet convallis et, lacinia non turpis. Duis consectetur sem risus, in lobortis est congue id."
                    />
                }
                rightContent={<Box>0.0%</Box>}
            />
            <BeetsBoxLineItem
                leftContent={
                    <InfoButton
                        label="Potential weekly yield"
                        moreInfoUrl="https://docs.beets.fi"
                        infoText="Nunc rutrum aliquet ligula ut tincidunt. Nulla ligula justo, laoreet laoreet convallis et, lacinia non turpis. Duis consectetur sem risus, in lobortis est congue id."
                    />
                }
                rightContent={
                    <Flex alignItems="center">
                        <Box mr="1">{numberFormatUSDValue(weeklyYield)}</Box>
                        <AprTooltip data={pool.dynamicData.apr} onlySparkles={true} sparklesSize="sm" />
                    </Flex>
                }
                last={true}
            />
        </BeetsBox>
    );
}