import { Grid } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import impactCard from "../../assets/images/impactCard.png";
import keyWordCard from "../../assets/images/keyWordCard.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  watchlist: {
    textDecoration: "underline",
    textDecorationColor: "var(--orange-color)",
    fontSize: "clamp(1.65rem, 5vw, 2.5rem)",
  },
  watchlistContent: {
    width: "90%",
    fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
    color: "rgb(180,180,180)",
  },
  keywordCrd: {
    boxShadow:
      "10px 10px 0px var(--main-color-regular),20px 20px 0px rgb(43,43,43)",

    width: "100%",
    height: "100%",
  },
  impactCard: {
    boxShadow:
      "-10px 10px 0px var(--main-color-regular),-20px 20px 0px rgb(43,43,43)",
    width: "100%",
    height: "75%",
  },
  slider: {
    color: "var(--purple-color)",
    width: "100%",
  },
  aiTitle: {
    textDecoration: "underline",
    textDecorationColor: "var(--purple-color)",
    fontSize: "clamp(1.65rem, 5vw, 2.5rem)",
  },
  aiContent: {
    width: "90%",
    fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
    color: "rgb(180,180,180)",
  },
});

export const Page2 = () => {
  const classes = useStyles();
  const valuetext = (value: number) => {
    return `${value}°C`;
  };

  return (
    <Grid
      item
      container
      lg={9}
      md={9}
      sm={9}
      xs={9}
      style={{ minHeight: "94vh" }}
      alignItems="center"
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        {" "}
        <h1
          className="text-center mt-2"
          style={{ fontSize: "clamp(1rem, 4.5vw, 2.5rem)" }}
        >
          Built to empower the retail trader
        </h1>
      </Grid>

      <Grid
        item
        lg={5}
        md={12}
        sm={12}
        xs={12}
        container
        className="center mt-4"
      >
        <h1 className={classes.watchlist}>Personal Watchlist</h1>
        <div className={`mt-3 ${classes.watchlistContent}`}>
          Track and follow your stocks and investments with our personal
          watchlist tool. The unique{" "}
          <span style={{ color: "var(--orange-color)" }}>Keywords list</span>{" "}
          feature allows you to completely cover your interests and get timely
          and accurate stock-market news.{" "}
        </div>
      </Grid>
      <Grid item lg={2} md={12} sm={12} xs={12}></Grid>
      <Grid
        item
        lg={5}
        md={12}
        sm={12}
        xs={12}
        container
        className="center mt-4"
      >
        <Grid item>
          <img
            src={keyWordCard}
            alt="loading..."
            className={`rounded ${classes.keywordCrd}`}
          />
        </Grid>
      </Grid>
      <Grid item lg={5} md={12} sm={12} xs={12} container>
        {" "}
        <Grid item className="hide-small center" style={{ marginTop: "13vh" }}>
          <Slider
            defaultValue={1}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            className={classes.slider}
            step={1}
            marks
            min={1}
            max={5}
          />
          <img
            src={impactCard}
            alt="loading..."
            className={`rounded ${classes.impactCard}`}
          />
        </Grid>
      </Grid>
      <Grid item lg={2} md={12} sm={12} xs={12}></Grid>
      <Grid
        item
        lg={5}
        md={12}
        sm={12}
        xs={12}
        container
        className="center"
        style={{ marginTop: "13vh" }}
      >
        <h1 className={classes.aiTitle}>Artificial Intelligence</h1>
        <div className={`mt-3 ${classes.aiContent}`}>
          Use an AI driven algorithm that measures{" "}
          <span style={{ color: "var(--purple-color)" }}>Impact</span> with an
          advanced technology to help you make faster and better decisions.{" "}
        </div>
      </Grid>
      <Grid item lg={5} md={12} sm={12} xs={12} justify="center" container>
        {" "}
        <Grid item className="hide-big center mt-4 ml-1">
          <Slider
            defaultValue={1}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            className={classes.slider}
            step={1}
            marks
            min={1}
            max={5}
          />
          <img
            src={impactCard}
            alt="loading..."
            className={`rounded ${classes.impactCard}`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
