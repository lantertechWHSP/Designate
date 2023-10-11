import { ReactNode } from 'react';
import { Global } from '@emotion/react';

const Fonts:any = () : ReactNode => (
    <Global
        styles={`
            @font-face {
                font-family: 'Gramatika';
                font-weight: 300;
                font-style: normal;
                src: url('/fonts/Gramatika-Light.woff2') format('woff2')
            }            
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 400;
                font-style: normal;
                src: url('/fonts/Gramatika-Regular.woff2') format('woff2')
            }
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 500;
                font-style: normal;
                src: url('/fonts/Gramatika-Medium.woff2') format('woff2')
            }
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 700;
                font-style: normal;
                src: url('/fonts/Gramatika-Bold.woff2') format('woff2')
            }
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 900;
                font-style: normal;
                src: url('/fonts/Gramatika-Black.woff2') format('woff2')
            }
            
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 300;
                font-style: italic;
                src: url('/fonts/Gramatika-LightItalic.woff2') format('woff2')
            }            
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 400;
                font-style: italic;
                src: url('/fonts/Gramatika-Italic.woff2') format('woff2')
            }
            
            @font-face {
                font-family: 'Gramatika';
                font-weight: 500;
                font-style: italic;
                src: url('/fonts/Gramatika-MediumItalic.woff2') format('woff2')
            }

            @font-face {
                font-family: 'Gramatika';
                font-weight: 700;
                font-style: italic;
                src: url('/fonts/Gramatika-BoldItalic.woff2') format('woff2')
            }

            @font-face {
                font-family: 'Gramatika';
                font-weight: 900;
                font-style: italic;
                src: url('/fonts/Gramatika-BlackItalic.woff2') format('woff2')
            }
      `}
    />
);

export default Fonts;
