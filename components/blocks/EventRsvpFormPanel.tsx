import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEvent } from '~/interfaces/models/event';
import EventRSVP from "~/components/elements/eventRSVP/EventRSVP";

interface IEventRSVPFormPanelBlock extends IBlock {
    event:IEvent;
}

const EventRsvpFormPanel:any = ({ background, paddingTop, paddingBottom, event }:IEventRSVPFormPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <EventRSVP event={event} />
    </ContentBlock>;
};

export default EventRsvpFormPanel;