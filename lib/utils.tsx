import { getBlock } from '~/components/ModularContent';

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
