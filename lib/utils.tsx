import { getBlock } from '~/components/ModularContent';

export const getLayoutData = (site, page, preview) : any => {
    const favicon = site?.site?.favicon || [];
    const metatags = [...favicon, ...(page?.seo || [])];

    return {
        metatags: metatags,
        menu: site?.menu || [],
        footer: site?.footer,
        slug: page?.slug || null,
        title: page?.title || null,
        preview: preview || false,
    };
};

export const getBlocks = async ({ blocks }) : Promise<any> => {
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
