import ContentBlock from "~/components/blocks/Content";
import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';

interface ITextBlockProps {
    id?:string;
    __typename?:string;
    content?:any;
}

const TextBlock:any = ({ content }:ITextBlockProps) : ReactNode => {
    return <ContentBlock>
        <StructuredContent content={content} />
    </ContentBlock>;
};

export default TextBlock;
