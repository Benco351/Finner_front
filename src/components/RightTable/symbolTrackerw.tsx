import React, { useEffect, useState } from "react";
import StockTwits from "./StockTwitts/table";
import LatestNews from "./Tracker/table2";
import { companies } from "../../assets/text/companies";
import { QueryClient, QueryClientProvider } from "react-query";
import { FaSlideshare } from "react-icons/fa";
///Material ui////
import Tooltip from "@material-ui/core/Tooltip";
import { HiSwitchHorizontal } from "react-icons/hi";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
////Redux////
import { useSelector } from "react-redux";

const queryClient = new QueryClient();
const SymbolTracker = () => {
  const symbolsAndPrices = useSelector(
    (state: stateType) => state.userData.symbolsAndPrices
  );
  const [prices, setPrices] = useState<symbolAndPrice>();
  useEffect(() => {
    setPrices((prevState) => ({
      ...prevState,
      ...symbolsAndPrices,
    }));
  }, [symbolsAndPrices]);
  const [symbol, setSymbol] = useState("");
  const currentUser = useSelector((state: stateType) => state.user);
  const currentSymbol = useSelector(
    (state: stateType) => state.userData.currentSymbol
  );
  const [value, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    setSymbol(currentSymbol.symbol);
  }, [currentSymbol]);
  const [switchButton, setSwitchButton] = useState(false);
  const [priceChange, setPriceChange] = useState("");

  const tableHandler = () => {
    setSwitchButton((prevState) => !prevState);
  };
  useEffect(() => {
    const symbolString = symbol?.replace(".X", "-USD");
    if (prices && symbolString in prices) {
      return setPriceChange(prices[symbolString].percent.toString());
    }
    setPriceChange("");
  }, [symbol, currentUser, prices]);

  return (
    <Grid container justify="center">
      <Grid
        item
        container
        direction="row"
        justify="center"
        sm={10}
        className="mt-1"
      >
        {" "}
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
            setSymbol(newValue);
            // setName(names[options.indexOf(newValue)]);
            // setIndustry(industries[options.indexOf(newValue)]);
          }}
          size="small"
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={companies}
          style={{ width: "clamp(200px, 8vw, 250px)" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Symbol"
              variant="outlined"
              size="small"
            />
          )}
        />
        {!switchButton ? (
          <Tooltip title="Social media twits">
            <IconButton
              color="secondary"
              style={{ outline: "none", padding: 8 }}
              onClick={tableHandler}
            >
              <FaSlideshare />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Symbol - Latest news">
            <IconButton
              color="secondary"
              style={{ outline: "none", padding: 8 }}
              className="rotate"
              onClick={tableHandler}
            >
              <HiSwitchHorizontal />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      {switchButton ? (
        <QueryClientProvider client={queryClient}>
          <StockTwits symbolName={symbol} price={priceChange} />
        </QueryClientProvider>
      ) : (
        <LatestNews symbolName={symbol} price={priceChange} />
      )}
    </Grid>
  );
};
export default SymbolTracker;
