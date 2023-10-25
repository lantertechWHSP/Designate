import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock, { PaddingBottom, PaddingTop } from '~/components/blocks/Content';
import { Divider } from '@chakra-ui/react';

interface IHorizontalRuleBlock extends IBlock {
}

const HorizontalRuleBlock:any = ({}:IHorizontalRuleBlock) : ReactNode => {
    return <ContentBlock paddingTop={PaddingTop.None} paddingBottom={PaddingBottom.None}>
        <Divider />
    </ContentBlock>;
};

export default HorizontalRuleBlock;
