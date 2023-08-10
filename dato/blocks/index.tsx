import { textRecord } from '~/dato/blocks/text';
import { imageRecord } from '~/dato/blocks/image';
import { videoRecord } from '~/dato/blocks/video';
import { heroRecord } from '~/dato/blocks/hero';
import { cardContainerRecord } from '~/dato/blocks/cardContainer';
import { latestNewsRecord } from '~/dato/blocks/latestNews';

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
        ... on HeroRecord {
            ${heroRecord}
        }
        ... on CardContainerRecord {
            ${cardContainerRecord}
        }
        ... on LatestNewsRecord {
            ${latestNewsRecord}
        }
    }
`;
