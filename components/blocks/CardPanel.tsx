import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { ILink } from '~/interfaces/util/link';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { IImage } from "~/interfaces/util/image";
import { Link } from "~/components/elements/link";
import { SectionLink } from '~/components/elements/sectionLink';

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

const CardPanelBlock:any = ({ annotation, title, description, image, link, align, containerWidth, background, paddingTop, paddingBottom }:ICardPanelBlock) : ReactNode => {
    return (annotation || title || image && image?.url || link) && <ContentBlock className="CardPanelBlock" containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box background="white" borderRadius="3px" overflow="hidden" filter="drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.10))" >
            <Row direction={['column', ,(align === ICardPanelAlign.Right) ? 'row-reverse' : 'row']}>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                    <Flex py={[6, ,8]}
                        flex="1"
                        direction="column"
                        pl={align === ICardPanelAlign.Right ? [6, ,0] : [6, ,8]}
                        pr={align === ICardPanelAlign.Left ? [6, ,0] : [6, ,8]}>
                        {
                            annotation && <Text variant="caption" mb={[2, 4 ,8]}>
                                {annotation}
                            </Text>
                        }
                        {
                            title && <Heading as="h2" variant="sectionHeading" mb={4}>
                                {
                                    link ? <Link {...link}>
                                        {title}
                                    </Link> : <>{title}</>
                                }
                            </Heading>
                        }
                        {
                            description && <Text variant="sectionDescription">{description}</Text>
                        }
                        <Box flex={1} />
                        {
                            link && <SectionLink {...link} mt={4}>
                                {link.document ? 'Download' : 'Read More'}
                            </SectionLink>
                        }
                    </Flex>
                </Column>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.Half]}>
                    <Box position="relative" height={['320px', ,'400px']} minHeight="100%">
                        {
                            link ? <Link {...link}
                                display="block"
                                width="100%"
                                height="100%"
                                position="absolute"
                                title=""
                                background={image?.responsiveImage ? `url('${image.responsiveImage.src}')` : 'lightGrey'}
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover">
                            </Link> : <Box width="100%"
                                height="100%"
                                position="absolute"
                                title=""
                                background={image?.responsiveImage ? `url('${image.responsiveImage.src}')` : 'lightGrey'}
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover">
                            </Box>
                        }
                    </Box>
                </Column>
            </Row>
        </Box>
    </ContentBlock>;
};

export default CardPanelBlock;
