import { ReactNode } from 'react';
import { ILink } from '~/interfaces/util/link';
import ContentBlock from '~/components/blocks/Content';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";
import { SectionLink } from "~/components/elements/sectionLink";
import { gutter } from "~/components/elements/grid/grid";
import { IDocument } from "~/interfaces/models/document";
import { IImage } from "~/interfaces/util/image";

enum ICardPanelAlign {
    Left = 'Left',
    Right = 'Right'
}

interface ICardPanelBlock {
    annotation?:string;
    title?:string;
    description?:string;
    image?:IImage;
    align?:ICardPanelAlign;
    link?:ILink;
    document?:IDocument;
}

const CardPanelBlock:any = ({ annotation, title, description, image, link, document, align }:ICardPanelBlock) : ReactNode => {


    return <ContentBlock background="ghostWhite" py={[6, 8, 12]}>
        <Flex direction={['column', ,(align === ICardPanelAlign.Right) ? 'row-reverse' : 'row']}>
            <Flex width={['100%', ,'50%']} background="white" direction="column" p={[6, ,gutter * 2]}>
                {
                    annotation && <Text variant="annotation" mb={[2, 4 ,8]}>
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
            <Box width={['100%', ,'50%']}
                position="relative"
                backgroundImage={`url('${image.responsiveImage.src}')`}
                backgroundPosition="center"
                backgroundSize="cover">
                {
                    link ? <Link {...link} position="absolute" top="0" bottom="0" left="0" right="0" title="">
                    </Link> : (document && document?.document.url) && <Link href={document.document?.url}
                        as="a" target="_blank" position="absolute" top="0" bottom="0" left="0" right="0">
                    </Link>
                }
                <Box paddingTop="66%" />
            </Box>
        </Flex>
    </ContentBlock>;
};

export default CardPanelBlock;
