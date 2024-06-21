export interface IEvent {
    id?:string
    title?:string;
    description?:string;
    eventDates:IEventDate[];
}

export interface IEventDate {
    id?:string;
    label?:string;
    allDay?:string;
    startDate?:string;
    endDate?:string;
    location?:string;
}