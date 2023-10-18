import ContentBlock, { ContainerWidth } from "~/components/blocks/Content";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';

interface ITextBlock extends ChakraProps {
    id?:string;
    __typename?:string;
    content?:any;
    containerWidth?:ContainerWidth;
    contain?:boolean;
}

const TextBlock:any = ({ content, containerWidth, contain }:ITextBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} contain={contain} my={8}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
