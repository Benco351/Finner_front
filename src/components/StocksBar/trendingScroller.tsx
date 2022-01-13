import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { setUserData } from "../../redux/slices/login";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "./infiniteScroll.css";
const useStyles = makeStyles({
  button: {
    fontSize: "0.75rem",
    width: "10%",
    minWidth: "80px",
  },
  red: {
    color: "var(--red-color)",
  },
  green: {
    color: "var(--green-color)",
  },
  marquee: {
    willChange: "width",
    height: "30px",
    width: "100%",
    // borderLeft: "1px solid #3d3d3d",
    // borderRight: "1px solid #3d3d3d",
    overflow: "hidden",
    "-webkit-box-sizing": "border-box",
    boxSizing: "border-box",
    position: "relative",
  },
  marqueeInner: {
    willChange: "width, animation",
    display: "block",
    width: "200%",
    position: "absolute",
    "-webkit-animation": "marquee 20s linear infinite",
    animation: "marquee 20s linear infinite",
    "&:hover": {
      "-webkit-animation-play-state": "paused",
      "animation-play-state": "paused",
    },
  },
  span: {
    willChange: "width",
    float: "left",
    width: "50%",
  },
});

const TrendingScroll = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { red, green } = classes;
  const symbolsAndPrices = useSelector(
    (state: stateType) => state.userData.symbolsAndPrices
  );

  const trendingSymbols = useSelector(
    (state: stateType) => state.userData.trendingSymbols
  );

  const currentSymbolHandler = (symbol: string) => {
    dispatch(setUserData({ currentSymbol: { symbol, show: true } }));
  };
  const [prices, setPrices] = useState<symbolAndPrice>();
  const [trendingWithPrice, setTrendingWithPrice] = useState<string[]>([]);
  useEffect(() => {
    setPrices((ps) => ({
      ...ps,
      ...symbolsAndPrices,
    }));
  }, [symbolsAndPrices]);

  useEffect(() => {
    const symbols = trendingSymbols
      .filter((symbol: string) => prices?.hasOwnProperty(symbol))
      .slice(0, 10);
    setTrendingWithPrice(symbols);
  }, [trendingSymbols, prices]);

  const button = (symbol: string) => {
    return (
      <Button
        key={symbol}
        className={classes.button}
        onClick={() => currentSymbolHandler(symbol)}
      >
        <span style={{ marginRight: "5px" }}>
          {" "}
          {symbol.includes("-")
            ? `${symbol.substring(0, symbol.indexOf("-"))}`
            : `${symbol}`}
        </span>
        {prices && symbol in prices && (
          <span className={prices[symbol].percent < 0 ? red : green}>
            {prices[symbol].percent}%
          </span>
        )}
      </Button>
    );
  };

  return (
    <div className={classes.marquee}>
      <div className={classes.marqueeInner}>
        <span className={classes.span}>
          {trendingWithPrice?.map((symbol: string) => button(symbol))}
        </span>
        <span className={classes.span}>
          {trendingWithPrice?.map((symbol: string) => button(symbol))}
        </span>
      </div>
    </div>
  );
};
export default TrendingScroll;
