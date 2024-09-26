import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEvent } from '~/interfaces/models/event';
import { doQuery, queries } from '~/dato/api';
import LatestEventList from '~/components/elements/events/LatestEventList';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { AnimateOverflow } from "~/components/elements/animation/AnimateOverflow";
import { SectionLinkButton } from "~/components/elements/sectionLink";

interface ILatestEventListPanelBlock extends IBlock {
    title?:string;
    data: {
        events:IEvent[];
    };
}

const LatestEventListPanelBlock:any = ({ title, background, paddingTop, paddingBottom, data: { events } }:ILatestEventListPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {
            title && <Flex align="flex-end" mb={[4, ,6, 8]}>
                <Heading as="h2" lineHeight={1} variant="sectionHeading" mb={0}>
                    <AnimateOverflow>
                        {title}
                    </AnimateOverflow>
                </Heading>
                <Box flex="1" />
                <AnimateOverflow>
                    <SectionLinkButton href="/investor-centre/key-dates">
                        All Key Dates
                    </SectionLinkButton>
                </AnimateOverflow>
            </Flex>
        }
        <LatestEventList events={events} />
    </ContentBlock>;
};

export default LatestEventListPanelBlock;

LatestEventListPanelBlock.getData = async () => {
    const result:any = await doQuery(queries.latestEvents, { first: 7 });

    return result;
};
