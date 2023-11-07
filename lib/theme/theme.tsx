import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
const { Modal, Menu, Badge, Alert } = chakraTheme.components;

export const breakpoints:any = {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
};

const colors:any = {
    white: '#ffffff',
    whiteBlur: 'rgba(255, 255, 255, 0.6)',
    whiteBlur2: 'rgba(255, 255, 255, 0.2)',
    ghostWhite: '#f8f8f8',
    ghostWhiteBlur: 'rgba(248, 248, 248, 0.7)',

    charcoal: '#1c1c1c',
    charcoalBlur: 'rgba(28, 28, 28, 0.4)',
    charcoal2: '#1b2024',

    darkSteel: '#323639',

    olive: '#50513c',
    oliveBlur: 'rgba(80, 81, 60, 0.4)',
    oliveBlur2: 'rgba(80, 81, 60, 0.2)',
    oliveGrey: '#cbcbc5',

    stone: '#e4ddc1',
    forest: '#527535',
    spring: '#b0e70f',
    steel: '#667085',
    plum: '#673148',
    rust: '#ac3148',
    sky: '#0078ac',
    deepStone: '#9e9b89',

    lightGrey: '#c4c4c4',
    lightGrey2: '#dee2e6',
    lightGrey2Blur: '#dee2e666',
    lightGrey3Blur: '#d9d9d933',

    grey: '#848484',

    positive: '#e8f1c8',
    negative: '#f9c9c8',

    positiveDot: '#00CE7D',
    negativeDot: '#ea4743',

    error: '#ac3148',
    errorText: '#fff4f4',
};

colors['borderColor'] = colors.lightGrey2;
colors['error'] = colors.rust;
colors['errorText'] = '#fff4f4';

colors['success'] = colors.spring;
colors['successText'] = '#93d490';

