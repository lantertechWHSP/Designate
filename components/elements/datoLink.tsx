import { forwardRef } from 'react';
import { Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { resolveInternalLink } from '~/lib/utils';

export const DatoLink = forwardRef(({ title, link, externalLink, ...props }:any, ref) : ReactNode => {
    let href:string = '#';
    let children = '';
    let target:string = '';

    // Link object
    if(link) {
        href = resolveInternalLink(link);
    }
    // External link (Text field if “link” object is empty)
    else if(externalLink) {
        href = externalLink;
        target = '_blank';
    }

    if(link && link.title) {
        children = link.title;
    }
    else if(title) {
        children = title;
    }

    return (
        <Link href={href} {...props} target={target} ref={ref}>{children}</Link>
    );
});

DatoLink.displayName = 'DatoLink';
