import React from "react";
import tweetPicture from "../../../../../images/twitter.png";
import moment from "moment";
import { Grid } from "@material-ui/core";
interface Props {
  tweet: Tweet;
  color: string;
}
const Card: React.FunctionComponent<Props> = (props: Props) => {
  const { tweet, color } = props;
  const text = tweet.text.split(" ");
  const removedLinks = text.filter((word) => !word.includes("https")).join(" ");
  const links = text.filter((word) => word.includes("https"));
  const cleanLinks = links.map((link) => link.substring(link.indexOf("https")));
  const time = moment(tweet.date).fromNow();
  const userLink = `https://twitter.com/${tweet.screen_name}`;
  const tweetLink = `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`;
  return (
    <div
      className="card-article rounded shiv-dark color"
      style={{ backgroundColor: `${color}`, fontSize: "15px" }}
    >
      <span>
        <span style={{ color: "grey" }}>
          <img
            src={tweetPicture}
            className="mr-1 mb-1 "
            style={{ height: "23px" }}
            alt={""}
          ></img>
          <a
            href={userLink}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "inherit",
            }}
          >
            {tweet.name}
          </a>
        </span>
        <span className="time" style={{ float: "right" }}>
          {" "}
          {time}{" "}
        </span>
      </span>
      <Grid container justify="center" direction="row">
        <Grid item xs={11} lg={12} className="p-1">
          {" "}
          <div>
            <div className="mt-1 mr-1">
              <a
                href={tweetLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "inherit",
                }}
              >
                {removedLinks}
                <br></br>
              </a>
              {cleanLinks?.map((link) => {
                return (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--blue-color)" }}
                    key={link}
                  >
                    {link}
                  </a>
                );
              })}
            </div>
            <div className="mt-1"></div>
          </div>
        </Grid>
        <Grid item sm={1}>
          {" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default Card;
