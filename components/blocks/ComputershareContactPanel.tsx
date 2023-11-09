import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Heading, Box, Text, Divider, Link } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { IStructuredText } from '~/interfaces/util/structuredText';
import { Image } from '~/components/elements/image';
import { IImage } from '~/interfaces/util/image';
import { UnderlineLink } from '~/components/elements/sectionLink';
import { isEmptyDocument } from 'datocms-structured-text-utils';

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
        <Row>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.FiveTwelfths]}>
                {
                    title && <Heading as="h2"
                        fontSize={['28px', '32px', '36px']}
                        lineHeight={['35px', '38px', '42px']}
                        color="olive"
                        fontWeight={500}
                        pb={[4, , ,0]}>
                        {title}
                    </Heading>
                }
                {
                    !isEmptyDocument(description) && <Box
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
                        {
                            website ? <Link href={website} target="_blank">
                                <Image image={image} />
                            </Link> : <Image image={image} />
                        }
                    </Box>
                }
            </Column>
        </Row>
        <Divider borderColor="oliveBlur2" my={[4, 8, 12]} />
        <Row>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    (!isEmptyDocument(onlineDescription) || website) && <Box mb={[8, ,0]}>
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Online
                        </Heading>
                        {
                            !isEmptyDocument(onlineDescription) && <Box color="olive" mb={6}>
                                <StructuredContent content={onlineDescription} />
                            </Box>
                        }
                        {
                            website && <>
                                <Heading as="h4" fontSize={['18px']} lineHeight={['26px']} fontWeight={500} mb={2}>Website</Heading>
                                <Text mb={0}>
                                    <UnderlineLink href={website} target="_blank" fontWeight={500}>
                                        {website.replace(/^.*:\/\//i, '')}
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
                            (contactLocal || contactInternational) && <Box mb={8}>
                                <Heading as="h4" fontSize={['18px']} lineHeight={['26px']} fontWeight={500} mb={2}>Phone</Heading>
                                {
                                    contactLocal && <Text color="olive" mb={0}>
                                        <UnderlineLink href={`tel:${contactLocal}`} mr={2} fontWeight={500}>
                                            {contactLocal}
                                        </UnderlineLink>
                                        <Text as="span">
                                            (Australia)
                                        </Text>
                                    </Text>
                                }
                                {
                                    contactInternational && <Text color="olive" mb={0}>
                                        <UnderlineLink href={`tel:${contactInternational}`} mr={2} fontWeight={500}>
                                            {contactInternational}
                                        </UnderlineLink>
                                        <Text as="span">
                                            (International)
                                        </Text>
                                    </Text>
                                }
                            </Box>
                        }
                        {
                            email && <Box>
                                <Heading as="h4" fontSize={['18px']} lineHeight={['26px']} fontWeight={500} mb={2}>Email</Heading>
                                <Text color="olive" mb={0}>
                                    <UnderlineLink href={`mailto:${email}`} mr={2} fontWeight={500}>
                                        {email}
                                    </UnderlineLink>
                                </Text>
                            </Box>
                        }
                    </Box>
                }
            </Column>
            <Column width={[ColumnWidth.Full, ,ColumnWidth.OneThird]}>
                {
                    !isEmptyDocument(address) && <Box mb={0}>
                        <Heading as="h3" variant="sectionSubheading" mb={4}>
                            Address
                        </Heading>
                        <Box color="olive" mb={4}>
                            <StructuredContent content={address} />
                        </Box>
                    </Box>
                }

            </Column>
        </Row>
    </ContentBlock>;
};

export default ComputershareContactPanelBlock;
