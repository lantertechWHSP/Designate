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

    // steelBlue: '#667085',

    darkGrey: '#848484',
    brownGrey: '#CBCBC5',

    lightGrey: '#c4c4c4',
    lightGrey2: '#DEE2E6',
    lightGrey2Blur: '#DEE2E666',


    success: '#e8f1c8',
    positive: '#e8f1c8',
    negative: '#f9c9c8',

    error: '#f17674'

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
                    fontSize: ['36px', '46px', '56px', '76px'],
                    fontWeight: 500,
                    lineHeight: [1.2],
                    color: 'white'
                },
                defaultLayoutTitle: {
                    fontSize: ['64px'],
                    fontWeight: 500,
                    lineHeight: [1.2]
                },
                sectionHeading: {
                    color: 'black',
                    fontSize: ['32px', ,'40px'],
                    lineHeight: [1.2],
                    fontWeight: 700,
                },
                sectionSubheading: {
                    color: 'black',
                    fontSize: ['24px', ,'28px'],
                    lineHeight: [1.2],
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
                },
                error: {
                    color: 'error'
                },
                caption: {
                    fontSize: '14px'
                },
                annotation: {
                    color: 'blackBlur'
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
                color: 'darkBrown',
            },
            variants: {
                underline: {
                    display: 'inline-block',
                    borderBottom: '1px solid',
                    borderColor: 'darkBrownBlur'
                },
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
                },
            }
        },
        Button: {
            baseStyle: {

            },
            variants: {
                button: {
                    background: 'white',
                    height: '50px',
                    lineHeight: '50px',
                    px: 4,
                    fontSize: '14px',
                    fontWeight: 500
                },
                pagination: {
                    background: 'transparent',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: 0
                },
                tab: {
                    background: 'white',
                    width: '54px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: 500
                },
                menuButton: {
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'lightGrey2',
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
                    background: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    padding: 0
                },
                item: {
                    height: '50px',
                    lineHeight: '50px',
                    textAlign: 'unset',
                    justifyContent: 'unset',
                    px: 4,
                    color: 'black',
                    _focus: {
                        background: 'lightGrey2Blur'
                    },
                    _active: {
                        background: 'lightGrey2Blur'
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
                        color: 'darkBrown',
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
                lineHeight: '26px'
            },
            // a: {
            // textDecoration: 'none',
            // color: 'darkBrown',
            // _focus: {
            //     boxShadow: 'none',
            // },
            // },
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
            },
            // YourIR
            '#yourir-default-announcement': {
                height: '0',
                overflow: 'hidden'
            },
            '.yourir-announcement-popup': {
                zIndex: '120'
            },
            // '[data-yourir="result"].yourir-success': {
            //     fontSize: '16px',
            //     lineHeight: '24px',
            //     fontWeight: '600',
            // color: '#08746B',
            // background: '#D6DCD6',
            // padding: '0.75rem 1rem',
            // },
            // '[data-yourir="result"].yourir-error': {
            //     fontSize: '16px',
            //     lineHeight: '24px',
            //     fontWeight: '600',
            // color: '#C82027',
            // background: '#eacbcc',
            // padding: '0.75rem 1rem',
            // },
            // '[data-yourir="result"].yourir-has-error': {
            //     fontSize: '16px',
            //     lineHeight: '24px',
            //     fontWeight: '600',
            // color: '#C82027',
            // background: '#eacbcc',
            // padding: '0.75rem 1rem',
            // }
        },
    }
});
