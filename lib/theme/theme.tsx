import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
const { Modal, Menu, Badge, Progress } = chakraTheme.components;

const colors:any = {
    // New
    darkGreen: '#527535',
    highlightGreen: '#B0E70F',

    black: '#1C1C1C',
    blackBlur: 'rgba(28, 28, 28, 0.4)',
    black2: '#1B2024',
    black3: '#323639',

    darkBrown: '#50513C',
    darkBrownBlur: 'rgba(80, 81, 60, 0.2)',
    sand: '#E4DDC1',

    white: '#fff',
    whiteBlur: 'rgba(255, 255, 255, 0.7)',
    ghostWhite: '#f8f8f8',

    darkGrey: '#969696',
    grey: '#CBCBC5',

    lightGrey: '#c4c4c4',
    lightGrey2: '#DEE2E6',

    success: '#e8f1c8',
    positive: '#e8f1c8',
    negative: '#f9c9c8',

    error: '#f17674',

    // negative: '#'

    // Legacy
    // ghostWhite: '#f2f4f6',
    // ghostWhite2: '#f9fafb',
    // mutedSteel: '#33373a',
    // skyBlue: '#4594f7',

    // black: '#000000',
    // steelBlue: '#353a3f',
    // steelBlue2: '#3f4448',
    // steelBlue3: '#667085',
    // white: '#fff',
    // grey: '#999',
    // lightGrey: '#c4c4c4',
    // lightGrey2: '#ddd',
    // lightGrey3: '#f1f2f5',
    // green: '#00ce7d',
    // red: '#df322f'

};

