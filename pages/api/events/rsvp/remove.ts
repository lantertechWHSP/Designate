import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body = request.body;
    const ERROR_MESSAGE = 'Could not remove RSVP.';

    if(request.method === 'POST') {
        try {
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            await client.items.destroy(body.id);

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
};