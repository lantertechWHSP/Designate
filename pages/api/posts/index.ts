import { NextApiRequest, NextApiResponse } from 'next';
import { doQuery, queries } from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const ERROR_MESSAGE: string = 'Could not load News';
    const body:any = request.body;

    if(request.method === 'POST') {
        try {
            const posts = await doQuery(queries.posts, {
                first: body.first,
                skip: body.skip,
                orderBy: body.orderBy
            }).then(({ posts }) => posts || []);

            return response.status(200).json({
                success: true,
                data: {
                    posts: posts
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
