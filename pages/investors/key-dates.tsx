import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { ILayout, IPage, ISite } from '~/interfaces';
import EventList from "~/components/elements/events/eventList";

export async function getStaticProps({ preview }:any) : Promise<any> {
    const slug:string = 'investors/key-dates';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, preview);
    const blocks:any = await getBlocks(page?.blocks);
    const events:any = await doQuery(queries.events, preview).then(
        ({ events }) => events || []
    );

    return { props: { layout, blocks, events } };
}

const KeyDatesPage : NextPage = ({ layout, blocks, events }:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <EventList events={events} />
        </Layout>
    );
};

export default KeyDatesPage;
