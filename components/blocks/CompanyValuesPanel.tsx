import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { ISVGImage} from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid, Flex } from '@chakra-ui/react';

interface ICompanyValuesPanelBlock extends ChakraProps {
    items?:ICompanyValue[];
}

interface ICompanyValue {
    title?:string;
    icon?:ISVGImage;
}

const CompanyValuesPanelBlock:any = ({ items, ...props }:ICompanyValuesPanelBlock) : ReactNode => {
    return <ContentBlock {...props} py={8}>
        {
            (Array.isArray(items) && items.length > 0) && <>
                <Heading as="h3" variant="h3" mb={4}>
                    Our People and Values
                </Heading>
                <SimpleGrid background="ghostWhite" columns={[1, ,items.length > 4 ? 4 : items.length]} spacing={[4]}>
                    {
                        items.map((item:ICompanyValue, index:number) => {
                            return <Flex direction="column" key={index} py={8} px={4}>
                                {
                                    (item.icon && item.icon.url) && <Box mb={4}><img src={item.icon.url} alt={item.icon?.alt} /></Box>
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
