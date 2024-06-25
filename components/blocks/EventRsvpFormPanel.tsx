import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEventBundle } from '~/interfaces/models/event';
import EventRSVPForm from "~/components/elements/eventRSVPForm/EventRSVPForm";

interface IEventRSVPFormPanelBlock extends IBlock {
    eventBundle:IEventBundle;
}

const EventRsvpFormPanel:any = ({ background, paddingTop, paddingBottom, eventBundle }:IEventRSVPFormPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <EventRSVPForm eventBundle={eventBundle} />
    </ContentBlock>;
};

export default EventRsvpFormPanel;