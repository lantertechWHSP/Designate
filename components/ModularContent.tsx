import Text from '~/components/blocks/Text';

const blocks = {
    Text,
}

export const getBlock = (name) => {
    return blocks[name?.replace('Record', '')]
};

export const ModularContent = ({ content }) => {
    if (!content || !Array.isArray(content)) {
        return null;
    }

    return content.map((block) => {
        const Block = getBlock(block.__typename);
        if (!Block) return null;
        return <Block key={block.id} {...block} />;
    });
}
