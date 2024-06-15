import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    if(request.method === 'POST') {
        const client = buildClient({
            apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
            environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
        });

        const EventRSVP = 'SrhyDCe3Q8-rcL_QxytH4A';
        const body = request.body;

        console.log(body);

        try {
            body.events.map(async (event: any) => {
                await client.items.create({
                    item_type: { type: "item_type", id: EventRSVP },
                    name: body.name,
                    is_shareholder: body.isShareholder,
                    email: body.email,
                    event: event.id,
                    attending: event.attending
                });
            });

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
    else {
        return response.status(500).json({
            message: 'Could not handle request.',
        });
    }
}