import React  from 'react';
import { StructuredText } from 'react-datocms';
import Link  from 'next/link';
import { isHeading, isCode } from 'datocms-structured-text-utils';
import { renderNodeRule } from 'datocms-structured-text-to-html-string';
import { Heading, Code } from '@chakra-ui/react';
import Image from '~/components/blocks/Image';
import Video from "~/components/blocks/Video";

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
                switch (record.__typename) {
                    case 'ImageRecord':
                        return <Image {...record} />;
                    case 'VideoRecord':
                        return <Video {...record} />;
                    default:
                        return null;
                }
                return null;
            }}
        />
    );
};

export default StrucutredContent;
