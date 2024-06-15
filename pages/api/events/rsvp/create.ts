import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";
import * as yup from "yup";
import { ObjectSchema } from 'yup';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body = request.body;
    const ERROR_MESSAGE = 'Could not submit RSVP!';

    const isValid:any = async (rsvp) : Promise<any> => {
        const REGEXP = {
            NAME: /^[a-zÀ-ÿ\d'’\s-]+$/i,
        };

        const schema:ObjectSchema<any> = yup.object({
            name: yup.string().required('Please enter your Name').matches(REGEXP.NAME, 'Please enter a valid First Name'),
            isShareholder: yup.boolean(),
            events: yup.array().of(yup.object({
                id: yup.string().required(),
                attending: yup.boolean()
            })),
            email: yup.string().required('Please enter an Email Address').email('Please enter a valid Email Address')
        });

        return schema.isValid(rsvp);
    };

    if(request.method === 'POST') {
        // Validate request body
        if(!await isValid(body)) {
            return response.status(500).json({
                success: false,
                message: ERROR_MESSAGE,
            });
        }

        try {
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            const DATO_ITEM_TYPE_EVENT_RSVP_ID = process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID;

            await Promise.all(
                body.events.map(async (event: any) => {
                    // Create the Event RSVP item type
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

                    // Place the EventRSVP to the Event item type
                    await client.items.update(event.id, {
                        rsvp: newRSVP
                    });
                })
            ).catch(() => {
                return response.status(500).json({
                    success: false,
                    message: ERROR_MESSAGE,
                });
            });

            return response.status(200).json({
                success: true,
                message: 'Great Success!',
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