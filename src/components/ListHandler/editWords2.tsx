import React, { useState, useEffect } from "react";
import { companies } from "../../assets/text/companies";
import { commonWords } from "../../assets/text/commonWords";
/////Material/////
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LayersIcon from "@material-ui/icons/Layers";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Alert } from "react-bootstrap";
///Redux///
import { useDispatch, useSelector } from "react-redux";
import { editListHandler } from "../../redux/slices/userLists";
import { setLists } from "../../redux/slices/userLists";
import { setUserData } from "../../redux/slices/login";
import { getWatchListHandler } from "../../redux/slices/watchListNews";

export const EditWords = () => {
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
  const currentUser = useSelector((state: stateType) => state.user);
  const watchLists = useSelector((state: stateType) => state.watchLists);
  const dispatch = useDispatch();
  const [watchList, setWatchList] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [word, setWord] = useState("");
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState<string | null>();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setWatchList(watchLists.currentList.words);
    setShow(false);
  }, [watchLists.currentList.words]);

  const handleNewKeyword = (e: any) => {
    const word = e.currentTarget.value.toLocaleLowerCase();
    if (e.currentTarget.value.toLocaleLowerCase().length === 0) {
      setError("");
    }
    setWord(word);
  };

  const editListAction = () => {
    if (error.length === 0) {
      const newList = {
        oldTitle: watchLists.currentList.title,
        newTitle: watchLists.currentList.title,
        words: watchList,
        email: currentUser.email,
        token: currentUser.token,
      };

      dispatch(editListHandler(newList));
    }
  };

  const newSymbolHandler = () => {
    setError("");
    setShow(true);
    if (!/[^A-Z]/.test(symbol)) {
      if (symbol.length < 6 && symbol.length > 0) {
        if (watchList.includes(symbol.toUpperCase()) === false) {
          setWatchList((prevState) => [symbol, ...prevState]);
        } else {
          setError("Symbol already exists.");
        }
      } else {
        setError("Only 2-5 characters are allowed.");
      }
    } else {
      setError("Only A-Z letters are allowed.");
    }
  };
  const newKeywordHandler = () => {
    setError("");
    setShow(true);
    if (!/[^a-zA-Z1-9]/.test(word)) {
      if (word.length > 1 && word.length < 13) {
        if (watchList.includes(word) === false) {
          if (commonWords.includes(word.toLowerCase()) === false) {
            setWatchList((prevState) => [word, ...prevState]);
          } else {
            setError("Common words are not allowed.");
          }
        } else {
          setError("Keyword already exists.");
        }
      } else {
        setError("Only 2-12 are allowed.");
      }
    } else {
      setError("Only a-z , 0-9 are allowed.");
    }
  };

  const removeWord = (element: string) => {
    setWatchList(
      watchList.filter((word) => {
        return word !== element;
      })
    );
    setShow(true);
  };

  const setSymbolHandler = (symbol: string) => {
    let showSymbol = { symbol, show: true };
    dispatch(setUserData({ currentSymbol: showSymbol }));
  };

  const watchListHandler = () => {
    setWatchList(watchLists.watchLists.words);
    setShow(false);
  };

  const handleSearchOptions = (option: "words" | "symbols") => {
    if (option === "words") {
      dispatch(
        setLists({
          watchListSearch: {
            words: !watchLists.watchListSearch.words,
            symbols: watchLists.watchListSearch.symbols,
          },
        })
      );
    } else {
      dispatch(
        setLists({
          watchListSearch: {
            words: watchLists.watchListSearch.words,
            symbols: !watchLists.watchListSearch.symbols,
          },
        })
      );
    }
    dispatch(
      getWatchListHandler({
        token: currentUser.token,
        watchListSearch: watchLists.watchListSearch,
        currentList: watchLists.currentList,
      })
    );
  };

  return (
    <Grid container>
      <Grid
        item
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        direction="column"
        style={{ width: "100%" }}
      >
        <Tooltip
          title="Select watchlist first"
          disableHoverListener={watchLists.watchLists.title !== ""}
          disableFocusListener={watchLists.watchLists.title !== ""}
          disableTouchListener={watchLists.watchLists.title !== ""}
        >
          <Grid
            item
            container
            justify="space-evenly"
            alignItems="center"
            direction="row"
          >
            <TextField
              autoFocus
              style={{ width: "60%", height: "40px" }}
              margin="dense"
              placeholder="Keywords"
              color="secondary"
              type="text"
              disabled={watchLists.watchLists.title === ""}
              onChange={(e) => {
                handleNewKeyword(e);
              }}
            />
            <IconButton
              onClick={newKeywordHandler}
              disabled={watchLists.watchLists.title === ""}
              style={{
                padding: 3,
                borderRadius: "50%",
              }}
              className="ml-3"
            >
              <PlaylistAddIcon style={{ height: "20px", width: "20px" }} />
            </IconButton>
            <div className="mt-1">
              <Checkbox
                checked={watchLists.watchListSearch.words}
                onChange={() => handleSearchOptions("words")}
                size="small"
              />
            </div>
          </Grid>
        </Tooltip>
        <Paper
          style={{
            backgroundColor: "rgb(31,31,31)",
            width: "100%",
            height: "100px",
            padding: 7,
          }}
          className="overflow-auto"
        >
          {watchLists.watchLists.title !== "" &&
            watchList?.map((string: string) => {
              if (string.charAt(0).toUpperCase() !== string.charAt(0)) {
                return (
                  <div
                    key={string}
                    className="ml-1"
                    style={{
                      color: "white",
                      minWidth: "95%",
                      display: "flex",
                      justifyContent: "space-between",
                      height: "25px",
                    }}
                  >
                    {" "}
                    {string.length > 12 ? string.slice(0, 11) + ".." : string}
                    <IconButton
                      style={{
                        outline: "none",
                        padding: 2,
                        color: "rgb(160,160,160)",
                      }}
                      onClick={() => removeWord(string)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </Paper>
      </Grid>
      <Grid
        item
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid
          item
          container
          justify="space-evenly"
          alignItems="center"
          alignContent="center"
          direction="row"
        >
          <div className="d-flex flex-row">
            <Tooltip
              title="Select watchlist first"
              disableHoverListener={watchLists.watchLists.title !== ""}
              disableFocusListener={watchLists.watchLists.title !== ""}
              disableTouchListener={watchLists.watchLists.title !== ""}
            >
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: any) => {
                  setValue(newValue);
                  setSymbol(newValue);
                }}
                disabled={watchLists.watchLists.title === ""}
                size="small"
                inputValue={inputValue}
                onInputChange={(event: any, newInputValue: any) => {
                  setInputValue(newInputValue);
                }}
                options={companies}
                style={{
                  width: "120px",
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label="Symbol"
                    autoFocus
                    margin="dense"
                    disabled={watchLists.watchLists.title === ""}
                    className="mb-1"
                    color="secondary"
                  />
                )}
              />
            </Tooltip>
            <Grid item>
              {" "}
              <IconButton
                onClick={newSymbolHandler}
                disabled={watchLists.watchLists.title === ""}
                style={{
                  padding: 3,
                  borderRadius: "50%",
                }}
                className="mt-4 ml-3"
              >
                <PlaylistAddIcon style={{ height: "20px", width: "20px" }} />
              </IconButton>
            </Grid>
            <div className="mt-3">
              <Checkbox
                checked={watchLists.watchListSearch.symbols}
                onChange={() => handleSearchOptions("symbols")}
                size="small"
              />
            </div>
          </div>
        </Grid>
        <Paper
          style={{
            backgroundColor: "rgb(27,27,27)",
            height: "calc(87vh - 340px)",
            width: "100%",
            padding: 7,
          }}
          className="overflow-auto"
        >
          {watchLists.watchLists.title !== "" &&
            watchList?.map((symbol: any) => {
              return (
                <>
                  {symbol.toUpperCase() === symbol && (
                    <div
                      style={{
                        minHeight: "60px",
                        borderBottom: "1px solid var(--main-color-light)",
                        padding: "1vh 0px 1vh 0px",
                      }}
                      key={symbol}
                    >
                      <div
                        style={{
                          color: "white",
                          minWidth: "99%",
                          display: "flex",
                          height: "25px",
                        }}
                      >
                        {" "}
                        <span style={{ flex: 1 }}>{symbol}</span>
                        {prices && symbol in prices ? (
                          <>
                            {prices[symbol].percent < 0 ? (
                              <span
                                style={{
                                  color: "var(--red-color)",
                                  // fontSize: "1em",
                                  float: "right",
                                }}
                                className="price-font-size"
                              >
                                <ArrowDownwardIcon
                                  fontSize="small"
                                  className="ml-1 hide-arrow"
                                />{" "}
                                {Math.abs(prices[symbol].percent)} %
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "var(--green-color)",
                                  float: "right",
                                }}
                                key={symbol}
                              >
                                <ArrowUpwardIcon
                                  fontSize="small"
                                  className="mb-1 ml-1 hide-arrow"
                                />{" "}
                                {prices[symbol].percent} %{" "}
                              </span>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        <IconButton
                          style={{
                            outline: "none",
                            padding: 2,
                            float: "right",
                            color: "rgb(160,160,160)",
                          }}
                          className="ml-2"
                          onClick={() => setSymbolHandler(symbol)}
                        >
                          <LayersIcon />
                        </IconButton>
                      </div>
                      <div style={{ display: "flex" }}>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--grey-color)",
                            flex: 1,
                          }}
                        >
                          {prices && prices[symbol]?.displayName}
                        </span>
                        <span className="mt-1" style={{ fontSize: "0.8rem" }}>
                          {prices && prices[symbol]?.percent < 0 ? (
                            <span style={{ color: "var(--red-color)" }}>
                              {prices && prices[symbol]?.price}
                            </span>
                          ) : (
                            <span style={{ color: "var(--green-color)" }}>
                              {prices && prices[symbol]?.price}
                            </span>
                          )}
                        </span>
                        <IconButton
                          className="ml-2"
                          style={{
                            outline: "none",
                            padding: 2,
                            color: "rgb(160,160,160)",
                          }}
                          onClick={() => removeWord(symbol)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </Paper>
      </Grid>

      <Grid
        item
        container
        justify="center"
        className="mt-2"
        style={{ textAlign: "center" }}
      >
        {" "}
        {show ? (
          <>
            {error ? (
              <Alert
                style={{
                  height: "25px",
                  padding: 2,
                  color: "var(--red-color)",
                }}
              >
                {error}
              </Alert>
            ) : (
              <>
                <Button
                  onClick={watchListHandler}
                  style={{
                    color: "grey",
                    border: "1px solid grey",
                    backgroundColor: "var(--main-color-regular-inner)",
                    borderRadius: "5px",
                    height: "25px",
                    fontSize: "13px",
                  }}
                  className="mr-1"
                >
                  <span> discard</span>
                </Button>
                <Button
                  className="ml-1"
                  onClick={editListAction}
                  style={{
                    color: "var(--green-color)",
                    border: "1px solid var(--green-color)",
                    borderRadius: "5px",
                    backgroundColor: "var(--main-color-regular-inner)",
                    height: "25px",
                    fontSize: "13px",
                  }}
                >
                  <span> save</span>
                </Button>
              </>
            )}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};
