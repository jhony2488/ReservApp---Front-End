import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core';

export const searchStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            marginTop: '20px',
            display: 'grid',
            'justify-items': 'center',
            paddingBottom: '30px'
        },
        card: {
            marginTop: '16px',
            display: 'grid',
            'justify-items': 'center',
            'max-width': '300px',
            'align-content': 'center',
            paddingBottom: '8px',
        },
        textContent: {
            'font-size': '12px',
            marginTop: '8px',
            textAlign: 'center'
        },
        textNotIncentives: {
            marginTop: '16px',
        },
        spanTextContent: {
            marginTop: '8px',
        },
        cardContent:{
            display: 'grid',
            'justify-items': 'center',
            'align-items': 'center',
            gridTemplateColumns:'2.5fr 1fr'
        },
    });
});