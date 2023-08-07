import Layout, {ILayout} from '~/components/layouts/layout';
import { getBlock, ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';

const getLayoutData = (site, page, preview) : ILayout => {
    return {
        slug: page?.slug || null,
        title: page?.title || null,
        preview: preview || false,
    };
};

const getBlocks = async ({ blocks }) => {
    return (
        blocks && Array.isArray(blocks) ? (
            (await Promise.all(
                blocks?.map(async (block) => {
                    const b = getBlock(block.__typename);
                    if (b?.getData instanceof Function) {
                        block.data = await b?.getData(block);
                    }
                    return block;
                })
            )) || []
        ) : []
    );
};

function Page({ layout, page, blocks }) {
    // console.log(page)
    console.log(blocks)

    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
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
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);

    return { props: { layout, page, blocks } };
}

export default Page;
