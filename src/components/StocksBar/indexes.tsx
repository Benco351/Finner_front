import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  button: {
    width: "clamp(60px, 8vw, 140px)",
    height: "25px",
    color: "white",
    fontSize: "0.7rem",
  },
  red: {
    color: "var(--red-color)",
    marginLeft: "10px",
  },
  green: {
    color: "var(--green-color)",
    marginLeft: "10px",
  },
  background: {
    backgroundColor: "var(--main-color-dark-inner)",
    height: "25px",
  },
});

const Indexes = () => {
  const classes = useStyles();
  const symbolsAndPrices = useSelector(
    (state: stateType) => state.userData.symbolsAndPrices
  );
  const marketTime = useSelector(
    (state: stateType) => state.userData.isMarketOpen
  );
  const [prices, setPrices] = useState<symbolAndPrice>();
  const [indexes, setIndexes] = useState(["^GSPC", "^DJI", "^IXIC", "^VIX"]);
  const indexNames = ["S&500", "DOW", "NASDAQ", "VIX"];
  useEffect(() => {
    setPrices((prevState) => ({
      ...prevState,
      ...symbolsAndPrices,
    }));
  }, [symbolsAndPrices]);
  useEffect(() => {
    if (marketTime.tradingHours === true) {
      setIndexes(["^GSPC", "^DJI", "^IXIC", "^VIX"]);
    } else {
      setIndexes(["ES=F", "YM=F", "NQ=F", "^VIX"]);
    }
  }, [marketTime]);

  const color = (number: number) => {
    if (number < 0) {
      return classes.red;
    } else {
      return classes.green;
    }
  };

  return (
    <Grid
      item
      container
      direction="row"
      className={classes.background}
      justify="space-evenly"
      alignItems="center"
    >
      {prices &&
        indexes.map((name, index) => (
          <Button className={classes.button} key={name}>
            {indexNames[index]}
            <span className={color(prices[name]?.percent)}>
              {prices[name]?.percent} %
            </span>
          </Button>
        ))}
    </Grid>
  );
};
export default Indexes;
