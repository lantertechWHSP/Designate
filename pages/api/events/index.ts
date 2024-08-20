import { NextApiRequest, NextApiResponse } from 'next';
import { doQuery, queries } from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body: any = request.body;
    const ERROR_MESSAGE: string = 'Could not get Events';

    if (request.method === 'POST') {
        try {
            const events = await doQuery(queries.events, {
                in: body.in
            });

            return response.status(200).json({
                success: true,
                data: {
                    ...events
                }
            });
        }
        catch {
            return response.status(500).json({
                success: false,
                message: ERROR_MESSAGE,
            });
        }
    }
    else {
        return response.status(500).json({
            success: false,
            message: ERROR_MESSAGE,
        });
    }
}