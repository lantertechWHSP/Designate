import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { forwardRef, ReactNode } from 'react';
import { ILink } from '~/interfaces/util/link';
const NextLink:any = require('next/link');

export interface IDatoLink extends ILink, ChakraProps {
    children?:any;
}

export const Link:any = forwardRef(({ id, __typename, title, slug, document, ...props }:IDatoLink, ref:any) : ReactNode => {
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
