import { forwardRef } from 'react';
import { Link } from '@chakra-ui/react';

/**
 * Link object from Dato
 * @param link
 */
const resolveInternalLink = (link) => {
    if (!link) {
        return null;
    }

    const { slug, __typename } = link;

    switch (__typename) {
        case 'PostRecord':
            return `/news/${slug}`;
    }

    return `/${slug}`;
};

export const DatoLink = forwardRef(({ title, link, externalLink, ...props }, ref) => {
    let href:string = '#';
    let children:string = '';
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
