import { useState, ReactNode, useEffect } from 'react';
import DocumentCard from '~/components/elements/documents/DocumentCard';
import { Box, Flex, Button, Spinner, Container, Heading, Menu, MenuButton, Portal, MenuList, MenuItem, Alert } from '@chakra-ui/react';
import { IDocument, IDocumentsFilters, IDocumentGroup } from '~/interfaces/models/document';
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
    ITEMS_PER_PAGE : 15,
    ORDER_BY : 'date_DESC',
    REPORTS_CATEGORY_ID : '190260513'
};

const DocumentReportsList:any = ({ latestDocuments, documentsMeta, documentsFilters }:IDocumentList) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [documents, setDocuments] = useState<IDocument[]>(latestDocuments);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [couldNotLoadDocuments, setCouldNotLoadDocuments] = useState<boolean>(false);
    const [documentGroups, setDocumentGroups] = useState<IDocumentGroup[]>([]);

    const [tagFilters] = useState<IFilter[]>(documentsFilters.tagFilters);
    const [yearFilters] = useState<IFilter[]>(documentsFilters.yearFilters);

    const [selectedYear, setSelectedYear] = useState<IFilter>(yearFilters[0]);
    const [selectedTag, setSelectedTag] = useState<IFilter>(tagFilters[0]);
    const [totalDocumentCount, setTotalDocumentCount] = useState<number>(documentsMeta?.count);

    const getDatoFilterObject:any = (tag:IFilter, year:IFilter) : void => {
        const filter:any = {
            category: {
                eq: DATO_QUERY_VALUES.REPORTS_CATEGORY_ID
            }
        };

        // Filter by Date
        if(year.value !== 'none') {
            filter['date'] = {
                gte: `${year.value}-01-01`,
                lte: `${year.value}-12-31`
            };
        }
        if(tag.value !== 'none') {
            filter['tags'] = {
                eq: tag.value
            };
        }

        return filter;
    };

    const updateDocuments:any = (tag:IFilter, year:IFilter) : void => {
        const filter:any = getDatoFilterObject(tag, year);

        fetch('/api/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
                orderBy: DATO_QUERY_VALUES.ORDER_BY,
                filter: filter
            })
        }).then(response => response.json()).then((response:any) => {
            if(response.success) {
                if(response.data.documents.length > 0) {
                    setDocuments(response.data.documents);
                    setPage(1);
                    setSelectedTag(tag);
                    setSelectedYear(year);
                }
            }
        }).catch(() => {
            setCouldNotLoadDocuments(true);
        }).finally(() => {
            setIsLoading(false);
        });

        fetch('/api/documents/meta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                filter,
            })
        }).then(response => response.json()).then((response:any) => {
            if(response.success) {
                if (response.data.documentsMeta.count) {
                    setTotalDocumentCount(response.data.documentsMeta.count);
                }
            }
        });
    };

    const loadMore:any = () : void => {
        setIsLoading(true);

        const filter:any = getDatoFilterObject(selectedTag, selectedYear);

        fetch('/api/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first: DATO_QUERY_VALUES.ITEMS_PER_PAGE,
                skip: page * DATO_QUERY_VALUES.ITEMS_PER_PAGE,
                orderBy: DATO_QUERY_VALUES.ORDER_BY,
                filter,
            })
        }).then(response => response.json()).then((response:any) => {
            if(response.success) {
                if(response.data.documents.length > 0) {
                    setDocuments([...documents, ...response.data.documents]);
                    setPage(page + 1);
                }
            }
        }).catch(() => {
            setCouldNotLoadDocuments(true);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const newSortedDocumentBundles:IDocumentGroup[] = [];

        _forOwn(_groupBy(documents, (document:IDocument) => {
            return DateTime.fromISO(document.date).toFormat('yyyy');
        }), (document:IDocument[], key:string) => {
            newSortedDocumentBundles.push({
                title: key,
                documents: document
            });
        });

        setDocumentGroups(newSortedDocumentBundles.reverse());
    }, [documents]);

    return <Box bg="ghostWhite" pt={['40px', ,'50px', '60px']} pb={['120px']}>
        <Container>
            {
                (Array.isArray(latestDocuments) && latestDocuments.length > 0) ? <>
                    <Box pb={4} mb={8}>
                        <Flex direction={['column', 'row']} mx={-2} mb={-4}>
                            <Box px={2} mb={4}>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton as={Button}
                                                minWidth={['100%', '220px', , '270px']}
                                                variant="menuButton"
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                                {selectedTag.label ? selectedTag.label : 'Compare'}
                                            </MenuButton>
                                            <Portal>
                                                <MenuList>
                                                    {
                                                        tagFilters.map((item:IFilter, index:number) => {
                                                            return <MenuItem key={index}
                                                                as={Button}
                                                                variant="menuItemFilter"
                                                                onClick={() => {
                                                                    updateDocuments(item, selectedYear);
                                                                }}>
                                                                <Flex direction="row" align="center" width="100%">
                                                                    <Flex flex="1">{item.label}</Flex>
                                                                    {
                                                                        selectedTag === item && <Box color="steel">
                                                                            <Icon icon={Icons.Tick} h={12} w={12}  />
                                                                        </Box>
                                                                    }
                                                                </Flex>
                                                            </MenuItem>;
                                                        })
                                                    }
                                                </MenuList>
                                            </Portal>
                                        </>
                                    )}
                                </Menu>
                            </Box>
                            <Box px={2} mb={4}>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton as={Button}
                                                variant="menuButton"
                                                minWidth={['100%', ,'150px']}
                                                rightIcon={isOpen ? <Icon icon={Icons.ChevronUp} w={12} h={12} /> : <Icon icon={Icons.ChevronDown} w={12} h={12} />}>
                                                {selectedYear.label ? selectedYear.label : 'Compare'}
                                            </MenuButton>
                                            <Portal>
                                                <MenuList maxHeight="300px" overflowY="scroll">
                                                    {
                                                        yearFilters.map((item:IFilter, index:number) => {
                                                            return <MenuItem key={index}
                                                                as={Button}
                                                                variant="menuItemFilter"
                                                                onClick={() => {
                                                                    updateDocuments(selectedTag, item);
                                                                }}>
                                                                <Flex direction="row" align="center" width="100%">
                                                                    <Flex flex="1">{item.label}</Flex>
                                                                    {
                                                                        selectedYear === item && <Box color="steel">
                                                                            <Icon icon={Icons.Tick} h={12} w={12}  />
                                                                        </Box>
                                                                    }
                                                                </Flex>
                                                            </MenuItem>;
                                                        })
                                                    }
                                                </MenuList>
                                            </Portal>
                                        </>
                                    )}
                                </Menu>
                            </Box>
                        </Flex>
                    </Box>
                    <Box>
                        {
                            documentGroups.map((documentGroup:IDocumentGroup, index:number) => {
                                return <Box key={index} pb={8}>
                                    <Heading as="h2" variant="sectionHeading" mb={4}>{documentGroup.title}</Heading>
                                    {
                                        (Array.isArray(documentGroup.documents) && documentGroup.documents.length > 0) && <>
                                            {
                                                documentGroup.documents.map((document:IDocument, innerIndex:number) => {
                                                    return <Box borderTop="1px solid" borderColor="borderColor" key={innerIndex}>
                                                        <DocumentCard {...document} hideDate={true} />
                                                    </Box>;
                                                })
                                            }
                                            <Box borderBottom="1px solid" borderColor="borderColor" />
                                        </>
                                    }
                                </Box>;
                            })
                        }
                    </Box>
                    {
                        couldNotLoadDocuments && <Box>
                            <Alert status="error">Could not load Documents</Alert>
                        </Box>
                    }
                    {
                        documents.length < totalDocumentCount && <Flex py={8} justify="center">
                            <Button variant="button"
                                onClick={loadMore} rightIcon={isLoading && <Spinner size='sm' />} minWidth="200px" border="1px solid" height="50px" width="50px" borderRadius="25px" borderColor="darkGrey">
                                Load More
                            </Button>
                        </Flex>
                    }
                    {
                        documents.length === 0 && <Alert status="info">No documents within the filter(s)…</Alert>
                    }
                </> : <>
                    <Box>
                        <Alert status="info">No documents</Alert>
                    </Box>
                </>
            }
        </Container>
    </Box>;
};

export default DocumentReportsList;
