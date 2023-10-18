import { ReactNode } from 'react';
import { Image } from '~/components/elements/image';
import { IPerson } from "~/interfaces/models/person";
import { Box, Heading } from '@chakra-ui/react';

interface IProfileCard extends IPerson {
    onClick:() => any;
}

const ProfileCard:any = ({ image, name, companyPosition, onClick }:IProfileCard) : ReactNode => {
    return <Box>
        <Image image={image} ratio={[1 / 1]} onClick={onClick} mb={4} />
        {
            name && <Heading as="h3" fontSize={['21px']} lineHeight={['26px']} fontWeight={500}>
                {name}
            </Heading>
        }
        {
            companyPosition && <Heading as="h4" fontSize={['19px']} lineHeight={['28px']} color="darkBrown" fontWeight={400}>
                {companyPosition}
            </Heading>
        }
    </Box>;
};

export default ProfileCard;
