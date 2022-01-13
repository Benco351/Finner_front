const { DateTime } = require("luxon");
let marketIsOpenKeY = false;
let tradingHours = false;
const marketIsOpen = () => {
  const luxonTime = DateTime.now().setZone("America/New_York");
  const dayOfTheWeek = luxonTime.weekdayLong;
  if (dayOfTheWeek !== "Sunday" && dayOfTheWeek !== "Saturday") {
    if (luxonTime.c.hour < 4 || luxonTime.c.hour > 19) {
      marketIsOpenKeY = false;
    } else {
      marketIsOpenKeY = true;
      if (
        (luxonTime.c.hour >= 9 && luxonTime.c.hour <= 16) ||
        (luxonTime.c.minute === 9 && luxonTime.c.minute >= 30)
      ) {
        tradingHours = true;
      } else {
        tradingHours = false;
      }
    }
  } else {
    marketIsOpenKeY = false;
  }
  return { marketIsOpenKeY, tradingHours };
};
export default marketIsOpen;
