import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    if(request.method === 'GET') {
        try {
            return response.status(200).json({
                message: 'Great Success!',
            });
        }
        catch {
            return response.status(500).json({
                message: 'Could not submit RSVP!',
            });
        }
    }
}