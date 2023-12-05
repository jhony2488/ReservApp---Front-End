import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuClose:{
    position: 'fixed',
    'z-index': '9999',
    width: '48px',
    right: 14,
    top: '1%'
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    display: 'flex',
    gap: '25px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    'list-style': 'none',
    transition: 'transform 1s ease-out',
    marginLeft: '-2%',
    '@media (max-width: 760px)': {
      alignItems: 'right',
      flexDirection: 'column',
      position: 'fixed',
      'z-index': '999',
      paddingTop: '20%',
      width: '100%',
      height: '100vh',
      background: 'black',
      top: '-2%',
      left: '-8%',
      justifyContent: 'flex-start',
    },
  },
 
  itemNav: {
    'text-align': 'center',
    transition: 'transform 1s ease-out',
    '&:hover': {
        transform: 'scale(1.2)',
      },
  },
  linkNav: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
  
    '@media (max-width: 760px)': {
      fontSize: '38px',
    },
  },
}));

export default useStyles;
