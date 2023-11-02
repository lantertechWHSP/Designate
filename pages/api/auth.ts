import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) : void {
    // Bypass Preview
    if(!req.nextUrl.pathname.startsWith('/api/preview')) {
        res.setHeader('WWW-authenticate', 'Basic realm="Secure Area"');
        res.statusCode = 401;
        res.end(`Auth Required.`);
    }
}
