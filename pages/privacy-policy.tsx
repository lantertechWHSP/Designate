import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData } from '~/lib/utils';
import { ISite } from '~/interfaces/layout/site';
import { IPage } from '~/interfaces/models/page';
import { ILayout } from '~/interfaces/layout/layout';
import { useEffect } from 'react';
import { IDocument } from '~/interfaces/models/document';

interface INextPageProps {
    document:IDocument;
}

export async function getStaticProps({ }:GetStaticPropsContext) : Promise<GetStaticPropsResult<INextPageProps>> {
    const slug:string = 'privacy-policy';
    const site:ISite = await doQuery(queries.site);
    const page:IPage = await doQuery(queries.page, { slug }, false).then(
        ({ page }) => page
    );

    const layout:ILayout = getLayoutData(site, page, false);

    return {
        props: {
            document: layout.footer.privacyPolicyDocument
        },
    };
}

const PrivacyPolicyPage : NextPage = ({ document }:any)  : JSX.Element => {
    useEffect(() => {
        if(document.document.url) {
            window.location.href = document.document.url;
        }
        else {
            window.location.href = '/error';
        }
    }, []);

    return (
        <></>
    );
};

export default PrivacyPolicyPage;
