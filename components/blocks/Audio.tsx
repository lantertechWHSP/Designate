import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';

interface IAudioBlock extends IBlock, ChakraProps {
    trackId?:string;
}

const AudioBlock:any = ({ trackId }:IAudioBlock) : ReactNode => {
    return <ContentBlock>
        {
            trackId && <iframe width="100%"
                height="150px"
                scrolling="no"
                frameBorder="no"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}>
            </iframe>
        }
    </ContentBlock>;
};

export default AudioBlock;
