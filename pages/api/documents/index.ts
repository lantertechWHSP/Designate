import { NextApiRequest, NextApiResponse } from 'next';
import { doQuery, queries } from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const ERROR_MESSAGE:string = 'Could not load Documents';

    const body:any = request.body;

    const params:any = {};

    if(body.first) {
        params['first'] = body.first;
    }
    if(body.skip) {
        params['skip'] = body.skip;
    }
    if(body.orderBy) {
        params['orderBy'] = body.orderBy;
    }
    if(body.filter) {
        params['filter'] = body.filter;
    }

    if(request.method === 'POST') {
        try {
            const documents:any = await doQuery(queries.documents, params).then(({ documents }) => documents || []);

            return response.status(200).json({
                success: true,
                data: {
                    documents: documents
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