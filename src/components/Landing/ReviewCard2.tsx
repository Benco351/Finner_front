import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Divider } from "../UI/divider2";
import { Emoji } from "../UI/emoji";
import { makeStyles } from "@material-ui/core/styles";
import { comments } from "../../assets/text/comments";
const useStyles = makeStyles({
  card: {
    border: "1px solid grey",
    padding: "3vh 7vw 3vh 7vw",
    borderRadius: "10px",
    backgroundColor: "var(--main-color-regular)",
  },
  location: {
    fontSize: "18px",
    color: "rgb(180,180,180)",
    marginLeft: "10px",
  },
  text: {
    marginTop: "40px",
    marginBottom: "20px",
  },
});
export const ControlledCarousel = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {comments.map((card) => {
        return (
          <Carousel.Item key={card.name}>
            <div className={classes.card}>
              <h3>{card.name}</h3>
              <span className={classes.location}>{card.location}</span>
              <div style={{ marginTop: "10px" }}></div>
              <Divider
                width={100}
                height={0.1}
                marginTop={30}
                backgroundColor={"var(--purple-color)"}
              />
              <div className={classes.text}>
                {card.text}
                {card.name === "Stanley Johnson" && (
                  <>
                    <Emoji symbol="💪" label="success" />
                    <Emoji symbol="💪" label="success" />
                  </>
                )}
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
