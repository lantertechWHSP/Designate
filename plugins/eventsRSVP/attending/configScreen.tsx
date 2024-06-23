import { Canvas } from 'datocms-react-ui';
import {useEffect} from "react";
import {doQuery, queries} from "~/dato/api";

interface Props {
    ctx: any;
}

const EventsRSVPAttendingConfigScreen = ({ ctx }: Props) : any => {
    console.log(ctx);
    useEffect(() => {
        (async () => {
            const values = await doQuery(queries.eventRSVPEventDates, ({ id: ctx.itemId })).then(({ eventRSVPS }) => eventRSVPS);
            console.log(values);
        })();
    }, []);

    return <Canvas ctx={ctx}>
    </Canvas>;
};

export default EventsRSVPAttendingConfigScreen;