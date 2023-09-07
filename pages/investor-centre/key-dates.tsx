import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
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

interface INextPageProps {
    layout?:ILayout;
    blocks?:IBlock[];
    events?:IEvent[];
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'investors/key-dates';
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
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <EventList events={events} />
        </Layout>
    );
};

export default KeyDatesPage;
