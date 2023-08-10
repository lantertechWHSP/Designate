import { extendBaseTheme } from '@chakra-ui/react';

const colors = {
    black: '#121517',
    steelBlue: '#687083',
    ghostWhite: '#f2f4f6',
    ghostWhite2: '#f9fafb',
    skyBlue: '#4594f7'
};

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
    colors: {
        ...colors
    },
    components: {
        Heading: {
            baseStyle: {
                fontWeight: 900
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
                sectionHeading: {
                    fontSize: [20],
                    fontWeight: [600],
                    lineHeight: [1.35]
                }
            },
        },
        Code: {
            baseStyle: {
                fontFamily: `'Menlo', sans-serif`,
                border: '1px dashed',
                borderColor: '#ccc',
                borderRadius: 0,
                backgroundColor: '#f0f0f0',
            },
        },
        Container: {
            baseStyle: {
                maxW: '1380px',
                margin: '0 auto',
                px: ['16px'],
            },
            variants: {
                content: {
                    maxW: '880px',
                    margin: '0 auto',
                    px: ['16px'],
                }
            }
        },
        Link: {
            baseStyle: {
                color: '#966b4e'
            },
            variants: {
                siteHeader: {
                    color: 'steelBlue',
                },
                siteFooter: {
                    color: 'steelBlue',
                }
            }
        }
    },
    styles: {
        global: {
            body: {
                color: 'black'
            }
        }
    }
});
