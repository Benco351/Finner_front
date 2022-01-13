import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "clamp(300px, 30vw, 800px)",
    color: "var(--main-color-dark)",
    backgroundColor: "var(--main-color-regular)",
  },
  page: {
    minHeight: "92vh",
    color: "black",
  },
  input: {
    backgroundColor: "var(--input-color)",
    color: "white",
  },
});

export const AuthCard = (props: any) => {
  const classes = useStyles();
  return (
    <Container
      className={`d-flex align-items-center justify-content-center ${classes.page}`}
    >
      <Card className={classes.card} text="light">
        {props.children}
      </Card>
    </Container>
  );
};
