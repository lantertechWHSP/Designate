import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, Flex } from '@chakra-ui/react';

interface ICompanyValuesPanelBlock extends IBlock {
    title?:string;
    items?:ICompanyValue[];
}

interface ICompanyValue {
    title?:string;
    icon?:ISVGImage;
}

const CompanyValuesPanelBlock:any = ({ title, items, containerWidth, background, paddingTop, paddingBottom,  }:ICompanyValuesPanelBlock) : ReactNode => {
    return ((Array.isArray(items) && items.length > 0) || title) && <ContentBlock containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Heading as="h3" variant="sectionSubheading" mb={[4, 6, ,8]}>
                Our People and Values
            </Heading>
        }
        <Box borderRadius="3px" overflow="hidden" mb={'-20px'}>
            <Box className="horizonalScroll" overflowX={['scroll', ,'hidden']}>
                <Flex wrap={['nowrap', , 'wrap']} direction="row">
                    {
                        items.map((item:ICompanyValue, index:number) => {
                            return <Flex width={['196px', ,'calc(33.3333333% - 1px)']} minWidth={['220px', ,'calc(33.3333333% - 1px)']} minHeight="264px" boxSizing="border-box" py={6} background="lightGrey3Blur" key={index}>
                                <Flex minWidth="100%" minHeight="100%" borderRight="1px solid" borderColor={items.length - 1 === index ? 'transparent' : 'borderColor'}>
                                    <Flex minWidth="100%" minHeight="100%" px={4} direction="column" align="center" justify="center">
                                        {
                                            (item.icon && item.icon.url) && <Box mb={4}><img src={item.icon.url} alt={item.icon?.alt} /></Box>
                                        }
                                        {
                                            item.title && <Heading as="h3" fontSize="24px" color="olive" mb={2}>
                                                {item.title}
                                            </Heading>
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>;
                        })
                    }
                </Flex>
            </Box>
        </Box>
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
