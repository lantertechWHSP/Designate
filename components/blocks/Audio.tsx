import { ReactNode } from 'react';

const AudioBlock = ({ trackId }:any) : ReactNode => {
    return <>
        {
            trackId && <iframe width="100%"
                height="150px"
                scrolling="no"
                frameBorder="no"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}>
            </iframe>
        }
    </>;
};

export default AudioBlock;
