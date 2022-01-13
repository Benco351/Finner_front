import { useEffect } from "react";
import image from "../../assets/images/stocktwits.jpeg";

interface Props {
  text: string;
}

const url = "https://api.stocktwits.com";
export const StockTwitsButton = (props: Props) => {
  const { text } = props;
  const href = `${url}/widgets/share?body=${text}`;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${url}/addon/button/share.min.js`;
    document.getElementById("stocktwits-share-button")!;
  }, []);

  return (
    <a href={href} id="stocktwits-share-button" target="popup" rel="noreferrer">
      <img
        src={image}
        alt="Share on Stocktwits"
        style={{ borderRadius: "50%", height: "25px", width: "25px" }}
      />
    </a>
  );
};
