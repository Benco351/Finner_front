import { Grid } from "@material-ui/core";
import { Content } from "../assets/text/disclaimer";
const Disclaimer = () => {
  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignContent="center"
      alignItems="center"
    >
      <h1 className="mt-5" style={{ textAlign: "center" }}>
        <span style={{ color: "var(--orange-color)" }}>Finner.</span>
        <br></br>
        Disclaimer{" "}
      </h1>

      <Content />
    </Grid>
  );
};
export default Disclaimer;
