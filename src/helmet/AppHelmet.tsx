import { Helmet } from "react-helmet";

export const AppHelmet = () => {
  return (
    <Helmet>
      <title>Finner</title>
      <meta
        name="description"
        content="Real Time Stock Tracker. Anywhere, Anytime. Use keywords and symbols for real time news customization.
  Get a Hedge-Fund's tool to gain your edge."
      />
      <meta
        name="keywords"
        content="stock tracker, trending stocks, swing trade stocks, stocknews, stock market websites, fomo stock, what is a meme stock, how to find penny stocks before they explode,stocks to day trade today,trending stock today"
      />
    </Helmet>
  );
};
