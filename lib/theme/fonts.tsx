import { ReactNode } from 'react';
import { Global } from '@emotion/react';

const Fonts = () : ReactNode => (
    <Global
        styles={`
            @font-face {
                font-family: 'Arimado';
                font-style: normal;
                font-weight: 200 900;
                src: url('/fonts/Arimado-Variable.woff2') format('woff2')
            }
      `}
    />
);

export default Fonts;
