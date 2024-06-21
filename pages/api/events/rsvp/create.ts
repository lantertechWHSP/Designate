import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";
import * as yup from "yup";
import { ObjectSchema } from 'yup';

const validateCaptcha = (response_key) => {
    return new Promise((resolve, reject) => {
        const secret_key = process.env.RECAPTCHA_SECRET;

        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

        fetch(url, {
            method: 'post'
        })
            .then((response) => response.json())
            .then((google_response) => {
                if (google_response.success == true) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(false);
            });
    });
};

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
            eventId: yup.string().required(),
            eventDates: yup.array().of(yup.object({
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

        // Validate recaptcha
        if(!await validateCaptcha(body.recaptcha)) {
            return response.status(500).json({
                success: false,
                message: 'Invalid Recaptcha',
            });
        }

        try {
            console.log('1');
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            const DATO_ITEM_TYPE_EVENT_RSVP_ID = process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID;
            const DATO_ITEM_TYPE_EVENT_DATE_RSVP_ID = process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_DATE_ID;

            const eventDateRSVPItems = [];

            await Promise.all(
                body.eventDates.map(async (eventDate: any) => {
                    const eventDateRSVP = await client.items.create({
                        item_type: { type: "item_type", id: DATO_ITEM_TYPE_EVENT_DATE_RSVP_ID },
                        attending: eventDate.attending,
                        event_date: eventDate.id
                    });

                    eventDateRSVPItems.push(eventDateRSVP);
                })
            ).then(() => {
                const newRSVP = client.items.create({
                    item_type: {type: "item_type", id: DATO_ITEM_TYPE_EVENT_RSVP_ID},
                    name: body.name,
                    is_shareholder: body.isShareholder,
                    email: body.email,
                    event_date_rsvps: eventDateRSVPItems.map((eventDateRSVP: any) => {
                        return eventDateRSVP.id;
                    })
                });

                // Place the EventRSVP to the Event item type
                client.items.update(body.eventId, {
                    rsvp: newRSVP
                });
            }).catch(() => {
                return response.status(500).json({
                    success: false,
                    message: ERROR_MESSAGE,
                });
            });

            return response.status(200).json({
                success: true,
                message: 'RSVP Sent.',
            });
        }
        catch {
            console.log('5');

            return response.status(500).json({
                success: false,
                message: ERROR_MESSAGE,
            });
        }
    }
    else {
        console.log('6');

        return response.status(500).json({
            success: false,
            message: ERROR_MESSAGE,
        });
    }
}