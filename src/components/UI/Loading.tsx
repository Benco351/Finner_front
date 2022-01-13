import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    marginTop: "45%",
  },
  color: {
    color: "var(--blue-color)",
  },
});

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.color} />
    </div>
  );
};
