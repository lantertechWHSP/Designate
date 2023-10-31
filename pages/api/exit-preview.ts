export default async function exit(req, res) {
  if (req.method === 'POST') {
    res.clearPreviewData();

    res.status(200);
  }

  res.status(400);
}
