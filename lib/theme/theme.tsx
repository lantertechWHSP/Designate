import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { fontGramatika, fontRoboto } from '~/app/_fonts';
import { radioTheme } from "~/lib/theme/formControls/radio";
const { Modal, Menu, Badge, Alert, Skeleton, Checkbox, Radio } = chakraTheme.components;

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

    charcoalBlur: 'rgba(28, 28, 28, 0.4)',
    charcoal: '#1c1c1c',
    charcoal2: '#1b2024',

    darkSteel: '#323639',

    olive: '#50513c',
    oliveBlur: 'rgba(80, 81, 60, 0.7)',
    oliveBlur2: 'rgba(80, 81, 60, 0.4)',
    oliveBlur3: 'rgba(80, 81, 60, 0.2)',
    oliveGrey: '#cbcbc5',

    stone: '#e4ddc1',
    forest: '#527535',
    spring: '#b0e70f',
    steelDark: '#3C596A',
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

    // error: '#ac3148',
    // errorText: '#fff4f4',

    successAlertBackground: '#00CE7D',
    successAlertText: '#f0fff9'
};

colors['borderColor'] = colors.lightGrey2;
colors['error'] = colors.rust;
colors['errorText'] = '#fff4f4';

colors['success'] = colors.spring;
colors['successText'] = '#93d490';

export const boxShadow:string = '0px 4px 10px 0px rgba(0, 0, 0, 0.10)';
export const tableOverflowMargin:any = ['-16px', '-24px', 0];
export const horizontalScrollMargin:any  = ['-16px', '-24px', '-32px', 0];
export const baseAnimationBezier:any = [0.215, 0.61, 0.355, 1];
export const zIndex:any = {
    carouselCommands: 10,
    featuredPosts: {
        slide: 10,
        arrows: 10,
        dots: 20
    },
    heroHeading: 10,
    menu: 30,
    tooltip: 50,
    header: 100,
    yourirPopup: 200,
    preview: 300
};

