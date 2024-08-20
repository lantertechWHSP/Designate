import { NextApiRequest, NextApiResponse } from 'next';
import { doQuery, queries } from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const ERROR_MESSAGE:string = 'Could not load documents';

    const body:any = request.body;

    if(request.method === 'POST') {
        try {
            const documents = await doQuery(queries.documents, {
                first: body.first,
                skip: body.skip,
                orderBy: body.orderBy,
                filter: body.filter,
            }).then(({ documents }) => documents || []);

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