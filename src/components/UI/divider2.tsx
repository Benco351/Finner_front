import { Divider as Line } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Divider = (props: any) => {
  const { height, width, maxWidth, backgroundColor, position, left, margin } =
    props;
  const useStyles = makeStyles({
    divider: {
      width: `${width}%`,
      height: `${height}ch`,
      maxWidth: maxWidth,
      backgroundColor: backgroundColor,
      borderRadius: "10px",
      position: position,
      left: left,
      marginTop: margin,
    },
  });
  const classes = useStyles();
  return <Line className={classes.divider} />;
};
