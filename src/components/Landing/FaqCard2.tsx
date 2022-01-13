import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: "20px",
      backgroundColor: "var(--main-color-regular)",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    content: {
      textAlign: "left",
      paddingLeft: "10px",
      paddingRight: "30px",
      marginBottom: "25px",
    },
  })
);
export const FAQ = (props: any) => {
  const { data } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const expandHandler = () => {
    setExpanded((previousState) => !previousState);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <CardHeader subheader={data.question} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={expandHandler}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {data.answer.map((faq: any, index: number) => (
            <Typography
              color="textSecondary"
              component="p"
              className={classes.content}
              key={index}
            >
              {faq}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
