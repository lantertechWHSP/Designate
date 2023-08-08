import { extendBaseTheme } from '@chakra-ui/react';

// import chakraTheme from '@chakra-ui/theme';

export const theme = extendBaseTheme({
    fonts: {
        heading: `'Arimado', sans-serif`,
        body: `'Arimado', sans-serif`,
    },
    fontWeights: {
        extraLight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
    },
    components: {
        Heading: {
            baseStyle: {
                fontWeight: 'bold'
            },
            variants: {
                h1: {
                    fontSize: [50],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
                h2: {
                    fontSize: [40],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
                h3: {
                    fontSize: [30],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
                h4: {
                    fontSize: [20],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
                h5: {
                    fontSize: [16],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
                h6: {
                    fontSize: [14],
                    fontWeight: [900],
                    lineHeight: [1.35]
                },
            },
        }
    }
});
