import ContentBlock from '~/components/blocks/Content';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { IImage } from '~/interfaces/util/image';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';

interface ICompanyValuesProps extends ChakraProps {
    items:ICompanyValue;
}

interface ICompanyValue {
    title?:string;
    content?:string;
    icon?:IImage;
}

const CompanyValuesPanelBlock:any = ({ items, ...props }:ICompanyValuesProps) : ReactNode => {
    return <ContentBlock {...props} background="lightGrey3" py={8}>
        {
            (Array.isArray(items) && items.length > 0) && <SimpleGrid columns={[1, , 4]} spacing={[0, 8]}>
                {
                    items.map((item:ICompanyValue, index:number) => {
                        return <Box key={index}>
                            {
                                item.icon && <Box mb={4}>
                                    <Image image={item.icon} width="30px" height="30px" ratio={[1 / 1]} />
                                </Box>
                            }
                            {
                                item.title && <Heading as="h3" variant="h4" mb={2}>
                                    {item.title}
                                </Heading>
                            }
                            {
                                item.content && <Box>
                                    {item.content}
                                </Box>
                            }
                        </Box>;
                    })
                }
            </SimpleGrid>
        }
    </ContentBlock>;
};

export default CompanyValuesPanelBlock;
