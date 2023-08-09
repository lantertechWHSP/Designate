import Text from '~/components/blocks/Text';
import Image from '~/components/blocks/Image';
import Video from '~/components/blocks/Video';

const blocks:any = {
    Text,
    Image,
    Video,
};

export const getBlock = (name:any) : any => {
    return blocks[name?.replace('Record', '')];
};

export const ModularContent = ({ content }) : any => {
    if (!content || !Array.isArray(content)) {
        return null;
    }

    return content.map((block) => {
        const Block = getBlock(block.__typename);
        if (!Block) return null;
        return <Block key={block.id} {...block} />;
    });
};
