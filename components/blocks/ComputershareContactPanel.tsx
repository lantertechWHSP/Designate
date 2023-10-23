import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Heading, Box, Text } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { IStructuredText } from '~/interfaces/util/structuredText';
import { Link } from '~/components/elements/link';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';

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

const ComputershareContactPanelBlock:any = ({ title, description, image, onlineDescription, website, contactLocal, contactInternational, email, address }:IComputershareContactPanelBlock) : ReactNode => {
    return <ContentBlock>
        <Row mb={8}>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    title && <Heading as="h2" variant="sectionHeading">
                        {title}
                    </Heading>
                }
                {
                    description && <Box
                        fontSize={['19px']}
                        lineHeight={['29px']}
                        color="darkBrown">
                        <StructuredContent content={description} />
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]} />
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
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
                                    <Link href={website} variant="underline">
                                        {website}
                                    </Link>
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
                                        <Link href={`tel:${contactLocal}`} variant="underline" mr={2}>
                                            {contactLocal}
                                        </Link>
                                        <Text as="span">
                                            (Australia)
                                        </Text>
                                    </Text>
                                }
                                {
                                    contactInternational && <Text color="darkBrown" mb={0}>
                                        <Link href={`tel:${contactInternational}`} variant="underline" mr={2}>
                                            {contactInternational}
                                        </Link>
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
