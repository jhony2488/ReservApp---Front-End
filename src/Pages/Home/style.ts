import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  main: {

  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: '40px',
    fontSize: '32px',
    textAlign: 'center',
  },
  box:{
    display: 'flex',
    flexDirection: 'column',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    height: '100%',
    paddingBottom: '40px',
  },
  boxWrapper:{
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
    '@media (max-width: 760px)': {
        width: '90%',
      }
  },
  containerInput:{
    display: 'grid',
    gap: '4px'
  },
  titleModal:{
    alignItem: 'center',
  },
  containerButtons:{
    display: 'grid',
    gap:'8px',
    marginTop: '10px'
  },
  errorMessage:{
    color: 'red',
    fontSize: '12px',
  }
}));

export default useStyles;