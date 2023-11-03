import { ReactNode } from 'react';
import { Image } from '~/components/elements/image';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { SectionLink } from '~/components/elements/sectionLink';
import { IPerson } from '~/interfaces/models/person';
import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IProfileCard {
    person?:IPerson;
    detailedCompanyPosition?:IStructuredText;
    description?:IStructuredText;
    onClick:() => any;
}

const ProfileCard:any = ({ person, onClick }:IProfileCard) : ReactNode => {
    return <Flex direction="column">
        <Image image={person?.image} ratio={[424 / 310]} onClick={onClick} mb={4} cursor="pointer" />
        {
            person?.name && <Heading as="h3" fontSize={['21px']} lineHeight={['26px']} fontWeight={500}>
                {person.name}
            </Heading>
        }
        {
            person?.companyPosition && <Heading as="h4" fontSize={['19px']} lineHeight={['28px']} color="steel" fontWeight={400}>
                {person?.companyPosition}
            </Heading>
        }
        {
            person?.qualifications && <Text mb={0} fontSize={['16px']} color="oliveBlur">
                {person.qualifications}
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
