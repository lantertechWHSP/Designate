import { ReactNode, useState, useRef, useEffect } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Box, Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, Alert } from '@chakra-ui/react';
import { sumBy as _sumBy, round as _round } from 'lodash';
import { ITable } from '~/interfaces/util/table';
import { IStructuredText } from '~/interfaces/util/structuredText';
import StructuredContent from '~/components/StructuredContent';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import {baseAnimationBezier, tableOverflowMargin} from '~/lib/theme/theme';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';
import { motion, animate } from 'framer-motion';
const MotionBox:any = motion(Box);

interface ITableRow {
    Portfolio:string;
    NetAssetValue:string;
}

interface InvestmentPortfolioTableBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    table?:ITable<ITableRow>;
    lastUpdated?:any;
}

interface IPercentageBar {
    value:number;
}

interface IAnimateBar {
    value?:number;
    remainder?:number;
}

interface IAnimateCount {
    from?:number;
    to?:number;
}

const AnimateBar:any = ({ value, remainder }:IAnimateBar) => {
    return <>
        <MotionBox transition={{
            ease: baseAnimationBezier,
            duration: 2
        }}
        initial={{ width: '0' }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        background="white" borderRadius="3px" height="24px" />

        <MotionBox transition={{
            ease: baseAnimationBezier,
            duration: 2
        }}
        initial={{ width: '100%' }}
        whileInView={{ width: `${remainder}%` }}
        viewport={{ once: true }}
        px={2}>
            <AnimateCount from={0} to={value} />%
        </MotionBox>
    </>;
};

const AnimateBarRemainder:any = ({value}:IAnimateBar) => {
    return <MotionBox transition={{
        ease: baseAnimationBezier,
        duration: 2
    }}  initial={{ width: '0' }}
    whileInView={{ width: `${value}%` }}
    viewport={{ once: true }}
    textAlign="right" background="white" borderRadius="3px" px={2} height="24px" color="olive">
        <AnimateCount from={0} to={value} />%
    </MotionBox>;
};

const AnimateCount:any = ({ from, to }:IAnimateCount) => {
    const elementRef:any = useRef();

    useEffect(() => {
        const node:any = elementRef.current;

        const controls:any = animate(from, to, {
            duration: 2,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });

        return () => controls.stop();
    }, [from, to]);

    return <Box as="span" ref={elementRef} />;
};

const PercentageBar:any = ({ value }:IPercentageBar) => {
    const remainder:number = value - 100;

    return <Box>
        {
            (value >= 0 && value <= 100) ? <Flex height="24px" direction="row" width={'100%'} borderRadius="3px" background="rgba(255, 255, 255, 0.1)">
                {
                    value >= 0 && value <= 80 ? <>
                        <AnimateBar value={value} remainder={remainder} />
                    </> : <>
                        <AnimateBarRemainder value={value} />
                    </>
                }
            </Flex> : '-'
        }
    </Box>;
};

const InvestmentPortfolioTableBlock:any = ({ title, description, table, paddingTop, paddingBottom }:InvestmentPortfolioTableBlock) : ReactNode => {
    const [total] = useState<number>(table?.data ? _sumBy(table.data, (row:ITableRow) => {
        const value:number = +row.NetAssetValue;
        return value;
    }) : 0);

    return (table || title || !isEmptyDocument(description)) && <ContentBlock background="olive" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box mb={8}>
            {
                title && <Heading as="h2" variant="sectionHeading" color="white" mb={[4, ,6, 8]}>
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
            }
            {
                !isEmptyDocument(description) && <Box color="white">
                    <Row>
                        <Column width={[ColumnWidth.Full, ,ColumnWidth.ThreeQuarters, ColumnWidth.Half]}>
                            <AnimateOverflow>
                                <StructuredContent content={description} />
                            </AnimateOverflow>
                        </Column>
                    </Row>
                </Box>
            }
        </Box>
        {
            ((Array.isArray(table?.data) && table.data.length > 0) || (Array.isArray(table?.columns) && table.columns.length > 0)) ? <Box mr={tableOverflowMargin}><TableContainer>
                <Table variant="basic" w="100%" color="white" sx={{
                    td: {
                        borderLeft: '1px solid',
                        borderBottom: '1px solid',
                        borderColor: 'whiteBlur2',
                        color: 'white',
                        fontWeight: 400,
                        px: 4,
                        fontSize: ['18px'],
                        _first: {
                            borderLeft: '0',
                            pl: 0,
                            pr: 4
                        },
                        _last: {
                            pl: 4,
                            pr: 0
                        }
                    },
                    th: {
                        fontSize: ['16px'],
                        color: 'whiteBlur',
                        px: 4,
                        _first: {
                            pl: 0,
                            pr: 4
                        },
                        _last: {
                            pl: 4,
                            pr: 0
                        }
                    },
                    tr: {
                        _last: {
                            td: {
                                borderBottom: '1px solid',
                                borderColor: 'whiteBlur2',
                                color: 'white'
                            }
                        }
                    }
                }}>
                    {
                        Array.isArray(table.columns) && table.columns.length > 0 && <Thead>
                            <Tr>
                                <Th width={['50%', ,'20%']}>
                                    <AnimateOverflow>
                                        Portfolio
                                    </AnimateOverflow>
                                </Th>
                                <Th width={['35%', ,'20%']} >
                                    <AnimateOverflow>
                                        Net Asset Value
                                    </AnimateOverflow>
                                </Th>
                                <Th width={['15%', ,'60%']} >
                                    <AnimateOverflow>
                                        Allocation
                                    </AnimateOverflow>
                                </Th>
                            </Tr>
                        </Thead>
                    }
                    {
                        (Array.isArray(table?.data) && table.data.length > 0) && <Tbody>
                            {
                                table.data.map((row:ITableRow, index:number) => {
                                    const percentage:number = _round(((+row.NetAssetValue / total) * 100), 0);

                                    return <Tr key={index}>
                                        <Td>
                                            <AnimateOverflow>
                                                {row.Portfolio || '-'}
                                            </AnimateOverflow>
                                        </Td>
                                        <Td>
                                            <AnimateOverflow>
                                                {
                                                    row.NetAssetValue && <>
                                                        ${row.NetAssetValue}b
                                                    </>
                                                }
                                            </AnimateOverflow>
                                        </Td>
                                        <Td verticalAlign="middle">
                                            {
                                                percentage ? <>
                                                    <Box display={['none', , 'block']} >
                                                        <PercentageBar value={percentage} />
                                                    </Box>
                                                    <Box display={['block', ,'none']}>
                                                        {percentage}%
                                                    </Box>
                                                </> : <>-</>
                                            }
                                        </Td>
                                    </Tr>;
                                })
                            }
                        </Tbody>
                    }
                </Table>
            </TableContainer></Box> : <Alert status="info">No Data</Alert>
        }
    </ContentBlock>;
};

export default InvestmentPortfolioTableBlock;
