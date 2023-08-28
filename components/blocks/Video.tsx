import ContentBlock from "~/components/blocks/Content";
import { ReactNode, useState } from 'react';
import { Text, AspectRatio } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface IVideoBlock {
    __typename?:string;
    id?:string;
    title?:string;
    video?:any;
    videoEmbed?:any;
    _coverImage?:any;
}

const VideoBlock = ({ title, video, videoEmbed, _coverImage }:IVideoBlock) : ReactNode => {
    const [currentVideo] = useState(video ? video : videoEmbed);

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
