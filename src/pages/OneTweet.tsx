import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Loading } from "../components/UI/Loading";
import Rocket from "../components/UI/Rocket";
import { Helmet } from "react-helmet";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { serverUrl } from "../assets/text/urls";

interface params {
  name: string;
  words: string;
}

const useStyles = makeStyles({
  grid: {
    wordBreak: "break-word",
    position: "relative",
  },
  homeButton: {
    color: "white",
    height: "45px",
    width: "180px",
  },
  signUpButton: {
    backgroundColor: "var(--orange-color)",
    color: "black",
    fontWeight: "bold",
    height: "45px",
    width: "180px",
    "&:hover, &:focus": {
      opacity: 0.7,
      backgroundColor: "var(--orange-color)",
    },
  },
  card: {
    backgroundColor: "var(--main-color-regular)",
    color: "white",
    minHeight: "30vh",
    marginTop: "15vh",
  },
});

export default function OneTweet() {
  const classes = useStyles();
  const params: params = useParams();
  const history = useHistory();
  const [text, setText] = useState();
  const [links, setLinks] = useState<string[]>();
  const [publisherLink, setPublisherLink] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [tweet, setTweet] = useState<Tweet>();
  const currentUser = useSelector((state: stateType) => state.user);
  const symbols = Array.from(new Set(tweet?.symbols));
  const time = moment(tweet?.date).fromNow();

  const metaContent = useMemo(
    () =>
      "stock tracker, trending stocks, swing trade stocks, stocknews, stock market websites, fomo stock, what is a meme stock, how to find penny stocks before they explode,stocks to day trade today,trending stock today",
    []
  );
  const rocket = {
    maxWidth: "200px",
    minWidth: "50px",
    position: "absolute",
    top: "20vh",
    height: 200,
  };

  const sendRequest = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/news/tweet/${params.name}`
      );
      setLoading(false);
      const tweet = response.data.tweet;
      setTweet(tweet);
      const text = tweet.text.split(" ");
      setText(text.filter((word: string) => !word.includes("https")).join(" "));
      const links = text.filter((word: string) => word.includes("https"));
      setLinks(
        links.map((link: string) => link.substring(link.indexOf("https")))
      );
      setPublisherLink(
        `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`
      );
    } catch (error) {
      history.push("/404");
    }
  }, [history, params.name]);

  useEffect(() => {
    sendRequest();
  }, [history, params.name, sendRequest]);

  useEffect(() => {
    if (currentUser?.email) {
    } else if (!currentUser?.email && tweet !== undefined) {
      setTweet(tweet);
    }
  }, [currentUser, tweet]);

  return (
    <>
      <Helmet>
        <title>Stock Tracker</title>
        <meta name="description" content={tweet && tweet.text} />
        <meta name="keywords" content={metaContent} />
      </Helmet>
      <Grid container className={classes.grid}>
        <Grid item container justify="center" lg={3} md={2} sm={1} xs={1}>
          <Rocket styles={rocket} />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          alignContent="center"
          direction="column"
          className={` rounded p-3 mb-1 ${classes.card}`}
          lg={6}
          md={8}
          sm={10}
          xs={10}
        >
          {" "}
          {loading || tweet === undefined ? (
            <div className="mt-5">
              {" "}
              <Loading />
            </div>
          ) : (
            <div className="text-center">
              <h4 style={{ marginTop: "25px" }}>{tweet.screen_name}</h4>
              <div style={{ marginTop: "10px" }}>{time}</div>
              <p style={{ marginTop: "45px" }}>
                <a
                  href={publisherLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {text}
                </a>
                {links?.map((link) => {
                  return (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--blue-color)", marginLeft: "5px" }}
                      key={link}
                    >
                      <LinkIcon />
                    </a>
                  );
                })}
              </p>
              <h6 style={{ textDecoration: "underline", marginTop: "45px" }}>
                Symbols
              </h6>
              {symbols.map((symbol) => (
                <li style={{ margin: "5px" }} key={symbol}>
                  {symbol}
                </li>
              ))}
            </div>
          )}
        </Grid>
        <Grid item container justify="center" lg={3} md={2} sm={1} xs={1}>
          <Rocket styles={rocket} />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          style={{
            textAlign: "center",
            marginTop: " 100px",
          }}
          className="rounded"
        >
          <h3 style={{ color: "grey", marginBottom: "30px" }}>
            Want a full access to breaking news?
          </h3>
          <h1>
            Join now to our{" "}
            <span style={{ color: "var(--orange-color)" }}>
              limited time free
            </span>{" "}
            subscription to Finner!
          </h1>
          <Grid
            item
            container
            direction="row"
            justify="center"
            style={{ marginTop: "30px" }}
          >
            <Link to="/sign-up" className="mt-3 mb-3 mr-2">
              <Button variant="outlined" className={classes.signUpButton}>
                Sign Up{" "}
              </Button>
            </Link>
            <Link to="/home" className="mt-3 mb-3 ml-2">
              <Button variant="outlined" className={classes.homeButton}>
                Home{" "}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
