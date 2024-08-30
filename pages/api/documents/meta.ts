import { NextApiRequest, NextApiResponse } from 'next';
import { doQuery, queries } from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const ERROR_MESSAGE: string = 'Could not load Documents';
    const body:any = request.body;

    if(request.method === 'POST') {
        try {
            const documentsMeta:any = await doQuery(queries.documentsMeta, {
                filter: body.filter,
            }).then(({ documentsMeta }) => documentsMeta || {});

            return response.status(200).json({
                success: true,
                data: {
                    documentsMeta: documentsMeta
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