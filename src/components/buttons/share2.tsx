import { useState, memo } from "react";
import { StockTwitsButton } from "./stockTwits2";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
interface Props {
  stockTwitsText: any;
  title: string;
  symbols: string[];
  shareLink: string;
}
const useStyles = makeStyles({
  fileButton: {
    height: 25,
    padding: 3,
  },
  shareIcon: {
    height: "30px",
    padding: 3,
  },
});

const Share = (props: Props) => {
  const classes = useStyles();
  const { stockTwitsText, title, symbols, shareLink } = props;
  const [showShareButtons, setShowShareButtons] = useState(false);
  const copyLinkHandler = () => navigator.clipboard.writeText(shareLink);
  const showShareHandler = () =>
    setShowShareButtons((previousState) => !previousState);
  const size = 25;
  return (
    <>
      {showShareButtons && (
        <>
          <StockTwitsButton text={stockTwitsText} />
          <TwitterShareButton title={title} hashtags={symbols} url={shareLink}>
            <TwitterIcon size={size} round />
          </TwitterShareButton>
          <WhatsappShareButton title={title} url={shareLink}>
            <WhatsappIcon size={size} round />
          </WhatsappShareButton>
          <RedditShareButton title={title} url={shareLink}>
            <RedditIcon size={size} round />
          </RedditShareButton>
          <TelegramShareButton title={title} url={shareLink}>
            <TelegramIcon size={size} round />
          </TelegramShareButton>
          <IconButton className={classes.fileButton} onClick={copyLinkHandler}>
            <FileCopyIcon />
          </IconButton>
        </>
      )}
      <IconButton className={classes.shareIcon} onClick={showShareHandler}>
        <ShareIcon />
      </IconButton>
    </>
  );
};

export default memo(Share);
