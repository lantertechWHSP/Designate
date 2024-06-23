import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from '@datocms/cma-client-node';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body = request.body;
    const ERROR_MESSAGE = 'Could not update event RSVP.';

    if(request.method === 'POST') {
        try {
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            console.log(body);
            console.log(body.rsvp);

            const event = await client.items.update(body.id, {
                rsvp: body.rsvp
            });

            console.log(event);

            return response.status(200).json({
                success: true,
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