export const boxShadow:string = '0px 4px 10px 0px rgba(0, 0, 0, 0.10)';

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
    breakpoints: {
        ...breakpoints
    },
    colors: {
        ...colors
    },
    sizes: {

    },
    components: {
        Modal,
        Heading: {
            baseStyle: {
                color: 'charcoal',
                fontWeight: 500
            },
            variants: {
                hero: {
                    fontSize: ['50px', '56px', '72px'],
                    fontWeight: 500,
                    lineHeight: ['46px', '60px', '68px'],
                    letterSpacing: ['-0.75px'],
                    color: 'white'
                },
                defaultLayoutTitle: {
                    fontSize: ['46px', '56px', '64px'],
                    fontWeight: 500,
                    lineHeight: [1.1],
                    letterSpacing: ['-0.75px']
                },
                sectionHeading: {
                    color: 'charcoal',
                    fontSize: ['32px', ,'40px'],
                    lineHeight: [1.25],
                    fontWeight: 700,
                },
                sectionSubheading: {
                    color: 'charcoal',
                    fontSize: ['26px', ,'28px'],
                    lineHeight: [1.2],
                },
                listItem: {
                    fontSize: ['18px', ,'21px'],
                    lineHeight: ['23px', ,'23px'],
                    fontWeight: 500,
                    color: 'olive',
                    transition: 'color 0.3s linear',
                    _hover: {
                        color: 'charcoal'
                    },
                    a: {
                        color: 'olive',
                        transition: 'color 0.3s linear',
                        _hover: {
                            color: 'charcoal'
                        }
                    }
                },
                listLabel: {
                    color: 'oliveBlur',
                    fontSize: ['18px', ,'21px'],
                    lineHeight: ['23px', ,'23px'],
                    fontWeight: 500,
                },
                h1: {
                    fontSize: ['21px', '24px', '28px'],
                    lineHeight: ['21px', '24px', '26px'],
                    fontWeight: 700,
                    mb: 8
                },
                h2: {
                    fontSize: ['21px', '24px', '28px'],
                    lineHeight: ['21px', '24px', '26px'],
                    fontWeight: 500,
                    mb: 8
                },
                h3: {
                    fontSize: ['21px', '21px', '21px'],
                    lineHeight: ['26px', '26px', '26px'],
                    fontWeight: 500,
                    color: 'olive',
                    mb: 8
                },
                h4: {
                    fontSize: ['19px', '19px', '19px'],
                    lineHeight: ['26px', '26px', '26px'],
                    fontWeight: 500,
                    color: 'olive',
                    mb: 8
                },
            },
        },
        Text: {
            baseStyle: {
            },
            variants: {
                sectionDescription: {
                    fontSize: ['18px'],
                    lineHeight: ['28px'],
                    color: 'steel'
                },
                error: {
                    color: 'error'
                },
                caption: {
                    fontSize: '14px'
                },
                annotation: {
                    color: 'charcoalBlur',
                    fontSize: '16px'
                },
                listLabel: {
                    color: 'oliveBlur',
                    fontSize: ['18px', ,'21px'],
                    lineHeight: ['23px', ,'23px'],
                    fontWeight: 500,
                },
            }
        },
        Code: {
            baseStyle: {
                fontFamily: `'Menlo', sans-serif`,
                border: '1px dashed',
                borderColor: 'borderColor',
                borderRadius: 0
            },
        },
        Container: {
            baseStyle: {
                maxW: '1400px',
                margin: '0 auto',
                px: ['16px', '24px', '32px'],
            },
        },
        Link: {
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
                },
            }
        },
        Button: {
            baseStyle: {
            },
            variants: {
                button: {
                    height: '50px',
                    lineHeight: '50px',
                    px: 4,
                    color: 'olive',
                    fontSize: '16px',
                    fontWeight: 500
                },
                pagination: {
                    color: 'olive',
                    background: 'transparent',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: 0,
                    mx: 2
                },
                paginationDirection: {
                    color: 'olive',
                    fontWeight: '500px',
                    fontSize: '16px'
                },
                tab: {
                    background: 'white',
                    width: '64px',
                    height: '44px',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    border: '1px solid',
                    borderColor: 'borderColor',
                    mx: '-1px'
                },
                menuButton: {
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid',
                    fontSize: '16px',
                    minWidth: ['200px', , '270px'],
                    borderColor: 'borderColor',
                    px: 4,
                    height: '50px',
                    textAlign: 'unset',
                    _hover: {
                        borderColor: 'charcoal'
                    },
                    _active: {
                        borderColor: 'charcoal'
                    }
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
                button: {
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'borderColor',
                    px: 4,
                    height: '50px',
                    textAlign: 'unset'
                },
                list: {
                    py: 1,
                    px: 0,
                    background: 'white',
                    border: '1px solid',
                    borderColor: 'borderColor',
                    borderRadius: '8px',
                    boxShadow: boxShadow,
                    overflow: 'hidden',
                    padding: 0
                },
                item: {
                    height: '50px',
                    lineHeight: '50px',
                    textAlign: 'unset',
                    justifyContent: 'unset',
                    fontSize: '16px',
                    minWidth: ['200px', , '270px'],
                    px: 4,
                    color: 'charcoal',
                    _focus: {
                        background: 'lightGrey2Blur'
                    }
                }
            }
        },
        Divider: {
            baseStyle: {
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'borderColor',
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
                },
                tr: {
                    _last: {
                        td: {
                            borderBottom: '1px solid',
                            borderColor: 'charcoal',
                        }
                    }
                }
            },
            variants: {
                basic: {
                    th: {
                        fontSize: ['16px'],
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: 'steel',
                        borderBottom: '2px solid',
                        borderColor: 'borderColor',
                        py: 2
                    },
                    td: {
                        py: 4,
                        fontSize: ['18px'],
                        borderBottom: '1px solid',
                        borderColor: 'borderColor',
                        color: 'charcoal'
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
                fontSize: '16px',
                px: '16px',
                background: 'lightGrey3Blur',
                color: 'olive'
            },
        },
        Alert: {
            ...Alert,
            // defaultProps: {
            //     fontSize: '16px'
            // }
            // ...Alert,
            // baseStyle: {
            //     container: {
            //         fontSize: '16px',
            //     },
            //     title: {
            //         fontSize: '16px',
            //     },
            //     description: {
            //         fontSize: '16px',
            //     }
            // }
        }
    },
    styles: {
        global: {
            '*:focus': {
                outline: 0,
            },
            '*:focus-visible': {
                outline: 0
            },
            body: {
                color: 'steel',
                fontSize: '19px',
                lineHeight: '29px'
            },
            p: {
                mb: 6
            },
            blockquote: {
                borderLeft: `4px solid`,
                borderColor: 'oliveBlur',
                pl: 8,
                mb: 4
            },
            ul: {
                ml: '14px',
                mb: 8,
                li: {
                    pl: '14px'
                },
                'li::marker': {
                    content: '"•"'
                }
            },
            ol: {
                ml: '20px',
                mb: 8,
                li: {
                    pl: '8px'
                }
            },
            // YourIR
            '#yourir-default-announcement': {
                height: '0',
                overflow: 'hidden'
            },
            '.yourir-announcement-popup': {
                zIndex: '120'
            },
            // Render horizonal scroll
            '.horizonalScroll::-webkit-scrollbar': {
                WebkitAppearance: 'none',
                height: '7px'
            },
            '.horizonalScroll::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                boxShadow: '0 0 1px rgba(255, 255, 255, .5)',
            },
            '[data-yourir="result"]': {
                display: 'block',
                width: '100%',
                height: '40px',
                lineHeight: '40px',
                m: 0,
                px: 2,
            },
            'input[type=text].yourir-has-error': {
                borderColor: 'error',
                background: '#f1767422',
                color: 'error'
            },
            '[data-yourir="result"].yourir-has-error': {
                background: 'error',
                color: 'errorText',
            },
            '[data-yourir="result"].yourir-success': {
                background: 'success',
                color: 'successText'
            },
            // Chakra Alert
            '[role="alert"]': {
                fontSize: ['16px']
            }
        },
    }
});
