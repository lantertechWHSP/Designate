export default async function exit(req, res) {
    const { redirect = '' } = req.query;

    // Exit the current user from "Preview Mode". This function accepts no args.
    res.clearPreviewData();

    // Redirect the user back to the page
    res.writeHead(307, { Location: `/${redirect}` });
    res.end();
}
