import { useEffect } from "react";
import TrendingScroll from "../components/StocksBar/trendingScroller";
import Indexes from "../components/StocksBar/indexes";
import { RightTable } from "../components/RightTable/table2";
import { LeftTable } from "../components/LeftTable/table2";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/login";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import { serverUrl } from "../assets/text/urls";
const useStyles = makeStyles({
  root: {
    boxSizing: "content-box",
    width: "99%",
    height: "calc(100vh - 60px)",
    margin: "0 auto",
  },
  trending: {
    backgroundColor: "var(--main-color-dark-inner)",
    height: "10%",
  },
  leftTable: {
    overflow: "hidden",
    border: "1px solid var(--main-color-light)",
    borderRadius: "4px",
    height: "100%",
    marginTop: "2rem",
  },
  rightTable: {
    backgroundColor: "var(--main-color-regular)",
    border: "1px solid var(--main-color-light)",
    // boxShadow: "2px 2px 4px rgba(200, 200, 200, 0.5)",
    borderRadius: "4px",
    maxWidth: "100vw",
    height: "100%",
    marginTop: "2rem",
  },
});

interface socketData {
  updatedPrices: symbolAndPrice;
  marketTimes: {
    isMarketOpen: boolean;
    isTradingHours: boolean;
  };
  trendingSymbols: string[];
}

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = socketIOClient(serverUrl);
    socket.on("new-article", (newArticle: Tweet) =>
      dispatch(setUserData({ latestNews: newArticle }))
    );
    socket.on("updated-prices", (data: socketData) => {
      dispatch(
        setUserData({
          symbolsAndPrices: data.updatedPrices,
          isMarketOpen: {
            marketIsOpen: data.marketTimes.isMarketOpen,
            tradingHours: data.marketTimes.isTradingHours,
          },
          trendingSymbols: data.trendingSymbols,
        })
      );
    });
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          lg={7}
          md={12}
          className={classes.leftTable}
          container
          direction="row"
        >
          <TrendingScroll />
          <LeftTable />
        </Grid>
        <Grid item lg={5} md={12} className={classes.rightTable}>
          <Indexes />
          <RightTable />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};
export default Main;
