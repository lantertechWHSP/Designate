import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { Text } from '@chakra-ui/react';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';

interface IAudioBlock extends IBlock {
    title?:string;
    soundcloudTrackId?:string;
    whooshkaaId?:string;
    megaphoneId?:string;
    omnyFmUrl?:string;
}

const AudioBlock:any = ({ title, soundcloudTrackId, omnyFmUrl, whooshkaaId, megaphoneId, contain, background, paddingTop, paddingBottom, containerWidth }:IAudioBlock) : ReactNode => {
    if(omnyFmUrl) {
        omnyFmUrl = omnyFmUrl.endsWith('/') ?  omnyFmUrl.slice(0, -1) : omnyFmUrl;
    }

    return (title || soundcloudTrackId || omnyFmUrl || whooshkaaId || megaphoneId) &&  <ContentBlock contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
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
            megaphoneId && <iframe width="100%"
                height="170"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://playlist.megaphone.fm/?e=${megaphoneId}`} />
        }
        {
            title && <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.NineTwelfths]}>
                    <Text as="small" display="block" variant="caption" mt={2}>{title}</Text>
                </Column>
            </Row>
        }
    </ContentBlock>;
};

export default AudioBlock;
