import ContentBlock from "~/components/blocks/Content";
import { ReactNode, useState } from 'react';
import { Text, AspectRatio } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IDatoVideo } from '~/interfaces';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface IVideoBlockProps {
    id?:string;
    __typename?:string;
    title?:string;
    video?:IDatoVideo;
    videoEmbed?:IDatoVideo;
}

const VideoBlock:Function = ({ title, video, videoEmbed }:IVideoBlockProps) : ReactNode => {
    const [currentVideo] = useState<IDatoVideo>(video ? video : videoEmbed);

    return <ContentBlock>
        {
            currentVideo && <AspectRatio ratio={[29 / 18, 21 / 10, ,21 / 9]}>
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={currentVideo.url} />
            </AspectRatio>
        }
        {
            title && <Text as="small">{title}</Text>
        }
    </ContentBlock>;
};

export default VideoBlock;
