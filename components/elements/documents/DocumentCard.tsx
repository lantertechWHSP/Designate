import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from "~/components/elements/sectionLink";

interface IDocumentCard extends IDocument {
}

const DocumentCard:any = ({ title, date, document }:IDocumentCard) : ReactNode => {
    return <Flex py={[4, ,'22px']} direction={['row']} align="center">

        <Flex direction={['column', , 'row']}
            flex={1}
            pr={2}>
            {
                title && <Heading as="h3"
                    variant="listItem">
                    {
                        (document && document.url) ? <Link href={document?.url} target="_blank">
                            {title}
                        </Link> : <>{title}</>
                    }
                </Heading>
            }
            {
                date && <Text
                    variant="listLabel"
                    minWidth={['100%', '20%', '30%']}
                    maxWidth={['100%', '20%', '30%']}
                    mb={0} >
                    {DateTime.fromISO(date).toFormat('MMM d, yyyy')}
                </Text>
            }
        </Flex>
        <Flex minWidth={['60px', '140px']}
            justify="flex-end">
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
