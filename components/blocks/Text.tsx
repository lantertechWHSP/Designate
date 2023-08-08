import ContentBlock from "~/components/blocks/ContentBlock";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';

const TextBlock = ({ content }) : ReactNode => {
    return <ContentBlock>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
