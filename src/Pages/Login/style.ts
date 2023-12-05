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
    height: '100%',
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
  containerButtons:{
    display: 'grid',
    gap:'8px',
    marginTop: '12px'
  }
}));

export default useStyles;