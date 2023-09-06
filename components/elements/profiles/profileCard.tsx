import { ReactNode } from 'react';
import { Image } from '~/components/elements/image';
import { IPerson } from "~/interfaces/models/person";
import { Box, Heading } from '@chakra-ui/react';

interface IProfileCardProps extends IPerson {
    onClick:() => any;
}

const ProfileCard:any = ({ image, name, companyPosition, onClick }:IProfileCardProps) : ReactNode => {
    return <Box>
        <Image image={image} ratio={[1 / 1]} onClick={onClick} mb={4} />
        {
            name && <Heading as="h2" variant="h4" fontWeight={400}>
                {name}
            </Heading>
        }
        {
            companyPosition && <Heading as="h3" variant="h5" color="steelBlue2" fontWeight={400}>
                {companyPosition}
            </Heading>
        }
    </Box>;
};

export default ProfileCard;
