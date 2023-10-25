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
                <Row wrap={['no-wrap', , 'wrap']}>
                    {
                        items.map((item:ICompanyValue, index:number) => {
                            return <Column width={[ColumnWidth.Half, ,ColumnWidth.OneThird]} minWidth={[ColumnWidth.Half, ,'unset']}
                                           key={index} background="lightGrey3Blur">
                                <Flex direction="column" alignItems="center" justify="center" minHeight={['244px', ,'250px']} py={'10px'} px={4}>
                                    {
                                        (item.icon && item.icon.url) && <Box mb={4}><img src={item.icon.url} alt={item.icon?.alt} /></Box>
                                    }
                                    {
                                        item.title && <Heading as="h3" fontSize="24px" color="darkBrown" mb={2}>
                                            {item.title}
                                        </Heading>
                                    }
                                </Flex>
                            </Column>;
                        })
                    }
                </Row>
            </Box>
        </Box>
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
