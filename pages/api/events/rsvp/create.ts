import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body = request.body;
    const ERROR_MESSAGE = 'Could not submit RSVP!';

    if(request.method === 'POST') {
        try {
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            const DATO_ITEM_TYPE_EVENT_RSVP_ID = process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID;

            await Promise.all(
                body.events.map(async (event: any) => {
                    const datoEventRSVP:any = await client.items.create({
                        item_type: { type: "item_type", id: DATO_ITEM_TYPE_EVENT_RSVP_ID },
                        name: body.name,
                        is_shareholder: body.isShareholder,
                        email: body.email,
                        event: event.id,
                        attending: event.attending
                    });

                    const retreiveEvent:any = await client.items.find(event.id);
                    const newRSVP:string[] = retreiveEvent.rsvp;
                    newRSVP.push(datoEventRSVP.id);

                    await client.items.update(event.id, {
                        rsvp: newRSVP
                    });
                })
            ).catch(() => {
                return response.status(500).json({
                    message: ERROR_MESSAGE,
                });
            });

            return response.status(200).json({
                message: 'Great Success!',
            });
        }
        catch {
            return response.status(500).json({
                message: ERROR_MESSAGE,
            });
        }
    }
    else {
        return response.status(500).json({
            message: ERROR_MESSAGE,
        });
    }
}