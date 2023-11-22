import { Skeleton } from '~/components/elements/skeleton/skeleton';
import { Box} from '@chakra-ui/react';

interface IChartSkeleton {
    borderColor?:string;
    skeletonStartColor?:string;
    skeletonEndColor?:string;
}

export const ChartSkeleton = ({ borderColor, skeletonStartColor, skeletonEndColor }) => {
    return <>
        {
            [1,2,3,4,5].map((_value:number, index:number) => {
                return <Box key={index} height={`20%`} borderTop="1px solid" borderColor={borderColor}>
                    <Skeleton mt={2} height="14px" width="20px" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                </Box>
            })
        }
        <Box borderTop="1px solid" borderColor="borderColor" />
    </>
}
