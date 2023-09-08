import React, { ReactNode }  from 'react';
import { StructuredText } from 'react-datocms';
import Link  from 'next/link';
import { isHeading, isParagraph, isCode } from 'datocms-structured-text-utils';
import { renderNodeRule } from 'datocms-structured-text-to-html-string';
import { Heading, Code, Box, Text } from '@chakra-ui/react';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from "~/components/blocks/Video";
import AudioBlock from "~/components/blocks/Audio";

const StrucutredContent:any = ({ content }) : ReactNode => {
    return (
        <Box sx={{
            '*:last-child': {
                marginBottom: 0
            },
            'p:last-child': {
                marginBottom: 0
            }
        }}>
            <StructuredText
                data={content}
                renderLinkToRecord={({ record, children, transformedMeta }:{
                    record:any,
                    children:any,
                    transformedMeta:any
                }) => {
                    return <Link {...transformedMeta} href={record}>
                        {children}
                    </Link>;
                }}
                customNodeRules={[
                    renderNodeRule(isHeading, ({ node, children, key }:{
                        node:any,
                        children:any,
                        key:any
                    }) => {
                        const tag:any = `h${node.level}`;

                        return <Heading as={tag} variant={tag} key={key} mb={4}>
                            {children}
                        </Heading>;
                    }),
                    renderNodeRule(isParagraph, ({ children, key }:{
                        children:any,
                        key:any
                    }) => {
                        return <Text as="p" key={key}>
                            {children}
                        </Text>
                    }),
                    renderNodeRule(isCode, ({ node, key }:{
                        node:any,
                        key:any
                    }) => {
                        return <Code key={key}>
                            {node.code}
                        </Code>;
                    })
                ]}
                renderBlock={({record}) => {
                    /* eslint-disable */
                    switch (record.__typename) {
                        case 'ImageRecord':
                            return <ImageBlock contain={false} {...record} />;
                        case 'VideoRecord':
                            return <VideoBlock contain={false} {...record} />;
                        case 'AudioRecord':
                            return <AudioBlock contain={false} {...record} />;
                        default:
                            return <></>;
                    }
                    return <></>;
                    /* eslint-enable */
                }}
            />
        </Box>
    );
};

export default StrucutredContent;
