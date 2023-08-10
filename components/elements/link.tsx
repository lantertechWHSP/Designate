import { forwardRef } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { resolveInternalLink } from '~/lib/utils';

/**
 * Wrapper for the Chakra link that integrates adding a dato link object
 */
export const Link = forwardRef(({ link, ...props }:any, ref) : ReactNode => {
    let href:string = '#';
    let newChild = '';
    let target:string = '';

    if(link?.link) {
        href = resolveInternalLink(link.link);
    }
    else if(link?.externalLink) {
        href = link.externalLink;

        if(!props.target) {
            target = '_blank';
        }
    }

    if(props.children) {
        newChild = props.children;
    }
    else if(link && link.link && link.link.title) {
        newChild = link.link.title;
    }
    else if(link.externalLink && link.title) {
        newChild =  link.title;
    }

    return (
        <ChakraLink href={href} target={target} {...props} ref={ref}>{newChild}</ChakraLink>
    );
});

Link.displayName = 'DatoLink';
