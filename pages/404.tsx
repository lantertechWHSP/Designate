import React from 'react';
import type { NextPage } from 'next';
import DefaultPageLayout from '~/components/pages/layouts/DefaultPageLayout';
import { doQuery, queries } from "~/dato/api";
import { getLayoutData } from '~/lib/utils';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { Container, Box } from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

interface INextPageProps {
    layout?:ILayout;
}

export async function getStaticProps({ preview }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const site:ISite = await doQuery(queries.site);
    const page:IPage = {
        title: 'Error (404)',
        slug: '404'
    };

    const layout:ILayout = getLayoutData(site, page, preview);

    return { props: { layout } };
}

const ErrorPage : NextPage = ({ layout }:INextPageProps) : JSX.Element => {
    return <DefaultPageLayout layout={layout}>
        <Container>
            <Box py={8}>
                Page Not Found
            </Box>
        </Container>
    </DefaultPageLayout>;
};

export default ErrorPage;
