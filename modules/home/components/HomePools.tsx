import { Box, BoxProps, Flex, HStack, Image, Text } from '@chakra-ui/react';
import PoolIcon1 from '~/assets/icons/pool-icon-1.svg';
import PoolIcon2 from '~/assets/icons/pool-icon-2.svg';
import PoolIcon3 from '~/assets/icons/pool-icon-3.svg';
import NextImage from 'next/image';
import { PoolCard } from '~/components/pool-card/PoolCard';
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';
import BeetsButton from '~/components/button/Button';

export function HomePools(props: BoxProps) {
    return (
        <Box {...props}>
            <BeetsHeadline mb="10">Featured pools</BeetsHeadline>
            <Box mb="8">
                <Flex mb="4">
                    <NextImage src={PoolIcon1} />
                    <Text fontSize="2xl" ml="2" color="white">
                        New & popular
                    </Text>
                </Flex>
                <Flex>
                    <PoolCard mr="6" flex="1" />
                    <PoolCard mr="6" flex="1" />
                    <PoolCard flex="1" />
                </Flex>
            </Box>
            <Box mb="8">
                <Flex mb="4">
                    <NextImage src={PoolIcon2} />
                    <Text fontSize="2xl" ml="2" color="white">
                        Index fund pools
                    </Text>
                </Flex>
                <Flex>
                    <PoolCard mr="6" flex="1" />
                    <PoolCard mr="6" flex="1" />
                    <PoolCard flex="1" />
                </Flex>
            </Box>
            <Box mb="8">
                <Flex mb="4">
                    <NextImage src={PoolIcon3} />
                    <Text fontSize="2xl" ml="2" color="white">
                        Boosted pools
                    </Text>
                </Flex>
                <Flex>
                    <PoolCard mr="6" flex="1" />
                    <PoolCard mr="6" flex="1" />
                    <Flex flex="1" position="relative" alignItems="flex-end" justifyContent="center">
                        <Image
                            src="https://beethoven-assets.s3.eu-central-1.amazonaws.com/boosted-ludwig-min.png"
                            width="full"
                            position="absolute"
                            top="0"
                            left="0"
                            bottom="0"
                            right="0"
                        />
                        <BeetsButton onClick={() => {}}>What is a Boosted pool?</BeetsButton>
                    </Flex>
                </Flex>
            </Box>
            <Box>
                <Flex mb="4">
                    <NextImage src={PoolIcon3} />
                    <Text fontSize="2xl" ml="2" color="white">
                        Stable pools
                    </Text>
                </Flex>
                <Flex>
                    <PoolCard mr="6" flex="1" />
                    <PoolCard mr="6" flex="1" />
                    <Box flex="1" />
                </Flex>
            </Box>
        </Box>
    );
}