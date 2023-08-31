import { NextApiRequest, NextApiResponse } from 'next';
const mailchimp = require('@mailchimp/mailchimp_marketing');
import '@mailchimp/mailchimp_marketing';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const validate = (email :string) : any => {
        const yupObject:any = {
            email: yup.string().required().email(),
            name: yup.string().required()
        }

        // @ts-ignore
        const schema:ObjectSchema<any> = yup.object(yupObject);

        return schema.validate({ email: email });
    }

    // const validateCaptcha = (recaptcha_key) => {
    //     const secret_key = process.env.RECAPTCHA_SECRET;
    //
    //     return new Promise((resolve, _reject) => {
    //         const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${recaptcha_key}`;
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
    // }

    if(request.method === 'POST') {
        const { email } = request.body;

        // Recaptcha
        // if (!(await validateCaptcha(recaptcha))) {
        //     response.status(400).send({
        //         message: 'Could not subscribe…',
        //     });
        // }

        try {
            // Validate Email
            validate(email);

            // mailchimp.setConfig({
            //     apiKey: process.env.MAILCHIMP_API_KEY!,
            //     server: process.env.MAILCHIMP_SERVER!,
            // });
            //
            // // Add member
            // await mailchimp.lists.setListMember(process.env.MAILCHIMP_AUDIENCE_ID!, email, {
            //     email_address: email,
            //     status: 'subscribed'
            // });

            return response.status(200).json({
                success: true,
                message: `Subscribed ${email} to mailing list.`
            });
        }
        catch {
            return response.status(400).send({
                success: false,
                message: 'Could not subscribe…',
            });
        }
    }
}
