import { ReactNode } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import StructuredContent from 'components/StructuredContent';

interface ITextBlock extends IBlock, ChakraProps {
    content?:any;
}

const TextBlock:any = ({ background, content, containerWidth, contain, paddingTop, paddingBottom }:ITextBlock) : ReactNode => {
    return <ContentBlock background={background} containerWidth={containerWidth} contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
