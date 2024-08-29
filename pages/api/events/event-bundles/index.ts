import { NextApiRequest, NextApiResponse } from 'next';
import { doPublicQuery, queries} from '~/dato/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) : Promise<any> {
    const body: any = request.body;
    const ERROR_MESSAGE: string = 'Could not get Event Bundles';

    if (request.method === 'POST') {
        try {
            const eventBundles = await doPublicQuery(queries.eventBundle, ({ id: body.id })).then(({ eventBundles }) => eventBundles)

            return response.status(200).json({
                success: true,
                data: {
                    eventBundles: eventBundles
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