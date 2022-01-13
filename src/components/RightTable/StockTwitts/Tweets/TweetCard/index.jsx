import {useState} from "react";
import moment from "moment";
import { get } from "lodash";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

/* Material-UI Components */
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import SentimentChip from "../SentimentChip";
import useStyles from "./styles";

export const StockTwitCard = ({ tweet }) => {
  const [moreText, setMoreText] = useState(false)
  const classes = useStyles();
  const { user, entities, body } = tweet;
  let decodedBody= body.replace(/&#39;/g,"'").replace(/&amp;/g,"&").split(' ')
  const removedLinks = decodedBody.filter((word) => !word.includes("https") || !word.includes("https")).join(" ");
  const links = decodedBody.filter((word) => word.includes("https") || word.includes("http"));
  const cleanLinks = links.map((link) => link.substring(link.indexOf("https")));
  const timestamp = moment(tweet.created_at).calendar();
  const sentiment = get(entities.sentiment, "basic");

  return (
    <Paper className={classes.paper}>
      <div className={classes.tweetCardHeader}>
        <div className={classes.avatarContainer}>
          <Avatar
            className={classes.userAvatar}
            alt="user-avatar"
            src={user.avatar_url_ssl}
          />
        </div>
        <div className={classes.flex}>
          <Typography>
            {"\u0040"}
            {user.username}
          </Typography>
        </div>
      </div>
      <div className={classes.topRightSection}>
        <Typography variant="subtitle2">{timestamp}</Typography>
        {sentiment && <SentimentChip sentiment={sentiment} />}
      </div>
      <Divider className={classes.divider} />
        <Typography className={classes.tweetBody}>
     
          {removedLinks.length > 220 && !moreText ?
           <>
           {removedLinks.slice(0, 220)}
           <br></br>
           <Button style={{fontSize:'13px', padding: 1}} onClick={() => setMoreText(true)}>load more..</Button>
           </> 
           : removedLinks}
                <br></br>
                {cleanLinks?.map((link) => {
                  return (
                    <a href={link} target="_blank" rel="noreferrer" style={{color :'var(--blue-color)'}} key={link}>
                      {link}
                    </a>
                  );})}
        </Typography>
    </Paper>
  );
}

StockTwitCard.propTypes = {
  tweet: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar_url_ssl: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    entities: PropTypes.shape({
      sentiment: PropTypes.shape({}),
    }),
    body: PropTypes.string.isRequired,
  }).isRequired,
};
