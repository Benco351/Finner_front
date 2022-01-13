import "./Landing.css";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page1 } from "../components/Landing/Page12";
import { Page2 } from "../components/Landing/Page22";
import { Page3 } from "../components/Landing/Page32";
import { Page4 } from "../components/Landing/Page42";

const useStyles = makeStyles({
  divider: {
    width: "75%",
    height: "0.1ch",
    backgroundColor: "var(--orange-color)",
  },
  root: {
    color: "rgb(210,210,210)",
    backgroundColor: "rgb(22,20,22)",
    marginTop: "30px",
  },
});

export const Home = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" spacing={2} className={classes.root}>
      <Page1 />
      <Divider className={classes.divider} />
      <Page2 />
      <Page3 />
      <Divider className={classes.divider} style={{ marginTop: "10px" }} />
      <Page4 />
    </Grid>
  );
};
