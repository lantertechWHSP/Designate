import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import StructuredContent from 'components/StructuredContent';
import { IStructuredText } from '~/interfaces/util/structuredText';

interface ITextBlock extends IBlock {
    content?:IStructuredText;
}

const TextBlock:any = ({ background, content, containerWidth, contain, paddingTop, paddingBottom }:ITextBlock) : ReactNode => {
    return content && <ContentBlock className="TextBlock" background={background} containerWidth={containerWidth} contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
