import { getBlock } from '~/components/ModularContent';

export const getLayoutData = (site, page, preview) => {
    const favicon = site?.site?.favicon || [];
    const metatags = [...favicon, ...(page?.seo || [])];

    return {
        metatags: metatags,
        menu: site?.menu || [],
        slug: page?.slug || null,
        title: page?.title || null,
        preview: preview || false,
    };
};

export const getBlocks = async ({ blocks }) => {
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
