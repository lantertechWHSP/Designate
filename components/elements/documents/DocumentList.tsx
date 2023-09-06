import { useState, ReactNode } from 'react';
import { doQuery, queries } from '~/dato/api';
import DocumentCard from '~/components/elements/documents/DocumentCard';
import { Box, Button, Spinner, Text, Container } from '@chakra-ui/react';
import { IDocument } from '~/interfaces/models/document';
import { IDocumentsMeta } from '~/interfaces/models/documentsMeta';

interface IDocumentListProps {
    latestDocuments:IDocument[];
    documentsMeta:IDocumentsMeta;
}

const DocumentList:any = ({ latestDocuments, documentsMeta }:IDocumentListProps) : ReactNode => {
    const [page, setPage] = useState<number>(1);
    const [documents, setDocuments] = useState<IDocument[]>(latestDocuments);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noMoreDocuments, setNoMoreDocuments] = useState<boolean>(false);
    const [couldNotLoadDocuments, setCouldNotLoadDocuments] = useState<boolean>(false);

    const [totalDocuments] = useState<number>(documentsMeta?.count || documents.length);
    const itemsPerPage:number = 1;

    const loadMore:any = () : void => {
        setIsLoading(true);

        doQuery(queries.documents, { first: itemsPerPage, skip: page * itemsPerPage }).then(({ documents }) => documents || []).then((newDocuments) => {
            if(newDocuments.length > 0) {
                setDocuments([...documents, ...newDocuments]);
                setPage(page + 1);
            }
            else {
                setTimeout(() => {
                    setNoMoreDocuments(true);
                }, 250);

                setTimeout(() => {
                    setNoMoreDocuments(false);
                }, 5000);
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

    return <Box>
        <Container>
            {
                (Array.isArray(documents) && documents.length > 0) ? <>
                    <Box>
                        {
                            documents.map((document:IDocument, index:number) => {
                                return <Box borderTop="1px solid" borderColor="lightGrey2" key={index}>
                                    <DocumentCard {...document} />
                                </Box>;
                            })
                        }
                        <Box borderBottom="1px solid" borderColor="lightGrey2" />
                    </Box>
                    {
                        (noMoreDocuments && documents.length === totalDocuments) && <Box>
                        <Text variant="caption" color="lightGrey">No more Documents to load</Text>
                      </Box>
                    }
                    {
                        couldNotLoadDocuments && <Box>
                        <Text variant="caption" color="lightGrey">Could not load Documents</Text>
                      </Box>
                    }
                    {
                        documents.length < totalDocuments && <Button color="sunlight" onClick={loadMore} px={0} rightIcon={isLoading && <Spinner size='sm' />}>
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
