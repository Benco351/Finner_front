import { useState } from "react";
import clsx from "clsx";
import { v4 as key } from "uuid";

//Helpers
import { getTime } from "../../helpers/getTime";
import tweetPicture from "../../assets/images/twitter.png";

//Material
import LinkIcon from "@material-ui/icons/Link";

//Comps
import Share from "../buttons/share2";
import { SymbolButton } from "../buttons/symbol2";

///Material///
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
///Redux///
import { useSelector } from "react-redux";

interface Props {
  tweet: Tweet;
  color: string;
  showSymbol: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

export const TwitterCard = (props: Props) => {
  const { tweet, color, showSymbol } = props;
  const text = tweet.text.split(" ");
  let SymbolsTagsTwits = "";
  tweet.symbols.forEach((symbol) => {
    SymbolsTagsTwits = `$${symbol}` + SymbolsTagsTwits;
  });
  const symbolsSet = Array.from(new Set(tweet.symbols));
  const removedLinks = text.filter((word) => !word.includes("https")).join(" ");
  const shareLink = `www.finner.trade/main/social/${tweet.id_str}`;
  const links = text.filter((word) => word.includes("https"));
  const cleanLinks = links.map((link) => link.substring(link.indexOf("https")));
  const currentList = useSelector(
    (state: stateType) => state.watchLists.currentList
  );

  const symbolsCurrent = currentList?.words?.filter(
    (word: string) => word.toUpperCase() === word
  );
  const time = getTime(tweet.date);
  const userLink = `https://twitter.com/${tweet.screen_name}`;
  const tweetLink = `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`;
  const watchListSymbols = symbolsSet?.filter((symbol) =>
    symbolsCurrent?.includes(symbol)
  );
  const mentionedSymbols = symbolsSet?.filter(
    (symbol) => !symbolsCurrent?.includes(symbol)
  );

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [expand, setExpand] = useState(10);

  const expandHandler = () => {
    setExpanded(!expanded);
    if (expand === 30) {
      setExpand(10);
    }
    if (expand === 10) {
      setExpand(30);
    }
  };

  return (
    <div
      style={{
        backgroundColor: `${color}`,
        boxShadow: "2px 2px 4px rgba(10,10,10,0.5)",
        borderRadius: "0.5rem",
        padding: "0.6rem",
        margin: "1rem 0",
        fontSize: "1rem",
        minHeight: "6rem",
        maxHeight: `${expand}vh`,
        overflow: "hidden",
      }}
    >
      <Grid item container direction="row">
        {" "}
        <a
          href={tweetLink}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "inherit",
            flex: 75,
            height: "50px",
            overflow: "hidden",
          }}
        >
          {removedLinks}
        </a>
        <span style={{ flex: 3 }}>
          {" "}
          {cleanLinks?.map((link) => (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--blue-color)" }}
              key={link}
            >
              <LinkIcon />
            </a>
          ))}
        </span>
        <div style={{ flex: 5 }} className="d-flex flex-row">
          <img
            src={tweetPicture}
            className="mr-1 mb-2 "
            style={{ height: "23px", color: "grey" }}
            alt={""}
          ></img>
        </div>
        <span
          style={{ flex: 20, color: "grey", textAlign: "right", height: "5vh" }}
        >
          <a
            href={userLink}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "grey",
            }}
          >
            {tweet.name} <span>&#183;</span>
          </a>{" "}
          {time}{" "}
        </span>
        <Grid
          item
          container
          lg={12}
          direction="row"
          style={{ display: "flex" }}
        >
          <Grid item container spacing={1} style={{ flex: 33 }} direction="row">
            {showSymbol && (
              <>
                {" "}
                {watchListSymbols.map((symbol: string) => {
                  return (
                    <div
                      style={{
                        width: "50%",
                        marginBottom: "10px",
                        minWidth: "120px",
                      }}
                      key={key()}
                    >
                      <SymbolButton
                        symbolName={symbol}
                        color={"rgb(55,55,55)"}
                        showPrice={false}
                      />
                    </div>
                  );
                })}
                {mentionedSymbols.map((symbol: string) => {
                  return (
                    <div
                      style={{
                        width: "50%",
                        marginBottom: "10px",
                        minWidth: "120px",
                      }}
                      key={key()}
                    >
                      <SymbolButton
                        symbolName={symbol}
                        color={"rgb(55,55,55)"}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </Grid>
          <span style={{ flex: 5 }}></span>
          <div style={{ flex: 40 }}>
            {tweet.words?.map((word: string) => {
              return (
                <span
                  style={{
                    color: "var(--orange-color)",
                    padding: "0px 10px 0px 10px",
                    borderRadius: "9px",
                    border: "0.5px solid var(--orange-color)",
                    fontSize: "14px",
                  }}
                  className="mr-3"
                  key={word}
                >
                  {word}
                </span>
              );
            })}
          </div>
          <div style={{ flex: 24, textAlign: "right" }}>
            <Share
              stockTwitsText={shareLink}
              title={tweet.text}
              symbols={tweet.symbols}
              shareLink={shareLink}
            />

            {(tweet.symbols?.length > 2 || tweet.words?.length > 3) && (
              <IconButton
                style={{ height: "30px", padding: 0, flex: 3 }}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={expandHandler}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {watchListSymbols?.length > 2 || tweet.words?.length > 3 ? (
                  <ExpandMoreIcon style={{ color: "var(color-orange)" }} />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
