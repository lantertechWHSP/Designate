import { NextApiRequest, NextApiResponse } from 'next';
import { buildClient } from "@datocms/cma-client-node";
import * as yup from "yup";
import { isNil as _isNil } from 'lodash';

// const validateCaptcha:any = (response_key:string)  =>  {
//     return new Promise((resolve, _reject) => {
//         const secret_key = process.env.RECAPTCHA_SECRET;
//
//         const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
//
//         fetch(url, {
//             method: 'post'
//         })
//             .then((response) => response.json())
//             .then((google_response) => {
//                 if (google_response.success == true) {
//                     resolve(true);
//                 } else {
//                     resolve(false);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 resolve(false);
//             });
//     });
// };

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body = request.body;
    const ERROR_MESSAGE = 'Could not submit RSVP!';

    const isValid:any = async (rsvp) : Promise<any> => {
        const REGEXP = {
            NAME: /^[a-zÀ-ÿ\d'’\s-]+$/i,
        };

        const buildSchema = {
            name: yup.string().required('Please enter your Name.').matches(REGEXP.NAME, 'Please enter a valid Name.'),
            email: yup.string().required('Please enter an Email Address.').email('Please enter a valid Email Address.'),
            isShareholder: yup.boolean()
                .required("Please identify if you are a shareholder.")
                .oneOf([true, false]),
            eventBundleId: yup.string().required(),
            events: yup.array().of(yup.object({
                id: yup.string().required(),
                attending: yup.boolean()
            })),
        };

        const schema:any = yup.object(buildSchema);

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

        // Honeypot
        if(!_isNil(body.phone)) {
            return response.status(500).json({
                success: false,
                message: ERROR_MESSAGE,
            });
        }

        // Validate recaptcha
        // if(!await validateCaptcha(body.recaptcha)) {
        //     return response.status(500).json({
        //         success: false,
        //         message: 'Invalid Recaptcha',
        //     });
        // }

        try {
            const client = buildClient({
                apiToken: process.env.NEXT_PUBLIC_DATO_KEY,
                environment: process.env.NEXT_PUBLIC_DATO_ENVIRONMENT
            });

            const DATO_ITEM_TYPE_EVENT_RSVP_ID = process.env.NEXT_PUBLIC_DATO_ITEM_TYPE_EVENT_RSVP_ID;

            // // Create the Event RSVP
            const newRSVP = await client.items.create({
                item_type: { type: "item_type", id: DATO_ITEM_TYPE_EVENT_RSVP_ID },
                name: body.name,
                is_shareholder: body.isShareholder,
                email: body.email,
                event_bundle: body.eventBundleId,
                events_attending: body.events.filter((event) => {
                    return event.attending;
                }).map((event) => {
                    return event.id;
                })
            });

            const event:any = await client.items.find(body.eventBundleId);

            await client.items.update(body.eventBundleId, {
                rsvp: [...event['rsvp'], newRSVP.id]
            });

            return response.status(200).json({
                success: true,
                message: 'RSVP Sent.',
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