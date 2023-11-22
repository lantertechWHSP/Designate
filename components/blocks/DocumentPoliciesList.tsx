import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { IDocument } from '~/interfaces/models/document';
import ContentBlock from '~/components/blocks/Content';
import { Box, Alert, Heading } from '@chakra-ui/react';
import DocumentCard from '~/components/elements/documents/DocumentCard';
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";

interface IDocumentPoliciesListBlock extends IBlock {
    items?:IDocumentPoliciesItemBlock[]
}

interface IDocumentPoliciesItemBlock {
    title?:string;
    documents?:IDocument[];
}

const DocumentPoliciesListBlock:any = ({ items, background, paddingTop, paddingBottom }:IDocumentPoliciesListBlock) : ReactNode => {
    return <ContentBlock paddingTop={paddingTop} paddingBottom={paddingBottom} background={background}>
        {
            Array.isArray(items) && items.length > 0 ? <Box>
                {
                    items.map((item:IDocumentPoliciesItemBlock, index:number) => {
                        return <Box key={index} mb={index === items.length - 1 ? 0 : 12}>
                            <Heading as="h3"
                                fontSize={['24px']}
                                lineHeight={['24px']}
                                fontWeight={700}
                                borderBottom="1px solid"
                                borderColor="borderColor"
                                py={4}>
                                <AnimateOverflow>
                                    {item.title}
                                </AnimateOverflow>
                            </Heading>
                            {
                                (Array.isArray(item.documents) && item.documents.length > 0) && <>
                                    {
                                        item.documents.map((document:IDocument, innerIndex:number) => {
                                            return <Box borderTop="1px solid" borderColor="borderColor" key={innerIndex}>
                                                <DocumentCard {...document} date={null} />
                                            </Box>;
                                        })
                                    }
                                    <Box borderBottom="1px solid" borderColor="borderColor" />
                                </>
                            }
                        </Box>;
                    })
                }
            </Box> : <Box>
                <Alert status="info">No documents</Alert>
            </Box>
        }
    </ContentBlock>;
};

export default DocumentPoliciesListBlock;
