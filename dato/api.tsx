const KEY = process.env.NEXT_PUBLIC_DATO_KEY;
const ENVIRONMENT = process.env.NEXT_PUBLIC_DATO_ENVIRONMENT;

import * as queries from '~/dato/queries';
export { queries };

export const doQuery = async (query:any, variables?:any, preview?:any) => {
    let endpoint;
        endpoint = preview
            ? `https://graphql.datocms.com/environments/${ENVIRONMENT}/preview`
            : `https://graphql.datocms.com/environments/${ENVIRONMENT}`;

    try {
        return await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${KEY}`
            },
            body: JSON.stringify({ query, variables })
        })
            .then((res) => res.json())
            .then(({ data, errors }) => {
                if (errors) throw errors;
                return data;
            });
    } catch (error) {
        console.log('QUERY ERROR', error, 'on query', query);
        throw error;
    }
};
