import React  from 'react';
import { StructuredText } from 'react-datocms';
import Link  from 'next/link';
import { isHeading, isCode } from 'datocms-structured-text-utils';
import { renderNodeRule } from 'datocms-structured-text-to-html-string';
import { Heading, Code } from '@chakra-ui/react';

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
                renderNodeRule(isHeading, ({ node, children, key }) => {
                    const tag = `h${node.level}`;

                    return (
                        <>
                            <Heading as={tag} variant={tag} key={key}>
                                {children}
                            </Heading>
                        </>
                    );
                }),
                renderNodeRule(isCode, ({ node, _children, key }) => {
                    return <Code children={node.code} key={key} />
                })
            ]}
        />
    );
};

export default StrucutredContent;
