import { ReactNode, useState} from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from "~/components/blocks/Content";
import { AspectRatio as AspectRatioBlock, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IVideo } from '~/interfaces/util/video';
import { Column, ColumnWidth, Row } from '~/components/elements/grid/grid';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

const ReactPlayer:any = dynamic(() => import("react-player"), { ssr: false });

enum AspectRatio {
    Default = 'Default',
    Long = 'Long'
}

interface IVideoBlock extends IBlock {
    title?:string;
    aspectRatio?:AspectRatio;
    video?:IVideo;
    videoEmbed?:IVideo;
}

const VideoBlock:any = ({ title, video, videoEmbed, aspectRatio, contain, containerWidth, background, paddingTop, paddingBottom }:IVideoBlock) : ReactNode => {
    const [currentVideo] = useState<IVideo>(video ? video : videoEmbed);

    return (title || currentVideo) && <ContentBlock className="VideoBlock" contain={contain} containerWidth={containerWidth} background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            currentVideo && <AnimateOpacity>
                <AspectRatioBlock ratio={aspectRatio === AspectRatio.Long ? [16 / 7.5] : [16 / 9]}>
                    <ReactPlayer
                        controls
                        width="100%"
                        height="100%"
                        url={currentVideo.url} />
                </AspectRatioBlock>
            </AnimateOpacity>
        }
        {
            title && <Row>
                <Column width={[ColumnWidth.Full, ,ColumnWidth.TenTwelfths, ColumnWidth.NineTwelfths]}>
                    <AnimateOverflow>
                        <Text as="small" display="block" variant="caption" mt={2}>
                            {title}
                        </Text>
                    </AnimateOverflow>
                </Column>
            </Row>
        }
    </ContentBlock>;
};

export default VideoBlock;
