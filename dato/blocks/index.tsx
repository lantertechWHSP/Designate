import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { audioRecord } from '~/dato/blocks/audio';
import { heroRecord } from '~/dato/blocks/hero';
import { cardContainerRecord } from '~/dato/blocks/cardContainer';
import { latestNewsRecord } from '~/dato/blocks/latestNews';
import { investorPanelRecord } from '~/dato/blocks/investorPanel';
import { homePageOverviewRecord } from '~/dato/blocks/homePageOverview';

export const blocks = `
    blocks {
        ... on TextRecord {
            ${textRecord}
        }
        ... on ImageRecord {
            ${imageRecord}
        }
        ... on VideoRecord {
            ${videoRecord}
        }
        ... on AudioRecord {
            ${audioRecord}
        }
        ... on HeroRecord {
            ${heroRecord}
        }
        ... on CardContainerRecord {
            ${cardContainerRecord}
        }
        ... on LatestNewsRecord {
            ${latestNewsRecord}
        }
        ... on InvestorPanelRecord {
            ${investorPanelRecord}
        }
        ... on HomepageOverviewRecord {
            ${homePageOverviewRecord}
        }
    }
`;
