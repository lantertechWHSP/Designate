export interface IEvent {
    id?:string
    title?:string;
    description?:string;
    eventDates:{
        allDay?:string;
        startDate?:string;
        endDate?:string;
        location?:string;
    }[]
}
