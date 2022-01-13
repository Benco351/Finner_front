import React, { useEffect, useState } from "react";
import { StockTwitCard } from "./Tweets/TweetCard";
import { Loading } from "../../UI/Loading";
///Libraries////
import { useQuery } from "react-query";
import { PieChart } from "react-minimal-pie-chart";
///Material////
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Divider } from "@material-ui/core";

interface Props {
  symbolName: string;
  price: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    alert: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    divider: {
      width: "100%",
      height: "0.2ch",
      maxWidth: 500,
      marginTop: theme.spacing(3),
      backgroundColor: "theme.palette.background.paper",
    },
  })
);

const StockTwits: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const { symbolName, price } = props;
  const [bearishCounter, setBearishCounter] = useState(0);
  const [bullishCounter, setBullishCounter] = useState(0);
  const { isLoading, error, data } = useQuery(
    ["stockTwits", symbolName],
    () =>
      fetch(
        `https://fast-dusk-24130.herokuapp.com/https://api.stocktwits.com/api/2/streams/symbol/${symbolName}.json`
      ).then((res) => res.json()),
    {
      cacheTime: 1000,
      enabled: !!symbolName,
      // refetchInterval: 10000,
    }
  );

  useEffect(() => {
    if (data !== undefined) {
      let bearish = 0;
      let bullish = 0;
      data?.messages?.forEach((message: any) => {
        if (message.entities.sentiment !== null) {
          if (message.entities.sentiment.basic === "Bearish") {
            bearish = bearish++;
          } else if (message.entities.sentiment.basic === "Bullish") {
            bullish = bullish++;
          }
        }
      });
      setBearishCounter(bearish);
      setBullishCounter(bullish);
    }
  }, [data]);

  const mockData = [
    { title: "Bullish", value: bullishCounter, color: "var(--green-color)" },
    { title: "Bearish", value: bearishCounter, color: "var(--red-color)" },
    {
      title: "Natural",
      value: 30 - bullishCounter - bearishCounter,
      color: "#5A5F75",
    },
  ];

  const refreshHandler = () => {
    window.location.reload();
  };

  if (error)
    return (
      <Grid className={classes.alert} container justify="center">
        {" "}
        <Grid item sm={10} container justify="center">
          <Alert severity="error" className="mt-5">
            There is an error - try another symbol or refresh the page!
          </Alert>
          <button
            type="button"
            className="btn btn-default btn-sm mt-5"
            onClick={refreshHandler}
            style={{ backgroundColor: "white" }}
          >
            <span className="glyphicon glyphicon-refresh"></span> Refresh
          </button>
        </Grid>
      </Grid>
    );
  if (data?.response?.status === 404)
    return (
      <Grid className={classes.alert} container justify="center">
        {" "}
        <Grid item sm={10} container justify="center">
          <Alert severity="error" className="mt-5">
            There is an error - try another symbol or refresh the page!
          </Alert>
          <button
            type="button"
            className="btn btn-default btn-sm mt-5"
            onClick={refreshHandler}
            style={{ backgroundColor: "white" }}
          >
            <span className="glyphicon glyphicon-refresh"></span> Refresh
          </button>
        </Grid>
      </Grid>
    );

  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
      alignContent="center"
    >
      {isLoading || data === undefined ? (
        <div className="mt-5">
          <Loading />
        </div>
      ) : (
        <>
          <h5 className="mt-2 ml-3 ">
            <span style={{ fontSize: "0.9em" }}>{symbolName}</span>
            {price.length > 0 ? (
              <>
                {" "}
                {price?.includes("-") ? (
                  <span
                    style={{ color: "var(--red-color)", fontSize: "0.8em" }}
                  >
                    <ArrowDownwardIcon fontSize="small" className="mb-1 ml-2" />{" "}
                    {price} %
                  </span>
                ) : (
                  <span
                    style={{ color: "var(--green-color)", fontSize: "0.8em" }}
                  >
                    <ArrowUpwardIcon fontSize="small" className="mb-1 ml-2" />{" "}
                    {price} %{" "}
                  </span>
                )}
              </>
            ) : null}
          </h5>
          <div className="d-flex ">
            {" "}
            <ul
              className="d-flex flex-column mt-2 mr-2"
              style={{ fontSize: "12px" }}
            >
              <li style={{ color: "var(--red-color)" }}>Bearish</li>
              <li style={{ color: "var(--green-color)" }}>Bullish </li>{" "}
              <li className="text-secondary">Natural </li>{" "}
            </ul>
            <PieChart
              data={mockData}
              lineWidth={20}
              paddingAngle={18}
              rounded
              label={({ dataEntry }) => dataEntry.value}
              labelStyle={(index) => ({
                fill: mockData[index].color,
                fontSize: "17px",
                fontFamily: "sans-serif",
              })}
              labelPosition={60}
              style={{ width: "55px", height: "55px" }}
              className="mr-3 mt-1"
            />
          </div>
          <Divider className={classes.divider} />
          <Grid
            item
            container
            justify="center"
            spacing={2}
            style={{
              maxHeight: "58vh",
              marginTop: "28px",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            {data?.messages.map((tweet: any) => (
              <Grid item key={tweet.id} lg={11} md={9} sm={10} xs={10}>
                <StockTwitCard tweet={tweet} />
              </Grid>
            ))}
          </Grid>
        </>
      )}{" "}
    </Grid>
  );
};

export default StockTwits;
