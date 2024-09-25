import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, { BackgroundColor, getBackgroundColor } from '~/components/blocks/Content';
import {Heading, Flex, ResponsiveValue, Box} from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { InvestmentPhilosophyIcons, InvestmentPhilosophyIcon } from '~/components/elements/icons/investmentPhilosophyIcons/investmentPhilosophyIcon';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import StructuredContent from '~/components/StructuredContent';

interface  IInvestmentPhilosophyBlock extends IBlock {
    title?:string;
    items:IInvestmentPhilosophyItem[];
}

interface IInvestmentPhilosophyItem {
    title?:string;
    content?:IStructuredText;
    icon?:InvestmentPhilosophyIcons;
    background:BackgroundColor;
}

const InvestmentPhilosophyBlock:any = ({ title, items, paddingTop, paddingBottom, background }: IInvestmentPhilosophyBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <Flex direction={['column', , , ,'row']} mx={-4}>
                {
                    items.map((item:IInvestmentPhilosophyItem, index:number) => {
                        const selectedBackground:BackgroundColor|ResponsiveValue<any>|string = getBackgroundColor(item.background);

                        return <Flex px={4} key={index} flex={1}>
                            <Box background={selectedBackground} color="white" borderTopRightRadius="40px" p={4} pr={7} w="100%" minHeight={['initial', , , ,'190px']} mb={[4, , , ,0]}>
                                <Flex>
                                    {
                                        item.icon && <Box mb={2} mr={1}>
                                            <Box position="relative" left="-2px">
                                                <AnimateOverflow>
                                                    <InvestmentPhilosophyIcon icon={item.icon} />
                                                </AnimateOverflow>
                                            </Box>
                                        </Box>
                                    }
                                    <Box py={2}>
                                        {
                                            item.title && <Heading as="h3" fontSize="24px" color="white" mb={2}>
                                                <AnimateOverflow>
                                                    {item.title}
                                                </AnimateOverflow>
                                            </Heading>
                                        }
                                        {
                                            !isEmptyDocument(item.content) && <Box>
                                                <AnimateOverflow>
                                                    <StructuredContent content={item.content} />
                                                </AnimateOverflow>
                                            </Box>
                                        }
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>;
                    })
                }
            </Flex>
        }
    </ContentBlock>;
};

export default InvestmentPhilosophyBlock;
