import ContentBlock, { BackgroundColor, ContainerWidth } from '~/components/blocks/Content';
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';

interface ITextBlock extends ChakraProps {
    id?:string;
    __typename?:string;
    content?:any;
    containerWidth?:ContainerWidth;
    background?:BackgroundColor;
    contain?:boolean;
}

const TextBlock:any = ({ background, content, containerWidth, contain }:ITextBlock) : ReactNode => {
    return <ContentBlock background={background} containerWidth={containerWidth} contain={contain} py={[6, 8, 12]}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
