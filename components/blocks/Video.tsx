import ContentBlock from "~/components/blocks/ContentBlock";
import { ReactNode, useState } from 'react';
import { Image as DatoImage } from 'react-datocms';
import { Box } from '@chakra-ui/react';

const VideoBlock = ({ title, video, videoEmbed, coverImage }) : ReactNode => {
    const [playing, setPlaying] = useState(false);
    const [coverVisible, setCoverVisible] = useState(true);

    const [currentVideo] = useState(video ? video : videoEmbed);

    return <ContentBlock>
        <Box pos="relative">
            {coverImage && coverVisible && (
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
                            <Image
                                data={coverImage?.responsiveImage}
                                style={{ width: '100%' }}
                            />
                            <PlayButton />
                        </Box>
                    </AspectRatio>
                </Box>
            )}
            <AspectRatio ratio={[29 / 18, 21 / 10, ,21 / 9]}
                         visibility={coverVisible ? 'hidden' : 'visible'}>
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={currentVideo.url}
                    playing={playing}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                />
            </AspectRatio>
        </Box>
        {
            title && <Text as="small" variant="caption" color="grey1" mt={4} d="inline-block">{title}</Text>
        }
    </ContentBlock>;
};

export default VideoBlock;
