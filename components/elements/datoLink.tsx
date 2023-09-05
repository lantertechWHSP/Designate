import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { forwardRef, ReactNode } from 'react';

interface IDatoLinkProps extends ChakraProps {
    id?:string;
    __typename?:string;
    title?:string;
    slug:string;
}

export const DatoLink = forwardRef(({ id, __typename, title, slug,  ...props }:IDatoLinkProps, ref) : ReactNode => {
    let href:string = resolveInternalLink({
        id,
        __typename,
        title,
        slug
    });

    let newChild = '';

    if(props.children) {
        newChild = props.children;
    }
    else {
        newChild = props.title;
    }

    return <ChakraLink href={href} {...props} ref={ref}>{newChild}</ChakraLink>
});

DatoLink.displayName = 'DatoLink';
