import Text from '~/components/blocks/Text';
import Image from '~/components/blocks/Image';
import Video from '~/components/blocks/Video';

import Hero from '~/components/blocks/Hero';
import Card from '~/components/blocks/CardContainer/Card';
import CardContainer from '~/components/blocks/CardContainer/CardContainer';
import LatestNews from '~/components/blocks/LatestNews';

const blocks:any = {
    Text,
    Image,
    Video,

    Hero,
    Card,
    CardContainer,
    LatestNews
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
