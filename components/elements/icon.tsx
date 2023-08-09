import React, { ReactNode } from 'react';

export enum Icons {
    Cross = 'cross',
    ChevronDown = 'chevronDown',
    Hamburger = 'hamburger',
    Instagram = 'instagram',
    Linkedin = 'linkedin',
}

export const Icon = ({icon, w = 30, h = 30}) : ReactNode => {
    return <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={w} height={h} fill="currentColor">
        {
            (() => {
                switch (icon) {
                    case Icons.Cross: return <path d="M50.63993,55.24093l4.64032-4.64032L13.36007,8.68042l-4.719,4.64032Zm-37.27986.07865L55.3589,13.32074l-4.719-4.64032L8.6411,50.60061Z"/>;
                    case Icons.ChevronDown: return <polygon points="2.742 19.377 32 49.657 61.258 19.377 56.775 14.343 32 39.983 7.225 14.343 2.742 19.377"/>;
                    case Icons.Hamburger: return <path d="M2.61431,29.55119v4.89762H61.38569V29.55119Zm0,17.95793v4.89761H61.38569V47.50912Zm0-35.91585v4.89761H61.38569V11.59327Z"/>;
                    case Icons.Instagram: return <path d="M32.008,15.591A16.409,16.409,0,1,0,48.417,32,16.3859,16.3859,0,0,0,32.008,15.591Zm0,27.0737A10.66467,10.66467,0,1,1,42.67267,32,10.68209,10.68209,0,0,1,32.008,42.66467ZM52.91331,14.91893a3.82424,3.82424,0,1,1-3.82424-3.82424A3.814,3.814,0,0,1,52.91331,14.91893ZM63.778,18.80718c-.24-5.12832-1.41609-9.66461-5.16832-13.40884C54.86543,1.6541,50.32914.486,45.20082.23,39.92049-.066,24.0795-.066,18.79917.23,13.68686.47,9.15057,1.6461,5.39034,5.38234S.478,13.66286.222,18.79117c-.296,5.28033-.296,21.12132,0,26.40166.24,5.12832,1.41609,9.6646,5.16833,13.40883S13.67085,63.514,18.79917,63.77c5.28033.296,21.12132.296,26.40165,0,5.12832-.24,9.66461-1.41609,13.40884-5.16832,3.74423-3.74423,4.91231-8.28051,5.16832-13.40883.296-5.28034.296-21.10532,0-26.38565Zm-6.82443,32.058a10.79528,10.79528,0,0,1-6.08038,6.08038c-4.20826,1.6721-14.20889,1.28808-18.86518,1.28808s-14.66491.368-18.86518-1.28808a10.79528,10.79528,0,0,1-6.08038-6.08038C5.39034,46.64891,5.77436,36.65629,5.77436,32s-.368-14.66492,1.28808-18.86518a10.79528,10.79528,0,0,1,6.08038-6.08038C17.35908,5.38234,27.35171,5.76636,32.008,5.76636s14.66492-.368,18.86518,1.28808a10.79525,10.79525,0,0,1,6.08038,6.08038C58.62567,17.34308,58.24164,27.34371,58.24164,32S58.62566,46.66492,56.95356,50.86518Z"/>;
                    case Icons.Linkedin: return <path d="M59.432,0H4.56A4.59066,4.59066,0,0,0,0,4.616V59.384A4.59066,4.59066,0,0,0,4.56,64H59.432A4.6026,4.6026,0,0,0,64,59.384V4.616A4.6026,4.6026,0,0,0,59.432,0ZM19.344,54.856H9.856V24.312H19.36V54.856ZM14.6,20.144a5.504,5.504,0,1,1,5.504-5.504A5.50884,5.50884,0,0,1,14.6,20.144ZM54.896,54.856h-9.48V40c0-3.544-.072-8.096-4.928-8.096-4.944,0-5.696,3.856-5.696,7.84V54.856H25.296V24.312H34.4V28.48h.128a9.98626,9.98626,0,0,1,8.984-4.928c9.6,0,11.384,6.328,11.384,14.56Z"/>;
                    default:return '';
                }
            })()
        }
    </svg>;
};