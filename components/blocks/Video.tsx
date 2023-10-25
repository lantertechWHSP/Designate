import { ReactNode, useState} from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import { AspectRatio, Text, Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IVideo } from '~/interfaces/util/video';


const ReactPlayer:any = dynamic(() => import("react-player"), { ssr: false });

interface IVideoBlock extends IBlock {
    title?:string;
    video?:IVideo;
    videoEmbed?:IVideo;
}

const VideoBlock:any = ({ title, video, videoEmbed, containerWidth, paddingTop, paddingBottom }:IVideoBlock) : ReactNode => {
    const [currentVideo] = useState<IVideo>(video ? video : videoEmbed);

    return (title || currentVideo) && <ContentBlock background="black3" containerWidth={containerWidth} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Box>
            {
                currentVideo && <AspectRatio ratio={[16 / 7.5]}>
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
        </Box>
    </ContentBlock>;
};

export default VideoBlock;
