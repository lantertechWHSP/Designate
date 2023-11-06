import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';

interface IAudioBlock extends IBlock {
    soundcloudTrackId?:string;
    omnyFMUrl?:string;
}

const AudioBlock:any = ({ soundcloudTrackId, omnyFmUrl, contain }:IAudioBlock) : ReactNode => {
    if(omnyFmUrl) {
        omnyFmUrl = omnyFmUrl.endsWith('/') ?  omnyFmUrl.slice(0, -1) : omnyFmUrl;
    }

    console.log(soundcloudTrackId);

    return <ContentBlock contain={contain}>
        {
            soundcloudTrackId && <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudTrackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
        }
        {
            (omnyFmUrl) && <iframe src={`${omnyFmUrl}/embed?style=Cover`}
                        width="100%"
                        height="150px"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay; clipboard-write"
                        frameborder="0" />
        }

    </ContentBlock>;
};

export default AudioBlock;
