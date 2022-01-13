import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Grid
      container
      justify="center"
      direction="row"
      alignContent="center"
      alignItems="center"
      style={{ fontSize: "1rem", height: "93vh", textAlign: "center" }}
    >
      <Grid
        item
        container
        direction="column"
        lg={12}
        className="pl-3 pr-3"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <img src={logo} alt="" className="mt-5" style={{ width: "400px" }} />
        <h1>
          <br></br>
          404 - Page Not Found{" "}
        </h1>
        <br></br>
        <br></br>
        Don't worry though, probably some crazy stock news just crashed the web.
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        Let's find out!
        <br></br>
        <Link to="/feed">
          <Button
            variant="outlined"
            style={{
              backgroundColor: "var(--orange-color)",
              textDecoration: "none",
            }}
            className="button mt-3"
          >
            MAIN{" "}
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        container
        lg={6}
        md={6}
        sm={12}
        xs={12}
        alignContent="center"
        justify="center"
      />
    </Grid>
  );
};
export default NotFound;
