import { ReactNode } from 'react';
import { Image } from '~/components/elements/image';
import { IPerson } from "~/interfaces/models/person";
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { SectionLink } from '~/components/elements/sectionLink';
import StructuredContent from "~/components/StructuredContent";
import { isEmptyDocument } from 'datocms-structured-text-utils';

interface IProfileCard extends IPerson {
    onClick:() => any;
}

const ProfileCard:any = ({ image, name, companyPosition, qualifications, onClick }:IProfileCard) : ReactNode => {
    return <Flex direction="column">
        <Image image={image} ratio={[1 / 1]} onClick={onClick} mb={4} cursor="pointer" />
        {
            name && <Heading as="h3" fontSize={['21px']} lineHeight={['26px']} fontWeight={500}>
                {name}
            </Heading>
        }
        {
            !isEmptyDocument(companyPosition) && <Heading as="h4" fontSize={['19px']} lineHeight={['28px']} color="steel" fontWeight={400}>
                <StructuredContent content={companyPosition} />
            </Heading>
        }
        {
            qualifications && <Text mb={0} fontSize={['16px']} color="oliveBlur">
                {qualifications}
            </Text>
        }
        {
            <Box flex="1" />
        }
        {
            <Box mt={8}>
                <SectionLink onClick={onClick} href="javacript:void(0)">
                    Read More
                </SectionLink>
            </Box>
        }
    </Flex>;
};

export default ProfileCard;
