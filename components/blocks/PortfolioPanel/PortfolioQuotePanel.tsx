import { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IPerson } from '~/interfaces/models/person';
import { Image } from '~/components/elements/image';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Text } from '@chakra-ui/react';

interface IPortfolioQuotePanelBlock extends IBlock {
    contain?:boolean;
    quote:string;
    person:IPerson;
}

const PortfolioQuotePanelBlock:any = ({ contain, quote, person, paddingTop, paddingBottom }:IPortfolioQuotePanelBlock) : ReactNode => {

    const [blockQuoteFooter] = useState<string>((() => {
        if(person) {
            if(person.name && person.companyPosition) {
                return `${person.name}, ${person.companyPosition}`;
            }
            else if(person.name) {
                return person.name;
            }
            else if(person.companyPosition) {
                return person.companyPosition;
            }
        }
        return '';
    })())

    return (quote || person) && <ContentBlock contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            {
                (quote || blockQuoteFooter) && <Column width={ColumnWidth.TwoThirds} display="flex" justify="center">
                    <blockquote>
                        {
                            quote && <Text fontSize="24px" lineHeight="28px" fontWeight={700} color="darkBrown">
                                {quote}
                            </Text>
                        }
                        {
                            blockQuoteFooter && <footer>—{blockQuoteFooter}</footer>
                        }
                    </blockquote>
                </Column>
            }
            {
                (person && person?.image) && <Column width={ColumnWidth.OneThird}>
                    <Image image={person.image} ratio={[1 / 1]} />
                </Column>
            }
        </Row>
    </ContentBlock>;
};

export default PortfolioQuotePanelBlock;