export const theme:any = extendBaseTheme({
    fonts: {
        heading: `'Gramatika', serif`,
        body: `'Gramatika', serif`,
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
    sizes: {
        container: {
            narrow: '900px', // Text Content
            wide: '1100px', // Images
        }
    },
    components: {
        Modal,
        Heading: {
            baseStyle: {
                fontWeight: 500
            },
            variants: {
                hero: {
                    fontSize: ['76px'],
                    fontWeight: 500,
                    lineHeight: ['90px'],
                    color: 'white'
                },
                defaultLayoutTitle: {
                    fontSize: ['64px'],
                    fontWeight: 500,
                    lineHeight: ['80px']
                },
                sectionHeading: {
                    fontSize: ['40px'],
                    lineHeight: ['48px'],
                    fontWeight: 700,
                },
                sectionSubheading: {
                    fontSize: ['28px'],
                    lineHeight: ['32px'],
                },

                listItem: {
                    fontSize: ['21px'],
                    fontWeight: 500,
                    color: 'darkBrown',
                    a: {
                        color: 'darkBrown'
                    }
                },
                listLabel: {
                    color: 'darkBrownBlur',
                    fontSize: ['21px'],
                    fontWeight: 500,
                },



                h3: {
                    fontSize: ['28px'],
                    lineHeight: ['34px'],
                    fontWeight: 500
                }
                /// Legacy
                // h1: {
                //     fontSize: ['50px'],
                //     lineHeight: ['60px'],
                //     fontWeight: 500,
                // },
                // h2: {
                //     fontSize: ['40px'],
                //     lineHeight: ['50px'],
                //     fontWeight: 500,
                // },
                // h3: {
                //     fontSize: ['30px'],
                //     lineHeight: ['40px'],
                //     fontWeight: 500,
                // },
                // h4: {
                //     fontSize: ['20px'],
                //     lineHeight: ['30px'],
                //     fontWeight: 500,
                // },
                // h5: {
                //     fontSize: ['16px'],
                //     lineHeight: ['24px'],
                //     fontWeight: 500,
                // },
                // h6: {
                //     fontSize: ['14px'],
                //     lineHeight: ['18px'],
                //     fontWeight: 500,
                // },
                // sectionHeading: {
                //     fontSize: ['40px'],
                //     lineHeight: ['60px'],
                //     fontWeight: 500,
                // },
                // sectionSubheading: {
                //     fontSize: ['32px'],
                //     lineHeight: ['48px'],
                //     fontWeight: 500,
                // },
                // pageLinksHeading: {
                //     fontSize: ['20px'],
                //     lineHeight: ['30px'],
                //     fontWeight: 500,
                // },
                // listItem: {
                //     color: 'black',
                //     fontSize: ['18px'],
                //     lineHeight: ['26px'],
                //     fontWeight: 500,
                //     a: {
                //         color: 'black'
                //     }
                // },
                //
                // label: {
                //     fontSize: ['16px'],
                //     lineHeight: ['18px'],
                //     color: 'lightGrey',
                //     fontWeight: 400
                // }
            },
        },
        Text: {
            baseStyle: {
                fontSize: ['16px'],
                lineHeight: ['26px']
            },
            variants: {
                sectionDescription: {
                    fontSize: ['18px'],
                    color: 'darkBrown'
                },
                // listItemDate: {
                //     fontSize: [18],
                //     lineHeight: [1.35],
                //     fontWeight: 400,
                //     color: 'steelBlue3'
                // },
                error: {
                    color: 'error'
                },
                caption: {
                    fontSize: '14px'
                }
            }
        },
        Code: {
            baseStyle: {
                fontFamily: `'Menlo', sans-serif`,
                border: '1px dashed',
                borderColor: 'lightGrey2',
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
                color: 'skyBlue',
            },
            variants: {
                siteHeader: {
                    fontSize: ['16px'],
                    fontWeight: 700
                },
                siteFooter: {
                    fontSize: ['18px'],
                    color: 'white',
                    fontWeight: 400
                },
                sectionLink: {
                    fontSize: ['16px'],
                    lineHeight: [1.2],
                    color: 'skyBlue',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'underline'
                }
            }
        },
        Button: {
            baseStyle: {

            },
            variants: {
                button: {
                    background: 'white',
                    color: 'steelBlue3',
                    height: '50px',
                    lineHeight: '50px',
                    px: 4,
                    fontSize: '14px',
                    fontWeight: 500
                },
                pagination: {
                    background: 'transparent',
                    color: 'steelBlue3',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: 0
                },
                tab: {
                    background: 'white',
                    color: 'steelBlue3',
                    width: '54px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: 500
                },
                menuButton: {
                    background: 'white',
                    color: 'steelBlue3',
                    px: 4,
                    height: '50px',
                    textAlign: 'unset'
                },
            }
        },
        Tabs: {
            parts: ['tab', 'tabpanel', 'tabs'],
            baseStyle: {
                tab: {
                    py: 2,
                    fontSize: '24px',
                    lineHeight: '26px',
                    mr: 4,
                    mb: 4,
                    _selected: {
                        fontWeight: 500
                    }
                }
            }
        },
        Menu: {
            ...Menu,
            parts: ['list', 'item', 'button'],
            baseStyle: {
                list: {
                    py: 1,
                    px: 0,
                    background: 'white'
                },
                item: {
                    height: '50px',
                    lineHeight: '50px',
                    textAlign: 'unset',
                    justifyContent: 'unset',
                    px: 4,
                    color: 'steelBlue3',
                    _focus: {
                        background: 'lightGrey3'
                    },
                    _active: {
                        background: 'lightGrey3'
                    }
                }
            }
        },
        Divider: {
            baseStyle: {
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'lightGrey2',
            }
        },
        Table: {
            defaultProps: {
                variant: 'simple'
            },
            parts: ['td', 'th'],
            baseStyle: {
                root: {
                    borderCollapse: 'collapse',
                },
                th: {
                    textAlign: 'left',
                }
            },
            variants: {
                basic: {
                    th: {
                        fontSize: ['16px'],
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: 'steelBlue3',
                        borderBottom: '1px solid',
                        borderColor: 'lightGrey2',
                        py: 2
                    },
                    td: {
                        py: 4,
                        fontSize: ['18px'],
                        borderBottom: '1px solid',
                        borderColor: 'lightGrey2',
                    }
                }
            }
        },
        Badge: {
            ...Badge,
            baseStyle: {
                height: '30px',
                lineHeight: '30px',
                borderRadius: '15px',
                px: 2,
                background: 'sand'
            },
        },
        Progress: {
            ...Progress
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
                fontSize: '16px',
                lineHeight: '26px',
                color: 'black'
            },
            a: {
                textDecoration: 'none',
                color: 'skyBlue',
                _focus: {
                    boxShadow: 'none',
                },
            },
            p: {
                mb: 4
            },
            blockquote: {
                // borderLeft: `4px solid ${colors.skyBlue}`,
                pl: 8,
                mb: 4
            },
            ul: {
                ml: 4,
                mb: 4
            },
            ol: {
                ml: 4,
                mb: 4
            }
        },
    }
});
