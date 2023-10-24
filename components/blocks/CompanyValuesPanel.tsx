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

const CompanyValuesPanelBlock:any = ({ items, paddingTop, paddingBottom, ...props }:ICompanyValuesPanelBlock) : ReactNode => {
    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom} {...props}>
        {
            (Array.isArray(items) && items.length > 0) && <>
                <Heading as="h3" variant="sectionSubheading" mb={4}>
                    Our People and Values
                </Heading>
                <Box background="ghostWhite" className="horizonalScroll" overflowX={['scroll', ,'hidden']}>
                    <Row wrap={['no-wrap', , 'wrap']} >
                        {
                            items.map((item:ICompanyValue, index:number) => {
                                return <Column width={[ColumnWidth.Half, ,ColumnWidth.OneThird]} minWidth={[ColumnWidth.Half, ,'unset']} key={index}>
                                    <Flex direction="column" alignItems="center" py={8} px={4}>
                                        {
                                            (item.icon && item.icon.url) && <Box mb={4}><img src={item.icon.url} alt={item.icon?.alt} /></Box>
                                        }
                                        {
                                            item.title && <Heading as="h3" variant="h4" mb={2}>
                                                {item.title}
                                            </Heading>
                                        }
                                    </Flex>
                                </Column>;
                            })
                        }
                    </Row>
                </Box>
            </>
        }
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
