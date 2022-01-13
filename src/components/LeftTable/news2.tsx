import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setWatchListNews } from "../../redux/slices/watchListNews";
import { Loading } from "../UI/Loading";
import { TwitterCard } from "./socialCard2";
import { getSymbols, getKeywords } from "../../helpers/listHandler";
import useSound from "use-sound";
import { v4 as key } from "uuid";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { serverUrl } from "../../assets/text/urls";

const useStyles = makeStyles({
  message: {
    marginTop: "30px",
    textAlign: "center",
    padding: "30px",
  },
  grid: {
    width: "100%",
  },
});

export const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [symbols, setSymbols] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const news = useSelector((state: stateType) => state.watchListFeed);
  const currentList = useSelector(
    (state: stateType) => state.watchLists.currentList
  );
  const soundKey = useSelector((state: stateType) => state.userData.sound);

  useEffect(() => {
    setWords(getKeywords(currentList?.words));
    setSymbols(getSymbols(currentList?.words));
  }, [currentList.words]);

  const [play, { stop }] = useSound(`${serverUrl}/audio`, {
    format: "mp3",
  });
  useEffect(() => {
    if (soundKey) {
      return play();
    }
    stop();
  }, [soundKey, play, stop]);

  const newWatchListArticle = useCallback(
    (newFeed: Tweet) => {
      let text = newFeed.text;
      const cleanText = text.replace(/[^a-zA-Z]/g, " ").toLowerCase();
      const spiltText = cleanText.split(" ");
      const textUniqueArray = Array.from(new Set(spiltText));
      if (words?.length > 0) {
        let wordsArray = [] as string[];
        words.forEach((word: string) => {
          if (textUniqueArray.includes(word.toLowerCase())) {
            wordsArray.push(word);
          }
        });
        if (wordsArray?.length > 0) {
          newFeed = { ...newFeed, words: wordsArray };
          if (soundKey === true) {
            play();
          }
          return dispatch(setWatchListNews({ news: [newFeed, ...news.news] }));
        }
        if (symbols?.length > 0 && newFeed?.symbols?.length > 0) {
          symbols?.forEach((symbol: string) => {
            if (newFeed?.symbols.includes(symbol)) {
              if (soundKey === true) {
                play();
              }
              return dispatch(
                setWatchListNews({ news: [newFeed, ...news.news] })
              );
            }
          });
        }
      }
    },
    [play, soundKey, words, symbols, dispatch, news.news]
  );

  useEffect(() => {
    if (news?.length > 0) {
      newWatchListArticle(news[0]);
    }
  }, [news, newWatchListArticle]);

  return (
    <>
      {news.loading && (
        <div className={classes.message}>
          <Loading />
        </div>
      )}
      {currentList?.title === "" && (
        <div className={classes.message}>Create/Select watchlist first.</div>
      )}
      {currentList?.title !== "" && currentList.words === 0 && (
        <div className={classes.message}>
          Add symbols or keywords to your watchlist first.
        </div>
      )}
      {currentList?.title !== "" && news.news.length === 0 && !news.loading && (
        <div className={classes.message}>
          No watchlist news for the last 24 hours.
        </div>
      )}
      {news.length > 0 && (
        <div className={classes.message}>
          {news.news.map((article: Tweet) => (
            <Grid item className={classes.grid} key={key()}>
              <TwitterCard
                tweet={article}
                color={"var(--main-color-dark)"}
                showSymbol={true}
              />
            </Grid>
          ))}
        </div>
      )}
    </>
  );
};
