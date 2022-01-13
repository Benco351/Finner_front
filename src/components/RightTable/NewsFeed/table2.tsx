import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TwitterCard } from "./socialCard2";
import { Loading } from "../../UI/Loading";
import { useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { serverUrl } from "../../../assets/text/urls";
const useStyles = makeStyles({
  twitter: {
    overflow: "hidden",
    marginTop: "20px",
    maxWidth: "95vw",
  },
});

export const TwitterNews = () => {
  const classes = useStyles();
  const currentUser = useSelector((state: stateType) => state.user);
  const [articles, setArticles] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(15);
  const news = useSelector((state: stateType) => state.userData.latestNews);

  interface axiosResponse {
    data: { news: Tweet[] };
  }

  useEffect(() => {
    setArticles(news);
    setCounter((ps) => ps + 1);
  }, [news]);

  const moreTwittsHandler = async () => {
    try {
      setLoading(true);
      const response: axiosResponse = await axios.post(
        `${serverUrl}/news/latest_tweets/more`,
        {
          email: currentUser.email,
          token: currentUser.token,
          numberToSkip: counter,
        }
      );
      const news = response.data.news;
      setArticles((prevState: any) => [...prevState, ...news]);
      setCounter((ps) => ps + news.length);
      setLoading(false);
    } catch (err) {}
  };
  const removeNewsHandler = () => {
    if (articles.length > 30) {
      const latestNews = articles.slice(0, 30);
      setArticles(latestNews);
    }
  };

  let content = <Loading />;

  if (articles.length === 0 && !loading)
    content = <div style={{ textAlign: "center" }}>No articles</div>;

  if (articles.length > 0) {
    content = (
      <Grid
        style={{ maxHeight: "80vh", overflowX: "hidden" }}
        container
        spacing={1}
        justify="center"
      >
        {articles.length > 30 && <Waypoint onEnter={removeNewsHandler} />}
        {articles?.map((tweet: Tweet) => (
          <Grid item style={{ width: "92%" }} key={tweet?.id_str.toString()}>
            <TwitterCard tweet={tweet} />
          </Grid>
        ))}
        {loading && (
          <div style={{ color: "var(--blue-color)", textAlign: "center" }}>
            Loading more..{" "}
          </div>
        )}
        {articles.length > 0 && <Waypoint onEnter={moreTwittsHandler} />}
      </Grid>
    );
  }

  return (
    <div className={classes.twitter}>
      <Grid container justify="center">
        {content}
      </Grid>
    </div>
  );
};
