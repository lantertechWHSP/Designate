import * as queries from '~/dato/queries';
export { queries };

export const doQuery:any = async (query:any, variables?:any, preview?:any) : Promise<any> => {
    const KEY:string = process.env.DATO_KEY;
    const ENVIRONMENT:string = process.env.DATO_ENVIRONMENT;

    const endpoint:string = preview
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