import { useMemo } from 'react';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useBreakpointValue } from '@chakra-ui/react';
import numeral from 'numeral';

interface DataProps {
    timestamp: number;
    exchangeRate: string;
    totalFtmAmount: string;
    totalFtmAmountInPool: string;
    totalFtmAmountStaked: string;
}
interface Props {
    data: any[];
}

export function SftmxChartsFtmValidator({ data }: Props) {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const option = useMemo<EChartsOption>(
        () => ({
            color: [
                '#D81B60',
                '#8E24AA',
                '#5E35B1',
                '#3949AB',
                '#1E88E5',
                '#039BE5',
                '#00ACC1',
                '#00897B',
                '#43A047',
                '#7CB342',
                '#C0CA33',
                '#FFB300',
                '#FB8C00',
                '#F4511E',
                '#6D4C41',
                '#757575',
                '#546E7A',
                '#b71c1c',
                '#880E4F',
                '#4A148C',
                '#311B92',
                '#1A237E',
                '#0D47A1',
                '#01579B',
                '#006064',
                '#004D40',
                '#1B5E20',
                '#33691E',
                '#827717',
                '#F57F17',
                '#FF6F00',
                '#E65100',
                '#BF360C',
                '#3E2723',
                '#212121',
                '#263238',
                '#801313',
            ],
            darkMode: true,
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    type: 'pie',
                    data,
                    radius: ['40%', '70%'],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 40,
                            shadowColor: 'rgba(0, 0, 0, 0.75)',
                        },
                        labelLine: {
                            lineStyle: {
                                width: 3,
                            },
                        },
                    },
                    width: '100%',
                    label: {
                        overflow: 'none',
                    },
                    tooltip: {
                        valueFormatter: (value) => `${numeral(value as number).format('0.[00]a')} FTM staked`,
                    },
                    padAngle: 1,
                    itemStyle: {
                        borderRadius: 10,
                    },
                },
            ],
        }),
        [JSON.stringify(data)],
    );

    return <ReactECharts option={option} style={{ height: isMobile ? '400px' : '100%', width: '100%' }} />;
}
