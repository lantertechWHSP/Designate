import { ReactNode } from 'react';
import ContentBlock, { ContainerWidth } from '~/components/blocks/Content';
import { IPerson } from '~/interfaces/models/person';
import { Image } from '~/components/elements/image';
import { Row, Column, ColumnWidth } from "~/components/elements/grid/grid";
import { Text } from '@chakra-ui/react';

interface IPeoplePanelBlock {
    containerWidth?:ContainerWidth;
    contain?:boolean;
    quote:string;
    person:IPerson;
}

const PersonQuotePanelBlock:any = ({ containerWidth, contain, quote, person }:IPeoplePanelBlock) : ReactNode => {
    return <ContentBlock containerWidth={containerWidth} contain={contain}>
        <Row>
            <Column width={ColumnWidth.TwoThirds} display="flex" justify="center">
                <blockquote>
                    <Text fontSize="24px" lineHeight="28px" fontWeight={700} color="darkBrown">
                        {quote}
                    </Text>
                    <footer>—{person.name}, {person.companyPosition}</footer>
                </blockquote>
            </Column>
            <Column width={ColumnWidth.OneThird}>
                <Image image={person.image} ratio={[1 / 1]} />
            </Column>
        </Row>
    </ContentBlock>;
};

export default PersonQuotePanelBlock;
