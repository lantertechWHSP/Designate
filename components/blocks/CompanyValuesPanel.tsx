import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, {BackgroundColor, getBackgroundColor} from '~/components/blocks/Content';
import { Heading, Box, Flex, ResponsiveValue } from '@chakra-ui/react';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import StructuredContent from '~/components/StructuredContent';
import { CompanyIcon, CompanyIcons } from '~/components/elements/icons/companyIcons/companyIcon';

interface ICompanyValuesPanelBlock extends IBlock {
    title?:string;
    items?:ICompanyValue[];
}

interface ICompanyValue {
    title?:string;
    description?:IStructuredText;
    background?:BackgroundColor;
    icon?:CompanyIcons;
}

const CompanyValuesPanelBlock:any = ({ title, items, containerWidth, background, paddingTop, paddingBottom }:ICompanyValuesPanelBlock) : ReactNode => {
    return ((Array.isArray(items) && items.length > 0) || title) && <ContentBlock containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h3" variant="sectionSubheading" mb={[4, 6, ,8]}>
                Our People and Values
            </Heading>
        }
        <Flex direction={['column', ,'row']} mx={-2}>
            {
                items.map((item:ICompanyValue, index:number) => {
                    const selectedBackground:BackgroundColor|ResponsiveValue<any>|string = getBackgroundColor(item.background);
                    
                    return <Flex px={2} key={index} flex={1}>
                        <Box background={selectedBackground} color="white" borderTopRightRadius="40px" p={4} w="100%" mb={[4, ,0]}>
                            {
                                item.icon && <Box mb={2}>
                                    <CompanyIcon icon={item.icon} />
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" fontSize="24px" color="white" mb={2}>
                                    {item.title}
                                </Heading>
                            }
                            {
                                !isEmptyDocument(item.description) && <StructuredContent content={item.description} />
                            }
                        </Box>
                    </Flex>;
                })
            }
        </Flex>
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
