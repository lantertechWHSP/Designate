import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Box, Link } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { DateTime } from 'luxon';

interface IDocumentCardProps extends IDocument, ChakraProps {
}

const DocumentCard:any = ({ title, date, document }:IDocumentCardProps) : ReactNode => {
    return <Flex py={4} direction={['row']} alignItems={['center']}>
        {
            title && <Heading as="h3"
                flex={1}
                variant="listItem">
                {title}
            </Heading>
        }
        {
            date && <Text variant="listItemDate"
                textAlign={['left', ,'right']}
                ml={4}
                mb={0}>
                {DateTime.fromISO(date).toFormat('d/M/yyyy')}
            </Text>
        }
        {
            (document && document.url) && <Box ml={4}>
                <Link href={document?.url}
                      as="a"
                      target="_blank">
                    View
                </Link>
            </Box>
        }
    </Flex>;
};

export default DocumentCard;