export const theme:any = extendBaseTheme({
    fonts: {
        heading: fontGramatika.style.fontFamily,
        body: fontGramatika.style.fontFamily,
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
                    fontWeight: 700,
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
                    lineHeight: [1.25],
                },
                sectionSubsubheading: {
                    color: 'steelDark',
                    fontSize: ['19px'],
                    fontWeight: 400,
                    lineHeight: [1.25],
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
                    color: 'oliveBlur2',
                    fontSize: ['18px', ,'21px'],
                    lineHeight: ['23px', ,'23px'],
                    fontWeight: 500,
                },
                h1: {
                    fontSize: ['26px', '30px', '36px'],
                    lineHeight: ['26px', '30px', '36px'],
                    fontWeight: 700,
                    mb: 8
                },
                h2: {
                    fontSize: ['22px', '24px', '28px'],
                    lineHeight: ['24px', '24px', '26px'],
                    fontWeight: 500,
                    mb: 8
                },
                h3: {
                    fontSize: ['21px', '21px', '21px'],
                    lineHeight: ['28px', '26px', '26px'],
                    fontWeight: 700,
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
                h5: {
                    fontSize: ['19px', '19px', '19px'],
                    lineHeight: ['26px', '26px', '26px'],
                    fontWeight: 500,
                    color: 'olive',
                    mb: 8
                },
                h6: {
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
                mb: 0,
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
                    color: 'steel',
                    fontSize: '16px',
                    lineHeight: '23px'
                },
                listLabel: {
                    color: 'oliveBlur2',
                    fontSize: ['18px', ,'21px'],
                    lineHeight: ['23px', ,'23px'],
                    fontWeight: 500,
                },
                label: {
                    fontSize: '16px',
                    color: 'darkSteel',
                    fontWeight: 500,
                }
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
                    color: 'olive',
                    height: ['40px', ,'50px'],
                    lineHeight: ['40px', ,'50px'],
                    borderRadius: ['20px', ,'25px'],
                    px: 4,
                    border: "2px solid",
                    borderColor: 'oliveBlur3',
                    textAlign: "center",
                    transition: "border-color 0.3s linear",
                    fontSize: ["16px"],
                    fontWeight: 700,
                    _hover: {
                        borderColor: 'olive'
                    }
                },
                pagination: {
                    color: 'olive',
                    background: 'transparent',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '50%',
                    p: 0,
                    mx: ['4px', 1, 2],
                    _hover: {
                        background: 'olive',
                        color: 'white',
                    },
                    _active: {
                        background: 'olive',
                        color: 'white',
                    }
                },
                paginationDirection: {
                    color: 'olive',
                    fontWeight: '500px',
                    fontSize: '16px',
                    _disabled: {
                        opacity: 0.5,
                        cursor: 'not-allowed'
                    }
                },
                tab: {
                    background: 'white',
                    width: ['54px', , , ,'64px'],
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
                    minWidth: ['200px', '220px', , '270px'],
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
                    padding: 0,
                    zIndex: zIndex.menu
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
                variant: 'basic'
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
                    tr: {
                        _last: {
                            td: {
                                borderBottom: '1px solid',
                                borderColor: 'charcoal',
                            }
                        }
                    },
                    th: {
                        fontSize: ['16px'],
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: 'steel',
                        borderBottom: '3px solid',
                        borderColor: 'borderColor',
                        py: 2,
                        pr: 2,
                        _last: {
                            pr: 0
                        }
                    },
                    td: {
                        py: 4,
                        fontSize: ['18px'],
                        fontWeight: 500,
                        borderBottom: '1px solid',
                        borderColor: 'borderColor',
                        color: 'charcoal',
                        pr: 2,
                        _last: {
                            pr: 0
                        }
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
        Skeleton: {
            ...Skeleton,
        },
        Alert: {
            ...Alert,
            variants: {
                error: {
                    container: {
                        color: 'errorText',
                        background: 'error'
                    }
                },
                success: {
                    container: {
                        color: 'successAlertText',
                        background: 'successAlertBackground'
                    }
                },
                successOlive: {
                    container: {
                        color: 'white',
                        background: 'olive',
                        justifyContent: 'center'
                    }
                }
            }
        },
        Input: {
            baseStyle: {
                field: {
                    height: '44px',
                    lineHeight: '46px',
                    color: 'charcoal',
                    px: 2,
                    border: '1px solid',
                    borderColor: 'charcoal',
                    borderRadius: '3px',
                    fontSize: '16px',
                    _invalid: {
                        color: 'error',
                        background: '#f1767422',
                        borderColor: 'error',
                    }
                }
            },
        },
        Checkbox: {
            ...Checkbox,
            variants: {
                checkbox: {
                    control: {
                        width: '20px',
                        height: '20px',
                        border: '1px solid',
                        borderRadius: '4px',
                        background: 'white',
                        _checked: {
                            background: 'white',
                            borderColor: 'forest',
                            color: 'forest',
                            _before: {
                                background: 'forest'
                            },
                            _hover: {
                                background: 'white',
                                borderColor: 'forest',
                            },
                            _disabled: {
                                opacity: 0.7,
                                borderColor: 'forest',
                            }
                        },
                        svg: {
                            width: '1.5em',
                            position: 'relative',
                            top: '-0.5px',
                            animation: 'none'
                        }
                    },
                    label: {
                        fontWeight: 400
                    }
                }
            }
        },
        Radio: {
            ...Radio,
            variants: {
                radio: {
                    control: {
                        width: '20px',
                        height: '20px',
                        border: '1px solid',
                        background: 'white',
                        _checked: {
                            background: 'white',
                            borderColor: 'forest',
                            _before: {
                                background: 'forest'
                            },
                            _hover: {
                                background: 'white',
                                borderColor: 'forest',
                            },
                            _disabled: {
                                opacity: 0.7,
                                borderColor: 'forest',
                            }
                        },
                        _disabled: {
                            opacity: 0.7,
                        }
                    },
                    _indeterminate: {
                        background: 'white',
                        borderColor: 'forest',
                    },
                    _focusVisible: {
                        boxShadow: 'none'
                    },
                    label: {
                        fontWeight: 400
                    }
                }
            }
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
                color: 'steelDark',
                background: 'ghostWhite',
                fontSize: '19px',
                lineHeight: '29px'
            },
            p: {
                mb: 6
            },
            blockquote: {
                borderLeft: `4px solid`,
                borderColor: 'oliveBlur2',
                pl: 8,
                mb: 4
            },
            ul: {
                ml: '14px',
                mb: 6,
                li: {
                    pl: '14px'
                },
                'li::marker': {
                    content: '"•"'
                }
            },
            ol: {
                ml: '24px',
                mb: 6,
                li: {
                    pl: '8px'
                }
            },
            'label.is-invalid': {
                color: colors.error
            },
            // YourIR
            '#yourir-default-announcement': {
                height: '0',
                overflow: 'hidden'
            },
            '.yourir-announcement-popup': {
                zIndex: zIndex.yourirPopup
            },
            '.yourir-chart': {
                fontFamily: fontRoboto.style.fontFamily,
            },
            '.yourir-chart-tooltip, .chart-tooltip': {
                fontSize: '14px',
                border: '0',
                borderRadius: '3px',
                px: 4,
                py: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: boxShadow,
                color: 'charcoal',
                minWidth: '190px'
            },
            'td.yourir-chart-tooltip-date-time': {
                fontWeight: 400
            },
            'table.yourir-chart-tooltip-legend': {
                margin: 0
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
