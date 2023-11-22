import { ReactNode } from 'react';
import { IDocument } from "~/interfaces/models/document";
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { SectionLink } from "~/components/elements/sectionLink";
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

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
                    <AnimateOverflow>
                        {
                            (document && document.url) ? <Link href={document?.url} target="_blank">
                                {title}
                            </Link> : <>{title}</>
                        }
                    </AnimateOverflow>
                </Heading>
            }
            {
                (date && !hideDate) && <Text
                    variant="listLabel"
                    mb={0}>
                    <AnimateOverflow>
                        {DateTime.fromISO(date).toFormat('MMM d, yyyy')}
                    </AnimateOverflow>
                </Text>
            }
        </Flex>
        <Flex width={['16.6666666667%']}
            justify="flex-end"
            px={4}>
            {
                (document && document.url) && <AnimateOverflow>
                    <SectionLink href={document?.url}
                        as="a"
                        target="_blank">
                        View
                    </SectionLink>
                </AnimateOverflow>
            }
        </Flex>
    </Flex>;
};

export default DocumentCard;
