import type { NextPage } from 'next';
import type {GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData } from '~/lib/utils';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { redirect } from 'next/navigation';

interface INextPageProps {
}

export async function getServerSideProps({ }:GetServerSidePropsContext) : Promise<GetServerSidePropsResult<INextPageProps>> {
    const slug:string = 'privacy-policy';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, false).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, false);

    return {
        redirect: {
            permanent: false,
            destination: layout.footer.privacyPolicyDocument.document.url,
        },
        props:{},
    };
}

const PrivacyPolicyPage : NextPage = ({ }:INextPageProps)  : JSX.Element => {
    return (
        <></>
    );
};
//
export default PrivacyPolicyPage;
