import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import { ChakraProps } from '@chakra-ui/system';
import { DateTime } from 'luxon';
import { SectionLink } from "~/components/elements/sectionLink";

interface IDocumentCard extends IDocument, ChakraProps {
}

const DocumentCard:any = ({ title, date, document }:IDocumentCard) : ReactNode => {
    return <Flex py={4} direction={['row']}
        _hover={{
            transition: 'background 0.3s linear',
            background: 'lightGrey2Blur'
        }}>
        {
            (title && (document && document.url)) ? <Link href={document?.url}
                display="block"
                as="a"
                flex={1}
                target="_blank">
                <Heading as="h3"
                    variant="listItem">
                    {title}
                </Heading>
            </Link> : title && <Heading as="h3"
                flex={1}
                variant="listItem">
                {title}
            </Heading>
        }
        {
            date && <Text
                variant="listLabel"
                textAlign={['right', ,'left']}
                minWidth={['140px']}
                maxWidth={['140px']}
                mb={0} >
                {DateTime.fromISO(date).toFormat('d/M/yyyy')}
            </Text>
        }
        <Flex minWidth={['unset', ,'140px']}
            justify="flex-end"
            display={['none', ,'flex']}>
            {
                (document && document.url) && <SectionLink href={document?.url}
                    as="a"
                    target="_blank">
                    View
                </SectionLink>
            }
        </Flex>
    </Flex>;
};

export default DocumentCard;
