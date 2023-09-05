import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { forwardRef, ReactNode } from 'react';

interface IDatoLinkProps extends ChakraProps {
    id?:string;
    __typename?:string;
    title?:string;
    children?:any;
    slug:string;
}

export const DatoLink:any = forwardRef(({ id, __typename, title, slug,  ...props }:IDatoLinkProps, ref:any) : ReactNode => {
    const href:string = resolveInternalLink({
        id,
        __typename,
        title,
        slug
    });

    let newChild:string|null = null;

    if(props.children) {
        newChild = props.children;
    }
    else if(title) {
        newChild = title;
    }

    return <ChakraLink href={href} {...props} ref={ref}>{newChild}</ChakraLink>;
});

DatoLink.displayName = 'DatoLink';
