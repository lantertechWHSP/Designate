import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { IDocument } from '~/interfaces/models/document';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { IImage } from '~/interfaces/util/image';
import { Image } from '~/components/elements/image';
import { SectionLink } from "~/components/elements/sectionLink";

interface IDocumentHeroPanelBlock {
    coverImage:IImage;
    document:IDocument;
    description:string;
}

const DocumentHeroPanelBlock:any = ({ coverImage, document, description }:IDocumentHeroPanelBlock) : ReactNode => {
    return <ContentBlock py={8}>
        <Flex background="white">
            <Flex minW="50%" p={8}>
                <Flex direction="column">
                    {
                        document.title && <Heading as="h2">
                            {document.title}
                        </Heading>
                    }
                    {
                        description && <Text>
                            {description}
                        </Text>
                    }
                    <Box flex="1" />
                    {
                        <SectionLink href={document.document.url} download={document.document.title} target="_blank">
                            Download
                        </SectionLink>
                    }
                </Flex>

            </Flex>
            <Box minW="50%">
                <Image image={coverImage} />
            </Box>
        </Flex>
    </ContentBlock>
}

export default DocumentHeroPanelBlock;
