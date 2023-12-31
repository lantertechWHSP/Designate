export default async function startPreview(req, res) : Promise<void> {
    const { secret, redirect } = req.query;

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (secret !== process.env.NEXT_PUBLIC_DATO_PREVIEW_SECRET || !redirect) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});
    res.writeHead(307, { Location: `/${redirect}` });
    res.end();
}
