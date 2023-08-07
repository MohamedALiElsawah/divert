import { fade } from '@material-ui/core/styles/colorManipulator';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import deco from 'enl-images/decoration/hexaMonochrome.svg';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
const rootWraper = {
  display: 'flex',
  width: '100%',
  zIndex: 1,
  position: 'relative'
};

const wrapper = theme => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  [theme.breakpoints.up('lg')]: {
    padding: `${theme.spacing(6)}px ${theme.spacing(20)}px`,
  },
});

const styles = theme => ({
  hint: {
    color: '#DC004E',

  },
  addAddress: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  root: {
    ...rootWraper
  },
  fullWidth: {
    width: '100%',

  },
  pointer: {
    cursor: 'pointer',
  },
  danger: {
    background: '#DC004E',
    color: '#fff',
    '&:hover': {
      background: '#DC004E',
    },
  },
  rootFull: {
    ...rootWraper,
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    },
  },

  sideWrap: {
    ...wrapper(theme),
    height: '100%',
    borderRadius: 0,
  },

  topBar: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
    '& $icon': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      marginBottom: theme.spacing(3),
    }
  },

  title: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: 32,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    }
  },

  btnArea: {
    display: 'flex',
    justifyContent: 'center',
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    fontSize: 12,
    '& $label': {
      fontSize: 12,
      '& span': {
        fontSize: 12
      }
    },
    '& button': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonProgress: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default styles;
