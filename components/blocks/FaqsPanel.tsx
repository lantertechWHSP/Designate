import { ReactNode } from 'react';
import { doQuery, queries} from '~/dato/api';
import { IBlock } from '~/interfaces/util/block';
import { IStructuredText } from '~/interfaces/util/structuredText';
import AccordionBlock, { IAccordionItem } from '~/components/blocks/Accordion';
import { map as _map, orderBy as _orderBy } from 'lodash';
import { Theme } from '~/components/blocks/Content';

interface IFaq  {
    question?:string;
    response:IStructuredText;
}

interface IFaqsPanelBlock extends IBlock {
    theme?:Theme;
    displayTitle?:boolean;
    data: {
        faqs: IFaq[];
    }
}

const FaqsPanelBlock:any = ({ displayTitle, theme, paddingBottom, data: { faqs }}:IFaqsPanelBlock) : ReactNode => {
    const items:IAccordionItem[] = _map(_orderBy(faqs, ['ordinal'], ['asc']), (item:IFaq) => {
        return {
            title: item.question,
            content: item.response
        }
    })

    const backgroundColor:string = theme === Theme.Dark ? 'olive' : 'ghostWhite';
    const textColor:string = theme === Theme.Dark ? 'white' : 'olive';

    return <AccordionBlock title={displayTitle ? 'Frequently Asked Questions' : ''} background={backgroundColor} textColor={textColor} items={items} paddingBottom={paddingBottom} />
};

export default FaqsPanelBlock;

FaqsPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.faqs, {
        first: 100
    });

    return result;
};
