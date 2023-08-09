import ContentBlock from "~/components/blocks/ContentBlock";
import { ReactNode, useState } from 'react';
import { Box, AspectRatio, Text, Icon } from '@chakra-ui/react';
import { Image } from 'react-datocms';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoBlock = ({ title, video, videoEmbed, _coverImage }) : ReactNode => {
    return <ContentBlock>
        {
            (() => {
                if(video) {
                    return <LocalVideoBlock video={video} coverImage={_coverImage} />
                }
                else if(videoEmbed) {
                    return <EmbedVideoBlock videoEmbed={videoEmbed} />;
                }
            })()
        }
        {
            title && <Text as="small">{title}</Text>
        }
    </ContentBlock>;
};

const LocalVideoBlock = ({video, coverImage}) : ReactNode => {
    const [playing, setPlaying] = useState(false);
    const [coverVisible, setCoverVisible] = useState(true);

    return <Box pos="relative">
        <Box
            pos="absolute"
            w="100%"
            h="100%"
            zIndex="1"
            cursor="pointer"
            onClick={() => {
                setCoverVisible(false);
                setPlaying(true);
            }}>
            <AspectRatio ratio={[29 / 18, 21 / 10, 21 / 9]}>
                <Box>
                    {
                        coverImage && <Image
                        data={coverImage?.responsiveImage}
                        style={{ width: '100%' }}
                      />
                    }
                    <PlayButton />
                </Box>
            </AspectRatio>
        </Box>
        <AspectRatio ratio={[29 / 18, 21 / 10, ,21 / 9]}
                     visibility={coverVisible ? 'hidden' : 'visible'}>
            <ReactPlayer
                controls
                width="100%"
                height="100%"
                url={video.url}
                playing={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            />
        </AspectRatio>
    </Box>
}

const EmbedVideoBlock = ({videoEmbed}) : ReactNode => {
    return <AspectRatio ratio={[29 / 18, 21 / 10, ,21 / 9]}>
        <ReactPlayer
            controls
            width="100%"
            height="100%"
            url={videoEmbed.url}
        />
    </AspectRatio>
}

const PlayButton = () : ReactNode => {
    return <Box
        cursor="pointer"
        position="absolute"
        zIndex="10"
        background="whiteAlpha.100"
        borderRadius="full"
        lineHeight={0}
        p={8}
        backdropFilter="blur(8px)">
        <Icon
            as="svg"
            w="20px"
            h="20px"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.5.1a1 1 0 0 1 1 0l16 9a1 1 0 0 1 0 1.8l-16 9A1 1 0 0 1 0 19V1C0 .6.2.3.5.1ZM2 2.7v14.6L15 10 2 2.7Z"
                fill="currentColor"
            />
        </Icon>
    </Box>
}

export default VideoBlock;
