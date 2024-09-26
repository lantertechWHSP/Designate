export interface IVideo {
    url?:string;
    video?:IVideoStream;
}

export interface IVideoStream {
    muxPlaybackId?:string;
    title?:string;
    width?:number;
    height?:number;
    blurUpThumb?:string;
    thumbnailUrl?:string;
}
