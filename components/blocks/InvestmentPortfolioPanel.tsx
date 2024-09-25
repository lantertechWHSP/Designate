import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from "datocms-structured-text-utils";
import StructuredContent from '~/components/StructuredContent';
import ContentBlock from '~/components/blocks/Content';
import { InvestmentPortfolioIcon, InvestmentPortfolioIcons } from '~/components/elements/icons/investmentPortfolioIcons/investmentPortfolioIcon';

interface  IInvestmentPortfolioPanelBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    items?:IInvestmentPortfolioItem[];
}

interface IInvestmentPortfolioItem {
    title?:string;
    description?:IStructuredText;
    icon?:InvestmentPortfolioIcons;
}

const InvestmentPortfolioPanelBlock:any = ({ title, description, items, paddingTop, paddingBottom, background }: IInvestmentPortfolioPanelBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            description && <Box mb={8}>
                <AnimateOverflow>
                    {
                        !isEmptyDocument(description) && <StructuredContent content={description} />
                    }
                </AnimateOverflow>
            </Box>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, 2, 3]} spacingX={[8]} spacingY={[6, ,8]}>
                {
                    items.map((item:IInvestmentPortfolioItem, index:number) => {
                        return <Box key={index}>
                            {
                                item.icon && <Box mb={3}>
                                    <AnimateOverflow>
                                        <InvestmentPortfolioIcon icon={item.icon} w={60} h={60} />
                                    </AnimateOverflow>
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" variant="sectionSubheading" color="forest" mb={3}>
                                    <AnimateOverflow>
                                        {
                                            item.title
                                        }
                                    </AnimateOverflow>
                                </Heading>
                            }
                            {
                                !isEmptyDocument(item.description) && <Box mb={8}>
                                    <AnimateOverflow>
                                        <StructuredContent content={item.description} />
                                    </AnimateOverflow>
                                </Box>
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default InvestmentPortfolioPanelBlock;
