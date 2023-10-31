export default async function preview(req, res) {
  const { secret, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.DATOCMS_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});


  function trimSlash(str) {
    str = str.startsWith('/') ? str.substr(1) : str;
    return str;
  }

  const trimmedSlug = trimSlash(slug);

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${trimmedSlug}` });
  res.end();
}
