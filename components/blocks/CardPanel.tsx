import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ILink } from '~/interfaces/util/link';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from "~/components/elements/link";
import { SectionLink } from "~/components/elements/sectionLink";
import { gutter } from "~/components/elements/grid/grid";
import { IImage } from "~/interfaces/util/image";

enum ICardPanelAlign {
    Left = 'Left',
    Right = 'Right'
}

interface ICardPanelBlock extends IBlock {
    annotation?:string;
    title?:string;
    description?:string;
    image?:IImage;
    align?:ICardPanelAlign;
    link?:ILink;
}

const CardPanelBlock:any = ({ annotation, title, description, image, link, align, paddingTop, paddingBottom }:ICardPanelBlock) : ReactNode => {
    return (annotation || title || image && image?.url || link) && <ContentBlock background="ghostWhite" paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Flex direction={['column', ,(align === ICardPanelAlign.Right) ? 'row-reverse' : 'row']} borderRadius="3px" overflow="hidden" filter="drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.10))" >
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
                    link && <SectionLink {...link}>
                        {link.document ? 'Download' : 'Read More'}
                    </SectionLink>
                }
            </Flex>
            <Box width={['100%', ,'50%']}
                minHeight="400px"
                position="relative"
                background={image?.responsiveImage ? `url('${image.responsiveImage.src}')` : 'lightGrey'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover">
                {
                    link && <Link {...link} position="absolute" top="0" bottom="0" left="0" right="0" />
                }
            </Box>
        </Flex>
    </ContentBlock>;
};

export default CardPanelBlock;
