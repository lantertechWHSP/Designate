
const generatePreviewUrl = ({ item, itemType }) => {
    return item.attributes.slug;

    switch (itemType.attributes.api_key) {
        case 'page': return item.attributes.slug;
        case 'post': return `/news/${item.attributes.slug}`;
        default: return null;
    }

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

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL;
    const previewLinks = [
        {
            label: 'Published version',
            url: `${baseUrl}/${url}`,
        },
        {
            label: 'Draft version',
            url: `${baseUrl}/api/start-preview?redirect=${url}&secret=${process.env.DATOCMS_PREVIEW_SECRET}`,
        },
    ];
    return res.status(200).json({ previewLinks });
};
export default handler;
