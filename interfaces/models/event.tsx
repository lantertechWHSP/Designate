import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IEvent {
    id?:string
    title?:string;
    description?:IStructuredText;
    disclaimer?:IStructuredText;
    eventDates:IEventDate[];
}

export interface IEventDate {
    id?:string;
    description?:string;
    label?:string;
    allDay?:string;
    startDate?:string;
    endDate?:string;
    location?:string;
}