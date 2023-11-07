import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Text } from '@chakra-ui/react';

interface IAudioBlock extends IBlock {
    title?:string;
    soundcloudTrackId?:string;
    whooshkaaId?:string;
    omnyFmUrl?:string;
}

const AudioBlock:any = ({ title, soundcloudTrackId, omnyFmUrl, whooshkaaId, contain, paddingTop, paddingBottom, containerWidth }:IAudioBlock) : ReactNode => {

    if(omnyFmUrl) {
        omnyFmUrl = omnyFmUrl.endsWith('/') ?  omnyFmUrl.slice(0, -1) : omnyFmUrl;
    }

    return <ContentBlock contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom} containerWidth={containerWidth}>
        {
            soundcloudTrackId && <iframe width="100%"
                height="170"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudTrackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`} />
        }
        {
            (omnyFmUrl) && <iframe src={`${omnyFmUrl}/embed?style=Cover`}
                width="100%"
                height="170"
                scrolling="no"
                frameBorder="no"
                allow="autoplay" />
        }
        {
            whooshkaaId && <iframe width="100%"
                height="170"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://webplayer.whooshkaa.com/player/episode/id/${whooshkaaId}?theme=light&waveform-progress-color=%23FA6800&play-video-if-available=true`}
            />
        }
        {
            title && <Text as="small" display="block" mt={2}>{title}</Text>
        }
    </ContentBlock>;
};

export default AudioBlock;
