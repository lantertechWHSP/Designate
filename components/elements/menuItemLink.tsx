import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { IDatoLink } from '~/interfaces';
import { forwardRef, ReactNode } from 'react';

interface IMenuItemLinkProps extends ChakraProps {
    title?:string;
    link?:IDatoLink;
    externalLink?:string;
}

export const MenuItemLink = forwardRef(({ title, link, externalLink,  ...props }:IMenuItemLinkProps, ref) : ReactNode => {
    let href:string = '#';
    let newChild:string = '';

    // Use internal link
    if(link) {
        href = resolveInternalLink(link);
    }
    // Use external link
    else if(externalLink) {
        href = externalLink;
    }

    // If there is children
    if(props.children) {
        newChild = props.children;
    }
    // Use internal link title
    else if(link && link.title) {
        newChild = link.title;
    }
    // Use title
    else if(title) {
        newChild = title;
    }

    return <ChakraLink href={href} {...props} ref={ref}>{newChild}</ChakraLink>
});

MenuItemLink.displayName = 'MenuItemLink';
