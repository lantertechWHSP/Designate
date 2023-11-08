import { structuredTextAttrs } from '~/dato/attrs/structuredTextAttrs';

export const faqs:string = `
    query faqs ($limit: IntType) {
        faqs: allFaqs(first: $limit) {
            question
            response {
                ${structuredTextAttrs}
            }
            ordinal
        }
    }
`;
