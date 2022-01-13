import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  tweetCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: theme.spacing(3 / 2),
  },
  topRightSection: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
   justifyContent: 'space-between',
    display: 'flex',
  },
  divider: {
    marginTop: 6,
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: 'rgb(31,31,31)',
  },
  tweetBody: {
    overflowWrap: 'break-word',
  },
}));

export default styles;
