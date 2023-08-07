import StructuredContent from 'components/StructuredContent';
import { ReactNode } from 'react';

const TextBlock = ({ content }) : ReactNode => {
    return (
        <StructuredContent content={content} />
    );
};

export default TextBlock;
