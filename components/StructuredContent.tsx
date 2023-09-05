import React  from 'react';
import { StructuredText } from 'react-datocms';
import Link  from 'next/link';
import { isHeading, isCode } from 'datocms-structured-text-utils';
import { renderNodeRule } from 'datocms-structured-text-to-html-string';
import { Heading, Code } from '@chakra-ui/react';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from "~/components/blocks/Video";
import AudioBlock from "~/components/blocks/Audio";

const StrucutredContent = ({ content }) : any => {
    return (
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

                    // @ts-ignore
                    return <Heading as={tag} variant={tag} key={key}>
                        {children}
                    </Heading>;
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
                        return <ImageBlock {...record} />;
                    case 'VideoRecord':
                        return <VideoBlock {...record} />;
                    case 'AudioRecord':
                        return <AudioBlock {...record} />;
                    default:
                        return <></>;
                }
                return <></>;
                /* eslint-enable */
            }}
        />
    );
};

export default StrucutredContent;
