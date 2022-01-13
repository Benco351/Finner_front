import moment from "moment";

export const getTime = (date: Date) => {
  const time = moment(date)
    .fromNow()
    .replaceAll(" minutes", "m")
    .replaceAll("a few seconds ago", "now")
    .replaceAll("a minute", "1m")
    .replaceAll(" days", "d")
    .replaceAll(" hours", "h")
    .replaceAll("a day", "1d")
    .replaceAll("an", "")
    .replaceAll("ago", "")
    .replaceAll(" hour", " 1h");
  return time;
};
