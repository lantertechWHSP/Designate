import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IStructuredText } from '~/interfaces/util/structuredText';
import StructuredContent from '~/components/StructuredContent';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IHomePageAnnoucementPanelBlock extends IBlock {
    description?:IStructuredText;
}

const HomePageAnnoucementPanel:any = ({ background, description }:IHomePageAnnoucementPanelBlock) : ReactNode => {
    return <ContentBlock background={background}>
        <AnimateOverflow>
            <StructuredContent content={description} />
        </AnimateOverflow>
    </ContentBlock>;
};

export default HomePageAnnoucementPanel;
