import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { IImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid, Flex } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';

interface ICompanyValuesPanelBlock extends ChakraProps {
    items:ICompanyValue;
}

interface ICompanyValue {
    title?:string;
    icon?:IImage;
}

const CompanyValuesPanelBlock:any = ({ items, ...props }:ICompanyValuesPanelBlock) : ReactNode => {
    return <ContentBlock {...props} py={8}>
        {
            (Array.isArray(items) && items.length > 0) && <>
                <Heading as="h3" variant="h3" mb={4}>
                    Our People and Values
                </Heading>
                <SimpleGrid background="ghostWhite" columns={[1, , 3]} spacing={[0, 4]}>
                    {
                        items.map((item:ICompanyValue, index:number) => {
                            return <Flex direction="column" key={index} py={8} px={4} align="center">
                                {
                                    item.icon && <Box mb={4}>
                                        <Image image={item.icon} width="100px" height="100px" ratio={[1 / 1]} />
                                    </Box>
                                }
                                {
                                    item.title && <Heading as="h3" variant="h4" mb={2}>
                                        {item.title}
                                    </Heading>
                                }
                            </Flex>;
                        })
                    }
                </SimpleGrid></>
        }
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
