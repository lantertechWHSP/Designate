import { ReactNode } from 'react';
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

    return (quote || person) && <ContentBlock contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            {
                (quote || person.name) && <Column width={ColumnWidth.TwoThirds} display="flex" justify="center">
                    <blockquote>
                        {
                            quote && <Text fontSize="24px" lineHeight="28px" fontWeight={700} color="olive">
                                {quote}
                            </Text>
                        }
                        {
                            person.name && <footer>—{person.name}</footer>
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
