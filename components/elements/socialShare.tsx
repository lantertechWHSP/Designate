import { useRouter } from 'next/router';
import { Heading, Box, Flex } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

const THREADS_HANDLE:string = 'whsp';

const SocialShare:any = () => {
    const router:any = useRouter();
    const link:string = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

    return (
        <Box>
            <Heading py={2}>Share</Heading>
            <Box borderTop="1px solid" borderColor="borderColor" py={4}>
                <Flex mx={-2}>
                    <ShareLink href={links.twitter(link)} color="charcoal">
                        <Icon icon={Icons.X} />
                    </ShareLink>
                    <ShareLink href={links.threads()} color="charcoal">
                        <Icon icon={Icons.Threads} />
                    </ShareLink>
                    <ShareLink href={links.linkedin(link)} color="charcoal">
                        <Icon icon={Icons.Linkedin} />
                    </ShareLink>
                </Flex>
            </Box>
        </Box>
    );
};

const ShareLink:any = (props) => <Box p={2} as="a" {...props} target="_blank" />;

const links:any = {
    linkedin: (link:string = '') => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    twitter: (link:string = '') => `https://twitter.com/intent/tweet/?url=${encodeURIComponent(link)}`,
    threads: () => `https://www.threads.net/@${THREADS_HANDLE}/`,
};


export default SocialShare;
