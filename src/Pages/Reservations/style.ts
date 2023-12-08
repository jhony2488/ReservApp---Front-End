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
    marginTop: '32px',
    fontSize: '32px',
    textAlign: 'center',
  },
  box:{
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    height: '100vh',
  },
  boxWrapper:{
    background: 'white',
    display: 'grid',
    padding: '16px',
    gap:'12px'
  },
  titleModal:{
    alignItem: 'center',
  },
  modal:{
    width: '50vw'
  },
  containerButtons:{
    display: 'flex',
    gap:'8px'
  },
  containerInput:{
    display: 'grid',
    gap: '4px'
  },
  errorMessage:{
    color: 'red',
    fontSize: '12px',
  }
}));

export default useStyles;