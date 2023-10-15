import ContentBlock, { ContainerWidth } from "~/components/blocks/Content";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';

interface ITextBlock extends ChakraProps {
    id?:string;
    __typename?:string;
    content?:any;
    containerWidth?:ContainerWidth;
}

const TextBlock:any = ({ content, containerWidth }:ITextBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} my={8}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
