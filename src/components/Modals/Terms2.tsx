import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import IconButton from "@material-ui/core/IconButton";
import { text } from "../../assets/text/terms";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  terms: {
    fontSize: "13px",
    color: "var(--blue-color)",
    borderRadius: "5px",
    padding: 1,
    marginLeft: "10px",
  },
  content: {
    backgroundColor: "var(--main-color-regular)",
    textAlign: "center",
  },
  background: {
    backgroundColor: "var(--main-color-regular)",
  },
  closeButton: { height: "25px", marginLeft: "10px" },
  acceptButton: {
    border: "1px solid grey",
    height: "25px",
    marginLeft: "10px",
    backgroundColor: "var(--main-color-regular)",
  },
});
interface setTerms {
  isAgreed: boolean;
  firstEntry: boolean;
}
interface Props {
  setTerms: (args: setTerms) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Terms = (props: Props) => {
  const classes = useStyles();
  const { setTerms } = props;
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
    setTerms({ isAgreed: false, firstEntry: false });
  };
  const acceptHandler = () => {
    setTerms({ isAgreed: true, firstEntry: false });
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={openHandler} className={classes.terms}>
        terms of use
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
      >
        <DialogContent className={classes.content}>{text}</DialogContent>
        <DialogActions className={classes.terms}>
          <Button onClick={closeHandler} className={classes.closeButton}>
            Cancel
          </Button>
          <Button onClick={acceptHandler} className={classes.acceptButton}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
