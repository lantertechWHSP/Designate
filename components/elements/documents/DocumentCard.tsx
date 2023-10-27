import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Link, Box } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from "~/components/elements/sectionLink";

interface IDocumentCard extends IDocument {
}

const DocumentCard:any = ({ title, date, document }:IDocumentCard) : ReactNode => {
    return <Flex role="group"
        borderTop="1px solid"
        borderColor="borderColor"
        direction="row"
        color="darkBrownBlur"
        align="center"
        transition="color 0.3s linear"
        _hover={{
            color: 'black'
        }}
        py={[4, ,'22px']}>
        <Box position="relative" top="1px" flex={1}>
            {
                (title && (document && document.url)) ? <Link href={document?.url}
                    display="inline"
                    as="a"
                    mr={3}
                    target="_blank">
                    <Heading as="h3"
                        display="inline"
                        variant="listItem">
                        {title}
                    </Heading>
                </Link> : title && <Heading as="h3"
                    mr={3}
                    display="inline"
                    variant="listItem">
                    {title}
                </Heading>
            }
            {
                date && <Text as="span"
                    display="inline"
                    variant="listLabel" mr={2} >
                    {DateTime.fromISO(date).toFormat('d/M/yyyy')}
                </Text>
            }
        </Box>
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
