import ContentBlock from "~/components/blocks/Content";
import { ReactNode, useState} from 'react';
import { AspectRatio, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IVideo } from '~/interfaces/util/video';
import { Row, Column, ColumnValues }  from '~/components/elements/grid/grid';

const ReactPlayer:any = dynamic(() => import("react-player"), { ssr: false });

interface IVideoBlock {
    id?:string;
    __typename?:string;
    title?:string;
    video?:IVideo;
    videoEmbed?:IVideo;
}

const VideoBlock:any = ({ title, video, videoEmbed, ...props }:IVideoBlock) : ReactNode => {
    const [currentVideo] = useState<IVideo>(video ? video : videoEmbed);

    return <ContentBlock {...props} mb={8}>
        <Row justify={['center']}>
            <Column width={[ColumnValues.Full, ,ColumnValues.TenTwelfths]}>
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
            </Column>
        </Row>
    </ContentBlock>;
};

export default VideoBlock;
