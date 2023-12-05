import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0F6FB7',
            dark: '#0F6FB7',
        },
        secondary: {
            main: '#94C120',
        },
        text: {
            primary: '#fff',
        },

    },
    overrides: {
        MuiStepIcon: {
            root: {
                '&$active': {
                    color: '#94C120',
                },
                '&$completed': {
                    color: '#94C120',
                },
            },
        },
        MuiStepLabel: {
            label: {
                '&$active': {
                    color: '#94C120',
                },
                '&$completed': {
                    color: '#94C120',
                },
            },
        },
        MuiButton: {
            outlined: {
                borderRadius: 0,
                padding: '8px 8px',
                textTransform: 'none',
            },
        },
        MuiInput: {
            input: {
                '&::placeholder': {
                    color: 'black'
                },
                color: 'black', // if you also want to change the color of the input, this is the prop you'd use
            }
        }
    },
    typography: {
        body1: {
            fontFamily: 'Roboto',
            textTransform: 'none',
            fontWeight: 'bold',
        },
        h2: {
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '0px 6px 14px rgba(24, 39, 75, 0.12)',
        },
        h3: {
            fontFamily: 'Roboto',

        },
        h4: {
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: '#333333',
        },
        h5: {
            fontFamily: 'Roboto',

        },
        h6: {
            fontFamily: 'Roboto',
            // textTransform: 'uppercase',
            fontWeight: 'bold',
        },
        subtitle1: {
            color: '#d3d3d3',
        },
    },
});

export default theme;
