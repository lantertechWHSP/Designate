// Put this code in the /pages/api directory of your Next.js website:
// (ie. /pages/api/preview-links.js)
// this function knows how to convert a DatoCMS record
// into a canonical URL within the website
const generatePreviewUrl = ({ item, itemType, locale }) => {
    // switch (itemType.attributes.api_key) {
    //     // case 'landing_page':
    //     //     return `/landing-pages/${item.attributes.slug}`;
    //     // case 'post':
    //     //     // blog posts are localized:
    //     //     const localePrefix = locale === 'en' ? '' : `/${locale}`;
    //     //     return `${localePrefix}/blog/${item.attributes.slug[locale]}`;
    //     // default:
    //     //     return null;
    //
    //     return `${item.attributes.slug}`;
    // }
    return null; //`${item.attributes.slug}`;

};
const handler = (req, res) => {
    // setup CORS permissions
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // add any other headers you need
    res.setHeader('Content-Type', 'application/json');
    // This will allow OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    const url = generatePreviewUrl(req.body);
    if (!url) {
        return res.status(200).json({ previewLinks: [] });
    }
    const baseUrl = process.env.VERCEL_URL
        // Vercel auto-populates this environment variable
        ? `https://${process.env.VERCEL_URL}`
        // Netlify auto-populates this environment variable
        : process.env.NEXT_PUBLIC_SITE_URL;
    const previewLinks = [
        // Public URL:
        {
            label: 'Published version',
            url: `${baseUrl}${url}`,
        },
        // This requires an API route on your project that starts Next.js Preview Mode
        // and redirects to the URL provided with the `redirect` parameter:
        {
            label: 'Draft version',
            url: `${baseUrl}/api/start-preview-mode?redirect=${url}&secret=${process.env.DATOCMS_PREVIEW_SECRET}`,
        },
    ];
    return res.status(200).json({ previewLinks });
};
export default handler;
