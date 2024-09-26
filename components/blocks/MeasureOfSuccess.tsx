import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Box, SimpleGrid} from '@chakra-ui/react';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface  IMeasureOfSuccessBlock extends IBlock {
    title?:string;
    items:IMeasureOfSuccessItem[];
}

interface IMeasureOfSuccessItem {
    title?:string;
}

const MeasureOfSuccessBlock:any = ({ title, items, paddingTop, paddingBottom, background }: IMeasureOfSuccessBlock) : ReactNode => {
    return (title || (Array.isArray(items) && items.length > 0)) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h2" variant="sectionHeading" mb={[4, ,6, 8]}>
                <AnimateOverflow>
                    {title}
                </AnimateOverflow>
            </Heading>
        }
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, , 3]} spacingX={[8]}>
                {
                    items.map((item:IMeasureOfSuccessItem, index:number) => {
                        return <Box key={index} mb={6} py={2}>
                            {
                                <Heading as="h4" fontWeight={500} fontSize="60px" lineHeight="70px" color="forest">
                                    <AnimateOverflow>
                                        {index + 1}
                                    </AnimateOverflow>
                                </Heading>
                            }
                            {
                                item.title && <Heading as="h3" variant="sectionSubheading" color="charcoal">
                                    <AnimateOverflow>
                                        {item.title}
                                    </AnimateOverflow>
                                </Heading>
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default MeasureOfSuccessBlock;
