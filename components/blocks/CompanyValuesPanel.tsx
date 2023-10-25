import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ISVGImage } from '~/interfaces/util/image';
import { Heading, Box, Flex } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";

interface ICompanyValuesPanelBlock extends IBlock {
    items?:ICompanyValue[];
}

interface ICompanyValue {
    title?:string;
    icon?:ISVGImage;
}

const CompanyValuesPanelBlock:any = ({ items, paddingTop, paddingBottom, containerWidth }:ICompanyValuesPanelBlock) : ReactNode => {
return (Array.isArray(items) && items.length > 0) && <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom} containerWidth={containerWidth} background="ghostWhite">
        <Heading as="h3" variant="sectionSubheading" mb={8}>
            Our People and Values
        </Heading>
        <Box borderRadius="3px" overflow="hidden" mb={'-20px'}>
            <Box className="horizonalScroll" overflowX={['scroll', ,'hidden']}>
                <Flex wrap={['no-wrap', , 'wrap']} direction="row">
                    {
                        items.map((item:ICompanyValue, index:number) => {
                            return <Flex width={['196px', ,'calc(33.3333333% - 1px)']} minWidth={['220px', ,'calc(33.3333333% - 1px)']} minHeight="264px" boxSizing="border-box" py={6} background="lightGrey3Blur">
                                <Flex minWidth="100%" minHeight="100%" borderRight="1px solid" borderColor={items.length - 1 === index ? 'transparent' : 'borderColor'}>
                                    <Flex minWidth="100%" minHeight="100%" px={4} direction="column" align="center" justify="center">
                                        {
                                            (item.icon && item.icon.url) && <Box mb={4}><img src={item.icon.url} alt={item.icon?.alt} /></Box>
                                        }
                                        {
                                            item.title && <Heading as="h3" fontSize="24px" color="darkBrown" mb={2}>
                                                {item.title}
                                            </Heading>
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                        })
                    }
                </Flex>
            </Box>
        </Box>
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
