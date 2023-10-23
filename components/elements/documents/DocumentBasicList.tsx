import { ReactNode, useState, useEffect } from 'react';
import { Heading, Box, Container } from '@chakra-ui/react';
import { IDocument, IDocumentBundle } from '~/interfaces/models/document';
import { forOwn as _forOwn, groupBy as _groupBy } from 'lodash';
import DocumentCard from "~/components/elements/documents/DocumentCard";

export const DATO_QUERY_VALUES:any = {
    POLICIES_AND_STANDARDS_CATEGORY_ID : '191742372'
};

interface IDocumentBasicList {
    title?:String;
    latestDocuments?:IDocument[];
}

const DocumentBasicList:any = ({ title, latestDocuments }:IDocumentBasicList) : ReactNode => {
    const [documents] = useState(latestDocuments);
    const [documentBundles, setDocumentBundles] = useState<IDocumentBundle[]>([]);

    useEffect(() => {
        const newSortedDocumentBundles:IDocumentBundle[] = [];

        _forOwn(_groupBy(documents, (document:IDocument) => {
            return document.subcategory.label;
        }), (document:IDocument[], key:string) => {
            newSortedDocumentBundles.push({
                title: key,
                documents: document
            });
        });

        setDocumentBundles(newSortedDocumentBundles.reverse());
    }, [documents]);

    return <Box bg="ghostWhite" py={[6, 8, 12]}>
        <Container>
            {
                title && <Heading as="h2" variant="sectionSubheading" mb={8}>
                    {title}
                </Heading>
            }
            {
                (Array.isArray(documents) && documents.length > 0) && <Box>
                    {
                        documentBundles.map((documentBundle:IDocumentBundle, index:number) => {
                            return <Box key={index} pb={index === documentBundles.length - 1 ? 0 : 4}>
                                <Heading as="h3" fontSize={['24px']} lineHeight={['24px']} fontWeight={600} py={2} mb={4}>{documentBundle.title}</Heading>
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
            }
        </Container>
    </Box>;
};

export default DocumentBasicList;
