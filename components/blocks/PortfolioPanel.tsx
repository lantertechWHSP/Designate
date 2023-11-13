import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, Box, SimpleGrid, Text, Flex, Link } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import { IStructuredText } from '~/interfaces/util/structuredText';
import StructuredContent from '~/components/StructuredContent';
import { IPerson } from '~/interfaces/models/person';
import { Image } from '~/components/elements/image';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { IImage } from '~/interfaces/util/image';

interface IPortfolioPanelItem {
    title?:string;
    content?:IStructuredText;
    people?:IPerson[];
    companies?: IPortfolioPanelCompany[];
}

interface IPortfolioPanelCompany {
    image:IImage;
    url:string;
}

interface IPortfolioPanelBlock extends IBlock {
    items:IPortfolioPanelItem[];
}

const PortfolioPanelBlock:any = ({ items, paddingTop, paddingBottom }:IPortfolioPanelBlock) : ReactNode => {
    return (Array.isArray(items) && items.length > 0) && <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Accordion allowToggle defaultIndex={0} borderBottom="1px solid" borderColor="borderColor">
            {
                items.map((item:IPortfolioPanelItem, index:number) => {
                    return <AccordionItem key={index}>
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton py={4}
                                    lineHeight="80px"
                                    height="80px"
                                    boxSizing="border-box"
                                    borderTop="1px solid"
                                    alignItems="center"
                                    textAlign="left"
                                    borderColor="borderColor">
                                    <Heading as="h3"
                                        color="olive"
                                        fontSize={['21px']}
                                        lineHeight={['26px']}
                                        fontWeight={700} mb={0} mr={4}>
                                        {item?.title}
                                    </Heading>
                                    <Box flex={1} />
                                    <Box transition="transform 300ms linear"
                                        transform={isExpanded ? 'rotate(180deg)' : ''}>
                                        <Icon icon={Icons.ChevronDown} />
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel pt={4} pb={8}>
                                    <Row justify="center">
                                        <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.EightTwelfths]}>
                                            {
                                                !isEmptyDocument(item?.content) && <Box mb={8}>
                                                    <StructuredContent content={item.content} />
                                                </Box>
                                            }
                                            {
                                                (Array.isArray(item?.companies) && item.companies.length > 0) && <Box mx={[0, -8]} mb={8}>
                                                    <SimpleGrid background="ghostWhite" minHeight="310px" columns={[1, 2, 4]} spacing={0}>
                                                        {
                                                            item.companies.map((company:IPortfolioPanelCompany, index:number) => {
                                                                return <Flex align="center" justify="center" py={12}  key={index}>
                                                                    <Flex align="center" height="100%"  minHeight="200px" borderRight={['none',index % 2 !== 1 ? '1px solid' : 'none' , index % 4 !== 3 ? '1px solid' : 'none']} borderColor={['none', 'borderColor', 'borderColor']}>
                                                                        <Box px={8}>
                                                                            {
                                                                                company.url ? <Link href={company.url} target="_blank">
                                                                                    <Image image={company.image} />
                                                                                </Link> : <Image image={company.image} />
                                                                            }
                                                                        </Box>
                                                                    </Flex>
                                                                </Flex>;
                                                            })
                                                        }
                                                    </SimpleGrid>
                                                </Box>
                                            }
                                            {
                                                (Array.isArray(item?.people) && item.people.length > 0) && <SimpleGrid columns={[1, , 3]} spacing={[0, ,8]}>
                                                    {
                                                        item?.people.map((person:IPerson, index:number) => {
                                                            return <Box key={index}>
                                                                <Image image={person.image} ratio={[1 / 1]} mb={4} />
                                                                {
                                                                    person.name && <Heading as="h3">
                                                                        {person.name}
                                                                    </Heading>
                                                                }
                                                                {
                                                                    person.companyPosition && <Text>
                                                                        {person.companyPosition}
                                                                    </Text>
                                                                }
                                                            </Box>;
                                                        })
                                                    }
                                                </SimpleGrid>
                                            }
                                        </Column>
                                    </Row>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>;
                })
            }
        </Accordion>
    </ContentBlock>;
};

export default PortfolioPanelBlock;
