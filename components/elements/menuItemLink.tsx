import { Link as ChakraLink } from '@chakra-ui/react';
import { resolveInternalLink } from '~/lib/utils';
import { ChakraProps } from '@chakra-ui/system';
import { ILink } from '~/interfaces/util/link';
import { forwardRef, ReactNode } from 'react';
import Link from 'next/link';

interface IMenuItemLink extends ChakraProps {
    title?:string;
    link?:ILink;
    children?:any;
    externalLink?:string;
}

export const MenuItemLink:any = forwardRef(({ title, link, externalLink,  ...props }:IMenuItemLink, ref:any) : ReactNode => {
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

    return <ChakraLink as={Link} href={href} {...props} ref={ref} onClick={(event) => {
        event.stopPropagation();
    }}>{newChild}</ChakraLink>;
});

MenuItemLink.displayName = 'MenuItemLink';
