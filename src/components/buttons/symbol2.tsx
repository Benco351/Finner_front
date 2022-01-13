import { useState, useEffect } from "react";

////Material////
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

///Redux///
import { setUserData } from "../../redux/slices/login";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  symbolName: string;
  color: string;
  showPrice?: boolean;
}

const useStyles = makeStyles({
  button: {
    borderRadius: "10px",
    fontSize: "0.75rem",
    position: "relative",
    height: "25px",
    width: "clamp(125px, 2vw, 135px)",
  },
  symbol: {
    position: "absolute",
    left: 10,
  },
  red: {
    color: "var(--red-color)",
    position: "absolute",
    right: 10,
  },
  green: {
    color: "var(--green-color)",
    position: "absolute",
    right: 10,
  },
});

interface symbolType {
  name: string;
  percent: number;
}

export const SymbolButton = (props: Props) => {
  const { symbolName, color, showPrice } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSymbol = { symbol: symbolName, show: true };
  const currentSymbolHandler = () => {
    dispatch(setUserData({ currentSymbol: showSymbol }));
  };
  const symbolsAndPrices = useSelector(
    (state: stateType) => state.userData.symbolsAndPrices
  );
  const [symbol, setSymbol] = useState<symbolType>({
    name: "",
    percent: 0,
  });

  useEffect(() => {
    if (showPrice !== false && symbolsAndPrices !== undefined) {
      setSymbol((prevState: any) => ({
        ...prevState,
        ...symbolsAndPrices[symbolName],
      }));
    }
  }, [symbolsAndPrices, showPrice, symbolName]);

  return (
    <Button
      style={{ border: `1px solid ${color}` }}
      className={classes.button}
      onClick={currentSymbolHandler}
    >
      <span className={classes.symbol}>{symbolName}</span>
      {showPrice !== false && (
        <span className={symbol.percent >= 0 ? classes.green : classes.red}>
          {Math.abs(symbol.percent)} %
        </span>
      )}
    </Button>
  );
};
