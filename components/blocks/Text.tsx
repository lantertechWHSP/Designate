import StructuredContent from 'components/StructuredContent';

function TextBlock({ content }) {
    return (
        <Block {...blockProps}
               py={blockProps?.py ? blockProps?.py : [0]}
               my={blockProps?.my ? blockProps?.my : [8, ,12]}
               containerWidth={containerWidth}>
            <StructuredContent content={content} />
        </Block>
    );
}

export default TextBlock;
