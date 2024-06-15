import React from 'react';
import type { NextPage } from 'next';
import DefaultPageLayout from '~/components/pages/layouts/DefaultPageLayout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';
import EventList from '~/components/elements/events/EventList';
import EventRSVP from '~/components/elements/eventRSVP/EventRSVP';
import { IEvent } from '~/interfaces/models/event';
import { Container, Box } from '@chakra-ui/react';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    events?:IEvent[];
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'investor-centre/key-dates';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);
    const events:IEvent[] = await doQuery(queries.events, preview).then(
        ({ events }) => events || []
    );

    return {
        props: {
            layout,
            blocks,
            events
        },
        revalidate: 10
    };
}

const KeyDatesPage : NextPage = ({ layout, blocks, events }:INextPageProps)  : JSX.Element => {
    return (
        <DefaultPageLayout layout={layout}>
            <ModularContent content={blocks} />
            <Box background="ghostWhite" pt={['40px', ,'50px', '60px']} pb={['120px']}>
                <Container>
                    <EventList events={events} />
                </Container>
            </Box>
            <Box>
                <Container>
                    <Row>
                        <Column width={[ColumnWidth.Full, ColumnWidth.Half]}>
                            <EventRSVP events={events}  />
                        </Column>
                    </Row>
                </Container>
            </Box>
        </DefaultPageLayout>
    );
};

export default KeyDatesPage;
