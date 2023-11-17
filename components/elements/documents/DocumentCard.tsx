import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from "~/components/elements/sectionLink";

interface IDocumentCard extends IDocument {
    hideDate?:boolean;
}

const DocumentCard:any = ({ title, date, document, hideDate = false }:IDocumentCard) : ReactNode => {
    return <Flex py={[4, ,'22px']} direction={['row']} align="center" mx={-4}>

        <Flex direction={['column', , 'row']}
            width={['83.33333333%']}
            px={4}>
            {
                title && <Heading as="h3"
                    width={['unset', ,'60.3%']}
                    variant="listItem">
                    {
                        (document && document.url) ? <Link href={document?.url} target="_blank">
                            {title}
                        </Link> : <>{title}</>
                    }
                </Heading>
            }
            {
                (date && !hideDate) && <Text
                    variant="listLabel"
                    mb={0}>
                    {DateTime.fromISO(date).toFormat('MMM d, yyyy')}
                </Text>
            }
        </Flex>
        <Flex width={['16.6666666667%']}
            justify="flex-end"
            px={4}>
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
