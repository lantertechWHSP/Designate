import { ReactNode } from 'react';
import { ILink } from '~/interfaces/util/link';
import ContentBlock from '~/components/blocks/Content';
import { Image } from '~/components/elements/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";
import { SectionLink } from "~/components/elements/sectionLink";
import { gutter } from "~/components/elements/grid/grid";
import { IDocument } from "~/interfaces/models/document";

enum ICardPanelAlign {
    Left = 'Left',
    Right = 'Right'
}

interface ICardPanelBlock {
    annotation?:string;
    title?:string;
    description?:string;
    image?:string;
    align?:ICardPanelAlign;
    link?:ILink;
    document?:IDocument;
}

const CardPanelBlock:any = ({ annotation, title, description, image, link, document, align }:ICardPanelBlock) : ReactNode => {
    console.log(document);

    return <ContentBlock background="ghostWhite" py={8}>
        <Flex direction={(align === ICardPanelAlign.Right) ? 'row-reverse' : 'row'}>
            <Flex width="50%" background="white" direction="column" p={gutter * 2}>
                {
                    annotation && <Text variant="annotation" mb={8}>
                        {annotation}
                    </Text>
                }
                {
                    title && <Heading as="h2" variant="sectionHeading" mb={4}>{title}</Heading>
                }
                {
                    description && <Text variant="sectionDescription">{description}</Text>
                }
                <Box flex={1} />
                {
                    link ? <SectionLink {...link}>
                        Read More
                    </SectionLink> : (document && document?.document.url) && <Link href={document.document?.url}
                                                                                   as="a"
                                                                                   target="_blank">
                        Download
                    </Link>
                }
            </Flex>
            <Box width="50%">
                {
                    link ? <Link {...link}>
                        <Image image={image} ratio={[3 / 2]} />
                    </Link> : document && document?.document.url ? <>
                        <Link href={document.document?.url}
                              as="a"
                              target="_blank">
                            <Image image={image} ratio={[3 / 2]} />
                        </Link>
                    </> : <Image image={image} ratio={[3 / 2]} />
                }
            </Box>
        </Flex>
    </ContentBlock>;
};

export default CardPanelBlock;
