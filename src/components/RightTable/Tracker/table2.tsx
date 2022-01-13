import { useEffect, useState, useCallback } from "react";
import { Loading } from "../../UI/Loading";
import { TwitterCard } from "../../LeftTable/socialCard2";
import axios from "axios";
import { serverUrl } from "../../../assets/text/urls";
import { TradingViewApp } from "../../TradingView";
import Details from "./stats2";
///Material/////
import { Button, Grid } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { v4 as key } from "uuid";

//////other////
import { useSelector } from "react-redux";
import { ButtonGroup } from "react-bootstrap";
interface Props {
  symbolName: string;
  price: string;
}

const LatestArticles = (props: Props) => {
  const { symbolName, price } = props;
  const user = useSelector((state: stateType) => state.user);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const setPrice = useCallback(
    (pricesAndDates: any) => {
      if (pricesAndDates?.length !== 0 && pricesAndDates !== undefined) {
        if (pricesAndDates[pricesAndDates?.length - 1]?.price === undefined) {
          pricesAndDates[pricesAndDates?.length - 1].price = (
            pricesAndDates[pricesAndDates.length - 2]?.price *
              (parseFloat(price) / 100) +
            pricesAndDates[pricesAndDates.length - 2]?.price
          ).toFixed(2);
        }
      }
    },
    [price]
  );

  const sendRequest = useCallback(async () => {
    try {
      const { data }: any = await axios.post(`${serverUrl}/news/symbol`, {
        symbol: symbolName,
        token: user.token,
      });
      const articles = data.feed;
      setData(data.data);
      setPrice(data.chartData);
      if (articles?.length > 0) {
        setArticles(articles.reverse());
      }
      if (articles?.length === 0) {
        setError("No relevant news.");
      }
      setLoading(false);
    } catch (err) {
      setError("There is a problem, try to refresh the page.");
      setLoading(false);
    }
  }, [setPrice, user.token, symbolName]);

  useEffect(() => {
    sendRequest();
  }, [symbolName, sendRequest]);

  if (loading)
    <div className="mt-5">
      <Loading />
    </div>;

  if (error.length > 0)
    <div className="text-center mt-5">
      <p style={{ color: "var(--grey-color)" }}>{error}</p>{" "}
    </div>;

  if (articles?.length === 0)
    <div className="text-center">
      <p>No relevant news found</p>{" "}
    </div>;

  return (
    <Grid
      container
      justify="center"
      className="overflow-scroll"
      style={{ maxHeight: "82vh", overflowX: "hidden" }}
    >
      <Grid
        lg={10}
        item
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ flex: 33 }}>
          <ButtonGroup>
            <Button
              style={{
                borderRight: "1px solid grey",
                borderRadius: "1px",
                color: chart ? "var(--green-color)" : "white",
              }}
              onClick={() => setChart((ps) => !ps)}
            >
              Chart
            </Button>
            <Button
              style={{ color: !chart ? "var(--green-color)" : "white" }}
              onClick={() => setChart((ps) => !ps)}
            >
              Info
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ flex: 33 }}>
          <h5 className="mt-1 ml-3 text-center ">
            <span style={{ fontSize: "0.9em" }}>{symbolName}</span>
            {price.length > 0 ? (
              <>
                {" "}
                <span
                  style={{
                    color: price?.includes("-")
                      ? "var(--red-color)"
                      : "var(--green-color)",
                    fontSize: "0.8em",
                  }}
                >
                  {price?.includes("-") ? (
                    <ArrowDownwardIcon fontSize="small" className="mb-1 ml-2" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" className="mb-1 ml-2" />
                  )}
                  {price} %
                </span>
              </>
            ) : null}
          </h5>
        </div>
        <div style={{ flex: 33 }}></div>
      </Grid>{" "}
      <div>
        {chart ? (
          <TradingViewApp stock={symbolName} />
        ) : (
          <Details data={data} />
        )}
        <h6 className="text-center"> Latest News</h6>
        <Grid
          container
          spacing={2}
          justify="center"
          className="mt-2"
          style={{
            wordBreak: "break-word",
          }}
        >
          {articles?.length > 0 &&
            articles.map((article: any) => (
              <Grid item key={key()} lg={11} md={10} sm={10} xs={10}>
                {article?.text && (
                  <TwitterCard
                    tweet={article}
                    showSymbol={false}
                    color={"var(--main-color-light-inner)"}
                  />
                )}
              </Grid>
            ))}
        </Grid>
      </div>
    </Grid>
  );
};

export default LatestArticles;
