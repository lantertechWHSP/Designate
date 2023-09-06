export interface IBlock {
    id?:string;
    __typename?:string;
    data?:any;
    getData?:() => any;
}
