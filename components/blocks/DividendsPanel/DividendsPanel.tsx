import ContentBlock from '~/components/blocks/Content';
import { ReactNode, useState } from 'react';
import { Heading, Container, Box, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import DividendHistoryChart from '~/components/blocks/DividendsPanel/Chart/DividendHistoryChart';

const DividendsPanel = ({ description, latestDividendDescription, csv }) : ReactNode => {
    function convertCSVToJSON(str, delimiter = ',') {
        const titles = str.slice(0, str.indexOf('\n')).trim();
        const titlesProps = titles.replace(/\s/g, '').split(delimiter);
        const titlesRaw = titles.split(delimiter);

        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        return {
            titles: titlesRaw,
            rows: rows.map(row => {
                const values = row.trim().split(delimiter);

                return titlesProps.reduce((object, curr, i) => {
                    object[curr] = values[i];
                    return object;
                }, {})
            })
        }
    };

    fetch(csv.url).then((response) => response.text()).then((data) => {
        const table = convertCSVToJSON(data, ',');
        setTable(table);
    }).catch(() => {
        setTable(null);
    }).finally(() => {
        setIsTableLoaded(true);
    });

    const [isTableLoaded, setIsTableLoaded] = useState(false);
    const [table, setTable] = useState(null);

    return <ContentBlock contain={false}>
        <Box py={12} background="lightGrey3">
            <Container>
                {
                    description && <Box maxW={['100%', '400px']} mb={8}>
                    <Text color="steelBlue3">
                        {description}
                    </Text>
                  </Box>
                }
                {
                    latestDividendDescription && <>
                    <Box maxW={['100%', '400px']} mb={8}>
                      <Heading as="h2" variant="h3" mb={4}>Latest Dividend</Heading>
                      <Text color="steelBlue3">
                          {latestDividendDescription}
                      </Text>
                    </Box>
                        {
                            (isTableLoaded && table) && <TableContainer>
                                <Table variant="basic" w="100%">
                                    <>
                                        {
                                            (Array.isArray(table?.titles) && table.titles.length > 0) && <Thead>
                                                <Tr>
                                                    {
                                                        table.titles.map((th, index) => {
                                                            return <Th key={index} w="20%">{th}</Th>
                                                        })
                                                    }
                                                </Tr>
                                            </Thead>
                                        }
                                    </>
                                    <>
                                        {
                                            (Array.isArray(table?.rows) && table.rows.length > 0) && <Tbody>
                                                {
                                                    (() => {
                                                        const row = table.rows[0];
                                                        return <Tr>
                                                            <Td>
                                                                {
                                                                    row.Dividend || '-'
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    row.ExpiryDate || '-'
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    row.Franking || '-'
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    row.Type || '-'
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    row.PaymentDate || '-'
                                                                }
                                                            </Td>
                                                        </Tr>
                                                    })()
                                                }
                                            </Tbody>
                                        }
                                    </>
                                </Table>
                            </TableContainer>
                        }
                  </>
                }
            </Container>
        </Box>
        <Box py={12} background="white">
            <Container>
                {
                    isTableLoaded && <>
                        {
                            table ? <Box>
                                <Heading as="h2" variant="h3" mb={8}>Dividend History</Heading>
                                <TableContainer>
                                    <Table variant="basic" w="100%">
                                        <>
                                            {
                                                (Array.isArray(table?.titles) && table.titles.length > 0) && <Thead>
                                                <Tr>
                                                    {
                                                        table.titles.map((th, index) => {
                                                            return <Th key={index} w="20%">{th}</Th>
                                                        })
                                                    }
                                                </Tr>
                                              </Thead>
                                            }
                                        </>
                                        <>
                                            {
                                                (Array.isArray(table?.rows) && table.rows.length > 0) && <Tbody>
                                                    {
                                                        table.rows.map((row, index) => {
                                                            return <Tr key={index}>
                                                                <Td>
                                                                    {
                                                                        row.Dividend || '-'
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        row.ExpiryDate || '-'
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        row.Franking || '-'
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        row.Type || '-'
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    {
                                                                        row.PaymentDate || '-'
                                                                    }
                                                                </Td>
                                                            </Tr>
                                                        })
                                                    }
                                              </Tbody>
                                            }
                                        </>
                                    </Table>
                                </TableContainer>
                            </Box> : <Box>
                                Could not load Dividend History table…
                            </Box>
                        }
                  </>
                }
            </Container>
        </Box>
        <Box>
            <Heading as="h2" variant="h3">
                Dividend History
            </Heading>
            <Container>
                <DividendHistoryChart />
            </Container>
        </Box>
    </ContentBlock>;
}

export default DividendsPanel;
