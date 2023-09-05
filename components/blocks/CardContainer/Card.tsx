import { ReactNode } from 'react';
import { Box, Text, Heading, AspectRatio } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';
import { DatoLink } from '~/components/elements/datoLink';

interface ICardBlockProps {
    link:IDatoLink;
}

const CardBlock = ({ link }:ICardBlockProps) : ReactNode => {
    return <DatoLink link={link} color="black">
        <AspectRatio ratio={[3 / 2]}>
            <Box bg="ghostWhite">
                <Box position="absolute" bottom="20px" left="20px">
                    <Heading fontSize={24} fontWeight={500} mb={2}>
                        {link.title}
                    </Heading>
                    <Box display="inline-flex" style={{ alignItems: 'center' }} borderBottom="1px" borderColor="black">
                        <Text>View</Text><Icon w={12} h={12} icon={Icons.ChevronRight} />
                    </Box>
                </Box>
            </Box>
        </AspectRatio>
    </DatoLink>;
};

export default CardBlock;
