import { ReactNode, useState} from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import { AspectRatio as AspectRatioBlock, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IVideo } from '~/interfaces/util/video';
import {Column, ColumnWidth, Row} from "~/components/elements/grid/grid";

const ReactPlayer:any = dynamic(() => import("react-player"), { ssr: false });

enum AspectRatio {
    Default = 'Default',
    Long = 'Long'
}

interface IVideoBlock extends IBlock {
    title?:string;
    aspectRatio?:AspectRatio;
    videoEmbed?:IVideo;
}

const VideoBlock:any = ({ title, videoEmbed, aspectRatio, contain, containerWidth, background, paddingTop, paddingBottom }:IVideoBlock) : ReactNode => {
    const [currentVideo] = useState<IVideo>(videoEmbed);

    return (title || currentVideo) && <ContentBlock contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            currentVideo && <AspectRatioBlock ratio={aspectRatio === AspectRatio.Long ? [16 / 7.5] : [16 / 9]}>
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={currentVideo.url} />
            </AspectRatioBlock>
        }
        {
            title && <Row>
                <Column width={[ColumnWidth.Full, , ColumnWidth.NineTwelfths, ColumnWidth.EightTwelfths]}>
                    <Text as="small" display="block" variant="annotation" mt={2}>{title}</Text>
                </Column>
            </Row>
        }
    </ContentBlock>;
};

export default VideoBlock;
