import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { ChakraProps } from '@chakra-ui/system';
import ContentBlock from '~/components/blocks/Content';
import { IPerson } from '~/interfaces/models/person';
import { Image } from '~/components/elements/image';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Text } from '@chakra-ui/react';

interface IPortfolioQuotePanelBlock extends IBlock, ChakraProps {
    contain?:boolean;
    quote:string;
    person:IPerson;
}

const PortfolioQuotePanelBlock:any = ({ contain, quote, person, paddingTop, paddingBottom }:IPortfolioQuotePanelBlock) : ReactNode => {
    return <ContentBlock contain={contain} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <Row>
            <Column width={ColumnWidth.TwoThirds} display="flex" justify="center">
                <blockquote>
                    <Text fontSize="24px" lineHeight="28px" fontWeight={700} color="darkBrown">
                        {quote}
                    </Text>
                    {
                        person && <footer>—{person?.name}, {person?.companyPosition}</footer>

                    }
                </blockquote>
            </Column>
            {
                (person && person.image) && <Column width={ColumnWidth.OneThird}>
                    <Image image={person.image} ratio={[1 / 1]} />
                </Column>
            }
        </Row>
    </ContentBlock>;
};

export default PortfolioQuotePanelBlock;
