import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEvent } from '~/interfaces/models/event';
import EventRSVPForm from "~/components/elements/eventRSVPForm/EventRSVPForm";

interface IEventRSVPFormPanelBlock extends IBlock {
    event:IEvent;
}

const EventRsvpFormPanel:any = ({ background, paddingTop, paddingBottom, event }:IEventRSVPFormPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <EventRSVPForm event={event} />
    </ContentBlock>;
};

export default EventRsvpFormPanel;