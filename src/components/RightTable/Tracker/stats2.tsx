import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
    },
    border: {
      border: "1px solid var(--main-color-light)",
    },
    description: {
      height: "75px",
      lineHeight: "25px",
    },
    button: {
      height: "30px",
      margin: "0px 0px 10px 0px",
      color: "var(--blue-color)",
      "&:hover": {
        opacity: 0.9,
        fontWeight: "bold",
        cursor: "pointer",
      },
    },
    span: {
      float: "right",
    },
  })
);
interface Props {
  data: any;
}

const Details = (props: Props) => {
  const classes = useStyles();
  const { data } = props;

  const [expanded, setExpanded] = useState(false);
  return (
    <div className={classes.root}>
      {!expanded ? (
        <p className={classes.description} style={{ overflow: "hidden" }}>
          {data?.description}
        </p>
      ) : (
        <p>{data?.description}</p>
      )}
      <div className={classes.button} onClick={() => setExpanded((ps) => !ps)}>
        {!expanded ? <>show more..</> : <>show less</>}
      </div>
      <Grid container spacing={2}>
        <Grid item lg={6} className={classes.border}>
          Average analyst rating:{" "}
          <span className={classes.span}>{data?.averageAnalystRating}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Market Cap: <span className={classes.span}>{data?.marketCap}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          50 Day average:{" "}
          <span className={classes.span}>
            {data?.fiftyDayAverage?.toFixed(2)}
          </span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Forward PE:{" "}
          <span className={classes.span}>{data?.forwardPE?.toFixed(2)}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          200 Day average:{" "}
          <span className={classes.span}>
            {data?.twoHundredDayAverage?.toFixed(2)}
          </span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Trailing PE:{" "}
          <span className={classes.span}>{data?.trailingPE?.toFixed(2)}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Eps current year:{" "}
          <span className={classes.span}>
            {data?.epsCurrentYear?.toFixed(2)}
          </span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Regular market volume:{" "}
          <span className={classes.span}>{data?.regularMarketVolume}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Eps Forward: <span className={classes.span}>{data?.epsForward}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Regular market day range:{" "}
          <span className={classes.span}>{data?.regularMarketDayRange}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Eps trailing 12 Months:{" "}
          <span className={classes.span}>
            {data?.epsTrailingTwelveMonths?.toFixed(2)}
          </span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Regular market previous close:{" "}
          <span className={classes.span}>
            {data?.regularMarketPreviousClose?.toFixed(2)}
          </span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Price to book:{" "}
          <span className={classes.span}>{data?.priceToBook?.toFixed(2)}</span>
        </Grid>
        <Grid item lg={6} className={classes.border}>
          Regular market day low:{" "}
          <span className={classes.span}>
            {data?.regularMarketDayLow?.toFixed(2)}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
