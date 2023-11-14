import localFont from 'next/font/local';
import { ReactNode } from 'react';

export const fontGramatika:any = localFont({
    src: [
        // Gramatika
        {
            path: 'fonts/Gramatika-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: 'fonts/Gramatika-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: 'fonts/Gramatika-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: 'fonts/Gramatika-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: 'fonts/Gramatika-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: 'fonts/Gramatika-LightItalic.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: 'fonts/Gramatika-RegularItalic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: 'fonts/Gramatika-MediumItalic.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: 'fonts/Gramatika-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: 'fonts/Gramatika-BlackItalic.woff2',
            weight: '900',
            style: 'italic',
        },
    ]
});

export const fontRoboto:any = localFont({
    src: [
        // Roboto
        {
            path: 'fonts/Roboto-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: 'fonts/Roboto-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: 'fonts/Roboto-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: 'fonts/Roboto-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: 'fonts/Roboto-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: 'fonts/Roboto-LightItalic.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: 'fonts/Roboto-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: 'fonts/Roboto-MediumItalic.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: 'fonts/Roboto-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: 'fonts/Roboto-BlackItalic.woff2',
            weight: '900',
            style: 'italic',
        }
    ]
});

export default function fonts() : ReactNode {
    return <></>;
}
