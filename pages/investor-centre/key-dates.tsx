import React from 'react';
import type { NextPage } from 'next';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { IBlock } from '~/interfaces/util/block';
import EventList from '~/components/elements/events/EventList';
import { IEvent } from '~/interfaces/models/event';
import { Container } from '@chakra-ui/react';

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

    return { props: { layout, blocks, events } };
}

const KeyDatesPage : NextPage = ({ layout, blocks, events }:INextPageProps)  : JSX.Element => {
    return (
        <DefaultLayout layout={layout}>
            <ModularContent content={blocks} />
            <Container>
                <EventList events={events} />
            </Container>
        </DefaultLayout>
    );
};

export default KeyDatesPage;
