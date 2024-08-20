import { NextApiRequest, NextApiResponse } from 'next';
import {doQuery, queries} from "~/dato/api";

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body:any = request.body;
    const ERROR_MESSAGE:string = 'Could not get Events RSVP';

    if(request.method === 'POST') {
        try {
            const values = [];
            let hasAllValues = false;
            let batchIndex = 0;

            while(!hasAllValues) {
                const batchValues = await doQuery(queries.eventRSVP, { first: 100, skip: 100 * batchIndex, in: body.rsvp }).then(({ eventRSVPS }) => eventRSVPS);

                values.push(...batchValues);

                if(batchValues.length < 1) {
                    hasAllValues = true;
                }
                else {
                    batchIndex++;
                }
            }

            return response.status(200).json({
                success: true,
                data: {
                    values: values
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
