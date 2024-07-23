import { ReactNode } from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { IEventBundle } from '~/interfaces/models/event';
import EventRSVPForm from "~/components/elements/eventRSVPForm/EventRSVPForm";

interface IEventRSVPFormPanelBlock extends IBlock {
    eventBundle:IEventBundle;
    hideForm?:boolean;
}

const EventRsvpFormPanel:any = ({ background, paddingTop, paddingBottom, eventBundle, hideForm }:IEventRSVPFormPanelBlock) : ReactNode => {
    return <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <EventRSVPForm eventBundle={eventBundle} hideForm={hideForm} />
    </ContentBlock>;
};

export default EventRsvpFormPanel;