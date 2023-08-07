import Layout from '~/components/layouts/layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from "~/dato/api";
import { getBlocks } from '~/lib/utils';

function Page({ layout, page }) {
    console.log(page);
    return (
        <Layout layout={layout}>
            {
                page.title && <h1>
                    {
                        page.title
                    }
                </h1>
            }
            <ModularContent content={page?.blocks} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const pages = await doQuery(queries.pages).then(({ pages }) => pages);

    const paths = pages
        .map((page) => {
            const slug = page.slug === 'home' ? [''] : page.slug.split('/');
            return { params: { slug } };
        });
    return { paths, fallback: false };
}

export async function getStaticProps({ params, preview }) {
    const { slug: slugRaw } = params;
    const slug = slugRaw ? slugRaw.join('/') : 'home';
    const site = {}; //await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    // console.log(page);
    //
    // const blocks = await getBlocks({ blocks: page });
    // page.blocks = blocks;
    // const blocks = {};
    return { props: { layout: site, page } };
}

export default Page;
