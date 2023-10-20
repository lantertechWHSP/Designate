import { ReactNode } from 'react';
import ContentBlock from '~/components/blocks/Content';
import { IImage } from '~/interfaces/util/image';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';

interface IPortfolioImageGalleryBlock {
    contain?:boolean;
    images:IImage[];
}

const PortfolioImageGalleryBlock:any = ({ contain, images }:IPortfolioImageGalleryBlock) : ReactNode => {
    return <ContentBlock contain={contain} py={8}>
        {
            (Array.isArray(images) && images.length > 0) && <SimpleGrid background="ghostWhite" columns={[1, ,images.length > 4 ? 4 : images.length]} spacing={[4]}>
                {
                    images.map((image:IImage, index:number) => {
                        return <Flex align="center" justify="center" p={[8, ,12]} key={index}>
                            <Image image={image} />
                        </Flex>;
                    })
                }
            </SimpleGrid>
        }

    </ContentBlock>;
};

export default PortfolioImageGalleryBlock;
