import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Heading, Box, Text } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { IStructuredText } from '~/interfaces/util/structuredText';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import { UnderlineLink } from '~/components/elements/sectionLink';

interface IComputershareContactPanelBlock extends IBlock {
    title?:string;
    description?:IStructuredText;
    image?:IImage;
    onlineDescription?:IStructuredText;
    website?:string;
    contactLocal?:string;
    contactInternational?:string;
    email?:string;
    address?:IStructuredText;
}

const ComputershareContactPanelBlock:any = ({ title, description, image, onlineDescription, website, contactLocal, contactInternational, email, address, paddingBottom }:IComputershareContactPanelBlock) : ReactNode => {
    return (title || description || image || onlineDescription || website || contactLocal || contactInternational || email || address) && <ContentBlock paddingBottom={paddingBottom}>
        <Row mb={8}>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.FiveTwelfths]}>
                {
                    title && <Heading as="h2" variant="sectionHeading" fontWeight={500}>
                        {title}
                    </Heading>
                }
                {
                    description && <Box
                        fontSize={['19px']}
                        lineHeight={['29px']}>
                        <StructuredContent content={description} />
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.ThreeTwelfths]} />
            <Column width={[ColumnWidth.Full, ,ColumnWidth.FourTwelvfths]}>
                {
                    image && <Box maxWidth={['300px']} mt={[8, ,0]}>
                        <Image image={image} />
                    </Box>
                }
            </Column>
        </Row>
        <Row>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    (onlineDescription || website) && <Box mb={[8, ,0]}>
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Online
                        </Heading>
                        {
                            onlineDescription && <Box mb={4}>
                                <StructuredContent content={onlineDescription} />
                            </Box>
                        }
                        {
                            website && <>
                                <Heading as="h4" fontSize={['18px']} lineHeight={['26px']} fontWeight={500} mb={4}>Website</Heading>
                                <Text mb={0}>
                                    <UnderlineLink href={website}>
                                        {website}
                                    </UnderlineLink>
                                </Text>
                            </>
                        }
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    (contactLocal || contactInternational || email) && <Box mb={[8, ,0]}>
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Contact
                        </Heading>
                        {
                            (contactLocal || contactInternational) && <Box>
                                <Heading as="h4" fontSize={['18px']} lineHeight={['26px']} fontWeight={500} mb={4}>Website</Heading>
                                {
                                    contactLocal && <Text color="darkBrown" mb={0}>
                                        <UnderlineLink href={`tel:${contactLocal}`} mr={2}>
                                            {contactLocal}
                                        </UnderlineLink>
                                        <Text as="span">
                                            (Australia)
                                        </Text>
                                    </Text>
                                }
                                {
                                    contactInternational && <Text color="darkBrown" mb={0}>
                                        <UnderlineLink href={`tel:${contactInternational}`} mr={2}>
                                            {contactInternational}
                                        </UnderlineLink>
                                        <Text as="span">
                                            (International)
                                        </Text>
                                    </Text>
                                }
                            </Box>
                        }
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    (address) && <Box mb={0}>
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Address
                        </Heading>
                        <Box mb={4}>
                            <StructuredContent content={address} />
                        </Box>
                    </Box>
                }

            </Column>
        </Row>
    </ContentBlock>;
};

export default ComputershareContactPanelBlock;
