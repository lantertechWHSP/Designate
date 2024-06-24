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
    title?:string;
    description?:string;
    location?:string;
    label?:string;
    startDate?:string;
    endDate?:string;
    allDay?:boolean;
}