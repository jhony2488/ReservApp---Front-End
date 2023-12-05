import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';

export const inputStyles = makeStyles((theme: Theme) => {
    return createStyles({
        search: {
            margin: '0'
        },
        input: {
            color: 'black !important',
            // background: theme.palette.primary.main,
        }
    });
});