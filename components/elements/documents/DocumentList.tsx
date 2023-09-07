import { useState, ReactNode, useEffect } from 'react';
import { doQuery, queries } from '~/dato/api';
import DocumentCard from '~/components/elements/documents/DocumentCard';
import { Box, Button, Spinner, Text, Container, Heading, Menu, MenuButton, Portal, MenuList, MenuItem  } from '@chakra-ui/react';
import {IDocument, IDocumentsFirstLastDate} from '~/interfaces/models/document';
import { IDocumentsMeta } from '~/interfaces/models/document';
import { groupBy as _groupBy, forOwn as _forOwn } from 'lodash';
import { DateTime } from 'luxon';
import { Icon, Icons } from '~/components/elements/icon';
import { IFilter } from '~/interfaces/util/filter';

interface IDocumentListProps {
    latestDocuments:IDocument[];
    latestDocumentsMeta:IDocumentsMeta;
    documentFirstLastDates:IDocumentsFirstLastDate;
}

interface IDocumentBundle {
    title:string;
    documents:IDocument[];
}

export const ITEMS_PER_PAGE = 2;
export const ORDER_BY = 'date_DESC';
export const CATEGORY_ID = '190260513'; // Category ID from Dato

const DocumentList:any = ({ latestDocuments, latestDocumentsMeta, documentFirstLastDates }:IDocumentListProps) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [documents, setDocuments] = useState<IDocument[]>(latestDocuments);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [couldNotLoadDocuments, setCouldNotLoadDocuments] = useState<boolean>(false);
    const [documentBundles, setDocumentBundles] = useState<IDocumentBundle[]>([]);

    const [yearFilters, setYearFilters] = useState<IFilter[]>([{
        value: 'none',
        label: 'All'
    }])

    const [selectedYear, setSelectedYear] = useState<IFilter>(yearFilters[0])
    const [totalDocumentCount, setTotalDocumentCount] = useState<number>(latestDocumentsMeta?.count);

    const loadMore:any = () : void => {
        setIsLoading(true);

        const filter:any = {
            categories: {
                eq: CATEGORY_ID
            }
        };

        // Filter by Date
        if(selectedYear.value !== 'none') {
            filter['date'] = {
                gte: `${selectedYear.value}-01-01`,
                lte: `${selectedYear.value}-12-31`
            }
        }

        doQuery(queries.documents, {
            first: ITEMS_PER_PAGE,
            skip: page * ITEMS_PER_PAGE,
            orderBy: ORDER_BY,
            filter: filter
        }).then(({ documents }) => documents || []).then((newDocuments) => {
            if(newDocuments.length > 0) {
                setDocuments([...documents, ...newDocuments]);
                setPage(page + 1);
            }
        }).catch(() => {
            setCouldNotLoadDocuments(true);
            setTimeout(() => {
                setCouldNotLoadDocuments(false);
            }, 5000);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 250);
        });
    };

    useEffect(() => {
        if(documentFirstLastDates) {
            const endYear:number = +(DateTime.fromFormat(documentFirstLastDates.lastDate, 'yyyy-mm-dd').toFormat('yyyy'));
            const startYear:number = +(DateTime.fromFormat(documentFirstLastDates.firstDate, 'yyyy-mm-dd').toFormat('yyyy'));
            const newYearFilters:IFilter[] = [
                {
                    value: 'none',
                    label: 'All'
                },
                ...Array.from(
                    { length: endYear - startYear + 1 },
                    (v, i) => {
                        return {
                            label: (endYear - i).toString(),
                            value: endYear - i,
                        }
                    }
                )];

            setYearFilters(newYearFilters);
        }
    }, [documentFirstLastDates])

    useEffect(() => {
        const newSortedDocumentBundles:IDocumentBundle[] = [];

        _forOwn(_groupBy(documents, (document:IDocument) => {
            return DateTime.fromISO(document.date).toFormat('yyyy');
        }), (document:IDocument[], key:string) => {
            newSortedDocumentBundles.push({
                title: key,
                documents: document
           })
        });

        setDocumentBundles(newSortedDocumentBundles.reverse());
    }, [documents])

    useEffect(() => {
        // Reset to the first page when filtering…
        setPage(1);

        const filter:any = {
            categories: {
                eq: CATEGORY_ID
            }
        };

        if(selectedYear.value !== 'none') {
            filter['date'] = {
                gte: `${selectedYear.value}-01-01`,
                lte: `${selectedYear.value}-12-31`
            }
        }

        doQuery(queries.documents, {
            first: ITEMS_PER_PAGE,
            orderBy: ORDER_BY,
            filter,
        }).then(({ documents }) => documents || []).then((newDocuments) => {
            setDocuments(newDocuments);
        });

        doQuery(queries.documentsMeta, {
            filter,
        }).then(({ documentsMeta }) => documentsMeta || {}).then((documentsMeta) => {
            setTotalDocumentCount(documentsMeta.count);
        });
    }, [selectedYear])

    return <Box bg="lightGrey3">
        <Container>
            <Box py={8}>
                <Menu>

                </Menu>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton as={Button}
                                        variant="menuButton"
                                        height="40px"
                                        lineHeight="40px"
                                        minW="200px"
                                        rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                {selectedYear.label ? selectedYear.label : 'Compare…'}
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    {
                                        yearFilters.map((item:IFilter, index:number) => {
                                            return <MenuItem key={index}
                                                             as={Button}
                                                             variant="menuItemFilter"
                                                             onClick={() => {
                                                                 setSelectedYear(item);
                                                             }}>
                                                {item.label}
                                            </MenuItem>;
                                        })
                                    }
                                </MenuList>
                            </Portal>
                        </>
                    )}
                </Menu>
            </Box>
            {
                (Array.isArray(documents) && documents.length > 0) ? <>
                    <Box>
                        {
                            documentBundles.map((documentBundle:IDocumentBundle, index:number) => {
                                return <Box key={index} pb={8}>
                                    <Heading as="h2" variant="h3" py={2} mb={4}>{documentBundle.title}</Heading>
                                    {
                                        (Array.isArray(documentBundle.documents) && documentBundle.documents.length > 0) && <>
                                            {
                                                documentBundle.documents.map((document:IDocument, innerIndex:number) => {
                                                    return <Box borderTop="1px solid" borderColor="lightGrey2" key={innerIndex}>
                                                        <DocumentCard {...document} />
                                                    </Box>;
                                                })
                                            }
                                            <Box borderBottom="1px solid" borderColor="lightGrey2" />
                                        </>
                                    }
                                </Box>
                            })
                        }
                    </Box>
                    {
                        couldNotLoadDocuments && <Box>
                            <Text variant="caption" color="lightGrey">Could not load Documents</Text>
                        </Box>
                    }
                    {
                        documents.length < totalDocumentCount && <Button color="sunlight" onClick={loadMore} px={0} rightIcon={isLoading && <Spinner size='sm' />}>
                            <Text textDecoration="underline">
                                Load Moar!
                            </Text>
                        </Button>
                    }
                </> : <>
                    <Box>
                        <Text variant="caption" color="lightGrey">No Documents</Text>
                    </Box>
                </>
            }
        </Container>
    </Box>;
};

export default DocumentList;
