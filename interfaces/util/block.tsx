export interface IBlock {
    id?:string;
    __typename?:string;

    // External
    data?:any;
    getData?:() => any;
}
