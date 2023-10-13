import { ReactNode } from 'react';
import { ILink } from '~/interfaces/util/link';
import ContentBlock from '~/components/blocks/Content';
import { Image } from '~/components/elements/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import {Link} from "~/components/elements/link";
import {SectionLink} from "~/components/elements/sectionLink";

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
}

const CardPanelBlock:any = ({ annotation, title, description, image, link, align }:ICardPanelBlock) : ReactNode => {
    return <ContentBlock background="ghostWhite" py={8}>
        <Flex direction={(align === ICardPanelAlign.Right) ? 'row-reverse' : 'row'}>
            <Flex width="50%" background="white" direction="column" p={8}>
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
                    link && <SectionLink {...link}>
                        Read More
                    </SectionLink>
                }
            </Flex>
            <Box width="50%">
                {
                    link ? <Link {...link}>
                        <Image image={image} ratio={[3 / 2]} />
                    </Link> : <>
                        <Image image={image} ratio={[3 / 2]} />
                    </>
                }
            </Box>
        </Flex>
    </ContentBlock>;
};

export default CardPanelBlock;
