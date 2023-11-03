import React, { ReactNode }  from 'react';
import { StructuredText } from 'react-datocms';
import { Link } from '~/components/elements/link';
import { isHeading, isParagraph, isCode, isListItem } from 'datocms-structured-text-utils';
import { renderNodeRule } from 'datocms-structured-text-to-html-string';
import { Heading, Code, Box, Text, Flex } from '@chakra-ui/react';
import ImageBlock from '~/components/blocks/Image';
import VideoBlock from '~/components/blocks/Video';
import AudioBlock from '~/components/blocks/Audio';
import { ListTick } from '~/components/elements/svgs/ListTick';

const StrucutredContent:any = ({ content }) : ReactNode => {
    return (
        <Box sx={{
            '*:last-child': {
                marginBottom: 0
            },
            a: {
                borderBottom: '1px solid'
            }
        }}>
            <StructuredText
                data={content}
                renderLinkToRecord={({ record, children, transformedMeta }:{
                    record:any,
                    children:any,
                    transformedMeta:any
                }) => {
                    const props = {
                        ...transformedMeta,
                        ...record
                    }

                    return <Link {...props}>
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
                        </Text>;
                    }),
                    renderNodeRule(isCode, ({ node, key }:{
                        node:any,
                        key:any
                    }) => {
                        return <Code key={key}>
                            {node.code}
                        </Code>;
                    }),
                    renderNodeRule(isListItem, ({ node, children, key }) => {
                        const isTickListItem:any = (child) => {

                            if(child.type === 'paragraph' || child.type === 'span') {
                                if(Array.isArray(child.marks) && child.marks.length > 0) {
                                    const tickedNode:any = child.marks.find((element) => {
                                        return element === 'ticked-list-item';
                                    });

                                    return tickedNode;
                                }

                                if(Array.isArray(child.children)) {
                                    return child.children.find((innerChild) => {
                                        return isTickListItem(innerChild);
                                    });
                                }
                            }
                            return null;
                        };

                        const tickedNode:any = isTickListItem(node.children[0]);

                        return tickedNode ? <Flex as="li"
                            direction="row"
                            listStyleType="none"
                            ml={-4}
                            mb={2}
                            p={0}
                            key={key}>
                            <Box minWidth="24px" minHeight="24px" mr={3}>
                                <ListTick />
                            </Box>
                            <Box position="relative" top="-1px">
                                {children}
                            </Box>
                        </Flex> : <Box as="li" key={key}>
                            {children}
                        </Box>;
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
