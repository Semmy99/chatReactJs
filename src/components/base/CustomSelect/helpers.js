import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '84%',
    maxWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
