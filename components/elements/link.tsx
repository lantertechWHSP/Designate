import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { forwardRef, ReactNode } from 'react';
const NextLink:any = require('next/link');

export interface IDatoLink extends ChakraProps {
    id?:string;
    __typename?:string;
    title?:string;
    children?:any;
    slug:string;
}

export const Link:any = forwardRef(({ id, __typename, title, slug, document, ...props }:IDatoLink, ref:any) : ReactNode => {
    if(document) {
        debugger;
    }

    const href:string = resolveInternalLink({
        id,
        __typename,
        title,
        slug,
        document,
    });

    let newChild:string|null = null;

    if(props.children) {
        newChild = props.children;
    }
    else if(title) {
        newChild = title;
    }

    return <ChakraLink as={NextLink} href={href} {...props} ref={ref}>
        {newChild}
    </ChakraLink>;
});

Link.displayName = 'Link';
