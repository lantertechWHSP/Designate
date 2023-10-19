import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
const { Modal, Menu, Badge, Progress, Checkbox } = chakraTheme.components;

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
    whiteBlur2: 'rgba(255, 255, 255, 0.1)',
    ghostWhite: '#f8f8f8',

    darkGrey: '#848484',
    brownGrey: '#CBCBC5',

    lightGrey: '#c4c4c4',
    lightGrey2: '#DEE2E6',
    lightGrey2Blur: '#DEE2E666',


    positive: '#e8f1c8',
    negative: '#f9c9c8',

    error: '#f17674',
    errorText: '#fff4f4',

    success: '#93d490',
    successText: '#1b5318',
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
                }
            },
        },
        Text: {
            baseStyle: {
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
                },
                listLabel: {
                    color: 'darkBrownBlur',
                    fontSize: ['21px'],
                    fontWeight: 500,
                },
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
                    color: 'darkBrown',
                    background: 'transparent',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: 0,
                    mx: 2
                },
                tab: {
                    background: 'white',
                    width: '54px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: 'lightGrey2',
                    mx: '-1px'
                },
                menuButton: {
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid',
                    minWidth: ['200px', , '270px'],
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
                button: {
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'lightGrey2',
                    px: 4,
                    height: '50px',
                    textAlign: 'unset'
                },
                list: {
                    py: 1,
                    px: 0,
                    background: 'white',
                    border: '1px solid',
                    borderColor: 'lightGrey2',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
                    overflow: 'hidden',
                    padding: 0
                },
                item: {
                    height: '50px',
                    lineHeight: '50px',
                    textAlign: 'unset',
                    justifyContent: 'unset',
                    minWidth: ['200px', , '270px'],
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
        Checkbox: {
            ...Checkbox
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
            p: {
                mb: 4
            },
            blockquote: {
                borderLeft: `4px solid`,
                borderColor: 'darkBrownBlur',
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
            }
        },
    }
});
