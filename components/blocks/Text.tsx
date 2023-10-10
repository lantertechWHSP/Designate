import ContentBlock from "~/components/blocks/Content";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';

interface ITextBlock extends ChakraProps {
    id?:string;
    __typename?:string;
    content?:any;
}

const TextBlock:any = ({ content, ...props }:ITextBlock) : ReactNode => {
    return <ContentBlock {...props} my={8}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
