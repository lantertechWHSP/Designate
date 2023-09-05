import { ReactNode } from 'react';
import { Global } from '@emotion/react';

const Fonts:any = () : ReactNode => (
    <Global
        styles={`
            @font-face {
                font-family: 'Untitled Sans';
                font-weight: 400;
                font-style: normal;
                src: url('/fonts/UntitledSans-Regular.woff2') format('woff2')
            }
            
            @font-face {
                font-family: 'Untitled Sans';
                font-weight: 500;
                font-style: normal;
                src: url('/fonts/UntitledSans-Medium.woff2') format('woff2')
            }
      `}
    />
);

export default Fonts;
