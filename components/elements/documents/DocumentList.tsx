import { useState, ReactNode, useEffect } from 'react';
import { doQuery, queries } from '~/dato/api';
import DocumentCard from '~/components/elements/documents/DocumentCard';
import { Box, Flex, Button, Spinner, Text, Container, Heading, Menu, MenuButton, Portal, MenuList, MenuItem, ButtonGroup  } from '@chakra-ui/react';
import { IDocument, IDocumentsFilters, IDocumentBundle } from '~/interfaces/models/document';
import { IDocumentsMeta } from '~/interfaces/models/document';
import { groupBy as _groupBy, forOwn as _forOwn } from 'lodash';
import { DateTime } from 'luxon';
import { Icon, Icons } from '~/components/elements/icon';
import { IFilter } from '~/interfaces/util/filter';

interface IDocumentList {
    latestDocuments:IDocument[];
    documentsMeta:IDocumentsMeta;
    documentsFilters:IDocumentsFilters;
}

export const DATO_QUERY_VALUES:any = {
    ITEMS_PER_PAGE : 2,
    ORDER_BY : 'date_DESC',
    REPORTS_CATEGORY_ID : '190260513'
};

const DocumentList:any = ({ latestDocuments, documentsMeta, documentsFilters }:IDocumentList) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [documents, setDocuments] = useState<IDocument[]>(latestDocuments);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [couldNotLoadDocuments, setCouldNotLoadDocuments] = useState<boolean>(false);
    const [documentBundles, setDocumentBundles] = useState<IDocumentBundle[]>([]);

    const [tagFilters] = useState<IFilter[]>(documentsFilters.tagFilters);
    const [yearFilters] = useState<IFilter[]>(documentsFilters.yearFilters);

    const [selectedYear, setSelectedYear] = useState<IFilter>(yearFilters[0]);
    const [selectedTag, setSelectedTag] = useState<IFilter>(tagFilters[0]);
    const [totalDocumentCount, setTotalDocumentCount] = useState<number>(documentsMeta?.count);


    const getDatoFilterObject:any = () : void => {
        const filter:any = {
            category: {
                eq: DATO_QUERY_VALUES.REPORTS_CATEGORY_ID
            }
        };

        // Filter by Date
        if(selectedYear.value !== 'none') {
            filter['date'] = {
                gte: `${selectedYear.value}-01-01`,
                lte: `${selectedYear.value}-12-31`
            };
        }
        if(selectedTag.value !== 'none') {
            filter['tags'] = {
                eq: selectedTag.value
            };
        }

        return filter;
    };

    const loadMore:any = () : void => {
        setIsLoading(true);

        const filter:any = getDatoFilterObject();

        doQuery(queries.documents, {
            first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
            skip: page * DATO_QUERY_VALUES.ITEMS_PER_PAGE,
            orderBy: DATO_QUERY_VALUES.ORDER_BY,
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
        const newSortedDocumentBundles:IDocumentBundle[] = [];

        _forOwn(_groupBy(documents, (document:IDocument) => {
            return DateTime.fromISO(document.date).toFormat('yyyy');
        }), (document:IDocument[], key:string) => {
            newSortedDocumentBundles.push({
                title: key,
                documents: document
            });
        });

        setDocumentBundles(newSortedDocumentBundles.reverse());
    }, [documents]);

    useEffect(() => {
        // Reset to the first page when filtering…
        setPage(1);

        const filter:any = getDatoFilterObject();

        // Reset documents
        doQuery(queries.documents, {
            first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
            orderBy: DATO_QUERY_VALUES.ORDER_BY,
            filter,
        }).then(({ documents }) => documents || []).then((newDocuments) => {
            setDocuments(newDocuments);
        });

        // Reset document count
        doQuery(queries.documentsMeta, {
            filter,
        }).then(({ documentsMeta }) => documentsMeta || {}).then((documentsMeta) => {
            setTotalDocumentCount(documentsMeta.count);
        });
    }, [selectedYear, selectedTag]);

    return <Box bg="lightGrey3" py={12}>
        <Container>
            <Box pb={4} mb={8}>
                <ButtonGroup>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button}
                                    variant="menuButton"
                                    rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                    {selectedTag.label ? selectedTag.label : 'Compare…'}
                                </MenuButton>
                                <Portal>
                                    <MenuList>
                                        {
                                            tagFilters.map((item:IFilter, index:number) => {
                                                return <MenuItem key={index}
                                                    as={Button}
                                                    variant="menuItemFilter"
                                                    onClick={() => {
                                                        setSelectedTag(item);
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
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button}
                                    variant="menuButton"
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
                </ButtonGroup>
            </Box>
            {
                (Array.isArray(documents) && documents.length > 0) ? <>
                    <Box>
                        {
                            documentBundles.map((documentBundle:IDocumentBundle, index:number) => {
                                return <Box key={index} pb={8}>
                                    <Heading as="h2" variant="sectionHeading" mb={4}>{documentBundle.title}</Heading>
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
                                </Box>;
                            })
                        }
                    </Box>
                    {
                        couldNotLoadDocuments && <Box>
                            <Text variant="caption">Could not load Documents</Text>
                        </Box>
                    }
                    {
                        documents.length < totalDocumentCount && <Flex py={8} justify="center">
                            <Button variant="button" onClick={loadMore} rightIcon={isLoading && <Spinner size='sm' />} minWidth="200px" border="1px solid" height="50px" width="50px" borderRadius="25px" borderColor="darkGrey">
                                Load More
                            </Button>
                        </Flex>
                    }
                </> : <>
                    <Box>
                        <Text variant="caption">No Documents</Text>
                    </Box>
                </>
            }
        </Container>
    </Box>;
};

export default DocumentList;
