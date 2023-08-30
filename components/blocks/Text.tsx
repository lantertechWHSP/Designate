import ContentBlock from "~/components/blocks/Content";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';

const TextBlock = ({ content }:any) : ReactNode => {
    return <ContentBlock>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
