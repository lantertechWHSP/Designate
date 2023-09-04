import Text from '~/components/blocks/Text';
import Image from '~/components/blocks/Image';
import Video from '~/components/blocks/Video';
import Audio from '~/components/blocks/Audio';

import Hero from '~/components/blocks/Hero';
import Card from '~/components/blocks/CardContainer/Card';
import CardContainer from '~/components/blocks/CardContainer/CardContainer';
import LatestNews from '~/components/blocks/LatestNews';
import InvestorPanel from '~/components/blocks/InvestorPanel';
import HomePageOverview from '~/components/blocks/HomePageOverview';
import DividendsPanel from '~/components/blocks/DividendsPanel/DividendsPanel';

import { isNil as _isNil } from 'lodash';

const blocks:any = {
    Text,
    Image,
    Video,
    Audio,

    Hero,
    Card,
    CardContainer,
    LatestNews,
    InvestorPanel,
    HomePageOverview,
    DividendsPanel
};

export const getBlock = (name:any) : any => {
    return blocks[name?.replace('Record', '')];
};

export const ModularContent = ({ content }) : any => {
    if(!_isNil(content) && Array.isArray(content) && content.length > 0) {
        return content.map((block, index) => {
            const Block = getBlock(block.__typename);
            if (!Block) {
                return <></>;
            }
            return <Block key={index} {...block} />;
        });
    }

    return <></>;
};
