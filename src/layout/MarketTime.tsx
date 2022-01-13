import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
const { DateTime } = require("luxon");
const useStyles = makeStyles({
  root: {
    border: "1px solid var(--main-color-light)",
    borderRadius: "5px",
    padding: 3,
    fontSize: "clamp(0.4rem, 1.5vw, 0.9rem)",
    minWidth: "135px",
    color: "rgb(215,215,215)",
    backgroundColor: "var(--main-color-dark)",
  },
  vl: {
    borderLeft: "1px solid var(--grey-color)",
    height: "inherit",
    margin: "0px 12px 0px 12px",
  },
  state: {
    margin: "0px 5px 0px 5px",
  },
  tradingHours: {
    margin: "0px 5px 0px 0px",
  },
});

export const MarketTime = () => {
  const classes = useStyles();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [marketHours, setMarketTime] = useState("");
  const marketTime = useSelector(
    (state: stateType) => state.userData.isMarketOpen
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      const luxonTime = DateTime.now().setZone("America/New_York");

      let time = "";
      const { marketIsOpen, tradingHours } = marketTime;
      if (marketIsOpen === true && tradingHours === true) {
        time = "Trading Hours";
      }
      if (marketIsOpen === true && tradingHours === false) {
        if (luxonTime.c.hour > 15) {
          time = "After Market";
        } else {
          time = "Pre Market";
        }
      }
      if (marketIsOpen === false) {
        time = "Closed";
      }
      setMinute(luxonTime.c.minute);
      setHour(luxonTime.c.hour);
      setMarketTime(time);
    }, 60000);
    return () => clearTimeout(timer);
  }, [marketTime]);

  return (
    <div className={classes.root}>
      <span className={classes.state}>NY</span>
      {hour < 10 && <span>0</span>}
      <span>{hour} : </span>
      {minute < 10 && <span>0</span>}
      <span>{minute}</span>
      <span className={classes.vl}></span>
      <span className={classes.tradingHours}>{marketHours}</span>
    </div>
  );
};
