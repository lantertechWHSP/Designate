import { IStructuredText } from '~/interfaces/util/structuredText';

export interface IEventBundle {
    id?:string
    title?:string;
    description?:IStructuredText;
    disclaimer?:IStructuredText;
    events:IEvent[];
}

export interface IEvent {
    id?:string;
    title?:string;
    description?:IStructuredText;
    location?:string;
    label?:string;
    startDate?:string;
    endDate?:string;
    allDay?:boolean;
}