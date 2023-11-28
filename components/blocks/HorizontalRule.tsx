import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import { Container, Divider } from '@chakra-ui/react';
import { Theme} from "~/components/blocks/Content";

interface IHorizontalRuleBlock extends IBlock {
    theme:Theme;
}

const HorizontalRuleBlock:any = ({ theme }:IHorizontalRuleBlock) : ReactNode => {
    const borderColor:string  = theme === Theme.Dark ? 'oliveBlur3' : 'borderColor';

    return <Container height="0" position="relative">
        <Divider sx={{
            borderColor: borderColor
        }} />
    </Container>;
};

export default HorizontalRuleBlock;
