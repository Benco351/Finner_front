import { useState, useRef } from "react";
import { getTime } from "../../../helpers/getTime";
import clsx from "clsx";
import { useOverflow } from "use-overflow";
import Share from "../../buttons/share2";
import tweetPicture from "../../../assets/images/twitter.png";
import { SymbolButton } from "../../buttons/symbol2";
import LinkIcon from "@material-ui/icons/Link";
import { Divider } from "../../UI/divider2";

///Material///
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface Props {
  tweet: Tweet;
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
    card: {
      backgroundColor: "var(--main-color-light)",
      minHeight: "6rem",
      boxShadow: "2px 2px 4px rgba(10,10,10,0.5)",
      borderRadius: "0.5rem",
      padding: "0.6rem",
      margin: "0.5rem 0",
      maxWidth: "1000px",
      minWidth: "100%",
      overflow: "hidden",
    },
    content: {
      color: "inherit",
      flex: 81,
      height: "50px",
      lineHeight: "25px",
      overflow: "hidden",
    },
    info: {
      flex: 12,
      color: "grey",
      textAlign: "right",
      whiteSpace: "nowrap",
    },
    links: {
      flex: 3,
      flexDirection: "column",
      display: "flex",
    },
    image: {
      height: "25px",
      color: "grey",
    },
    symbols: { width: "25%", minWidth: "120px" },
  })
);

export const TwitterCard = (props: Props) => {
  const classes = useStyles();
  const { tweet } = props;
  const verticalRef = useRef(null);
  const { refYOverflowing } = useOverflow(verticalRef);
  let dots = "";
  if (refYOverflowing) {
    dots = "...";
  }
  let SymbolsTagsTwits = "";
  tweet?.symbols?.forEach((symbol) => {
    SymbolsTagsTwits = `$${symbol}` + SymbolsTagsTwits;
  });
  const text = tweet.text.split(" ");
  const content = text.filter((word) => !word.includes("https")).join(" ");
  const links = text.filter((word) => word.includes("https"));
  const cleanLinks = links.map((link) => link.substring(link.indexOf("https")));
  const shareLink = `www.finner.trade/main/social/${tweet.id_str} `;
  const time = getTime(tweet.date);
  const userLink = `https://twitter.com/${tweet.screen_name}`;
  const tweetLink = `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`;

  const [isExpand, setIsExpend] = useState(false);
  const [cardHeight, setCardHeight] = useState(8);

  const expandHandler = () => {
    setIsExpend(!isExpand);
    if (cardHeight === 30) {
      setCardHeight(10);
      return;
    }
    setCardHeight(30);
  };
  return (
    <div
      className={` rounded shiv-dark color + ${classes.card}`}
      style={{ maxHeight: `${cardHeight}vh` }}
    >
      <Grid
        item
        container
        direction="row"
        style={{ width: "100%", height: "25px" }}
      >
        {" "}
        <a
          href={tweetLink}
          target="_blank"
          rel="noreferrer"
          className={classes.content}
          ref={verticalRef}
        >
          {content}
        </a>
        <span style={{ marginTop: "25px" }}>{dots}</span>
        <span className={classes.links}>
          {" "}
          {cleanLinks?.map((link) => {
            return (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--blue-color)" }}
                key={link}
              >
                <LinkIcon />
              </a>
            );
          })}
        </span>
        <div style={{ flex: 4 }} className="d-flex flex-row">
          <img src={tweetPicture} className={classes.image} alt="" />
        </div>
        <span className={classes.info}>
          {time} <Divider width={100} height={0.1} />
          <a
            href={userLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: "grey" }}
          >
            {tweet.name}
          </a>
        </span>
        <Grid
          item
          container
          direction="row"
          style={{ display: "flex", marginTop: "5px", marginBottom: "10px" }}
        >
          <Grid item container style={{ flex: 73 }} direction="row">
            {tweet.symbols.map((symbol: string) => (
              <div className={classes.symbols} key={symbol}>
                <SymbolButton symbolName={symbol} color={"rgb(55,55,55)"} />
              </div>
            ))}
          </Grid>
          <div style={{ flex: 27, textAlign: "right" }}>
            <Share
              stockTwitsText={shareLink}
              title={tweet.text}
              symbols={tweet.symbols}
              shareLink={shareLink}
            />

            {tweet.symbols?.length > 3 && (
              <IconButton
                style={{ height: "25px", padding: 0, flex: 3 }}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: isExpand,
                })}
                onClick={expandHandler}
                aria-expanded={isExpand}
                aria-label="show more"
              >
                <ExpandMoreIcon style={{ color: "var(color-orange)" }} />
              </IconButton>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
