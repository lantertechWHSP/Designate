import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
const { Modal } = chakraTheme.components;

const colors = {
    // lightGrey: '#c4c4c4',
    ghostWhite: '#f2f4f6',
    ghostWhite2: '#f9fafb',
    mutedSteel: '#33373a',
    skyBlue: '#4594f7',

    // New
    black: '#000000',
    steelBlue: '#353a3f',
    steelBlue2: '#3f4448',
    steelBlue3: '#667085',
    white: '#fff',
    grey: '#999',
    lightGrey: '#c4c4c4',
    lightGrey2: '#ddd',
    lightGrey3: '#f1f2f5',
    green: '#00ce7d',
    red: '#df322f'
};

export const theme = extendBaseTheme({
    fonts: {
        heading: `'Untitled Sans', serif`,
        body: `'Untitled Sans', serif`,
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
        Modal,
        Heading: {
            baseStyle: {
                fontWeight: 500
            },
            variants: {
                h1: {
                    fontSize: [50],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                h2: {
                    fontSize: [40],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                h3: {
                    fontSize: [30],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                h4: {
                    fontSize: [20],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                h5: {
                    fontSize: [16],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                h6: {
                    fontSize: [14],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                sectionHeading: {
                    fontSize: [40],
                    lineHeight: [1.5],
                    fontWeight: 400,
                },
                sectionSubheading: {
                    fontSize: [32],
                    lineHeight: [1.5],
                    fontWeight: 400,
                },
                pageLinksHeading: {
                    fontSize: [20],
                    lineHeight: [1.35],
                    fontWeight: 500,
                },
                listItem: {
                    fontSize: [24],
                    lineHeight: [1.35],
                    fontWeight: 400
                },
                label: {
                    fontSize: [16],
                    lineHeight: [1.1],
                    color: 'lightGrey',
                    fontWeight: 400
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
                    fontSize: [18],
                    color: 'lightGrey2',
                },
                siteFooter: {
                    color: 'steelBlue',
                },
                sectionLink: {
                    fontSize: [16],
                    lineHeight: [1.2],
                    color: 'skyBlue',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'underline'
                }
            }
        },
        Button: {
            variants: {
                sharePriceChart: {
                    background: 'white',
                    color: 'steelBlue3',
                    width: '54px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: 500
                }
            }
        },
        Divider: {
            baseStyle: {
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'lightGrey',
            }
        }
    },
    styles: {
        global: {
            // '::selection': {
            //     background: 'rgba(42, 67, 100, 0.3)',
            // },
            '*:focus': {
                outline: 0,
            },
            '*:focus-visible': {
                outline: 0
            },
            body: {
                color: 'black'
            }
        },
        a: {
            textDecoration: 'none',
            color: 'skyBlue',
            _focus: {
                boxShadow: 'none',
            },
        },
    }
});
