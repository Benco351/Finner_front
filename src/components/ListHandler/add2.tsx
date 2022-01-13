import React, { useState, useCallback } from "react";
///Material/////
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
////Redux//
import { useDispatch, useSelector } from "react-redux";
import { addListHandler } from "../../redux/slices/userLists";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  addButton: { color: "rgb(210,210,210)", height: "25px", borderRadius: "50%" },
  addIcon: { height: "20px", width: "20px" },
  inputHelper: {
    backgroundColor: "var(--main-color-regular)",
    width: "100%",
    padding: "30px",
  },
  cardHeader: {
    textAlign: "center",
    backgroundColor: "var(--main-color-regular)",
  },
  cardText: {
    backgroundColor: "var(--main-color-regular)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    color: "var(--orange-color)",
  },
  color: { backgroundColor: "var(--main-color-regular)" },
});

export const AddList = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const userData = useSelector((state: stateType) => state.watchLists);
  const currentUser = useSelector((state: stateType) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [titleName, setTitleName] = useState("");

  const titleHandler = (e: any) => {
    setError("");
    const inputText = e.currentTarget.value;
    const newTitle = inputText.charAt(0).toUpperCase() + inputText.slice(1);
    if (inputText.length <= 15) {
      setTitleName(newTitle);
    } else {
      setError("Watchlist title cannot be more than 15 characters long.");
    }
  };

  const newTitleHandler = useCallback(() => {
    setError("");
    const { email, token } = currentUser;
    const newList = {
      title: titleName,
      email,
      token,
    };
    if (titleName.length < 2) {
      setError("Watchlist name cannot be less than 2 characters long.");
      return;
    }
    if (/[^a-zA-Z1-9 ]/.test(titleName)) {
      setError("Watchlist name cannot include special characters.");
      return;
    }
    const filteredArray = userData.watchLists.filter(
      (list: any) => list.title === titleName
    );
    if (filteredArray?.length !== 0) {
      setError("Watchlist name already exists.");
      return;
    }
    dispatch(addListHandler(newList));
    setOpen(false);
  }, [userData.watchLists, currentUser, dispatch, titleName]);

  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Create new watchlist">
        <IconButton
          onClick={openHandler}
          size="small"
          className={classes.addButton}
        >
          <AddCircleIcon className={classes.addIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
      >
        <DialogTitle className={classes.cardHeader}>
          Create watchlist
        </DialogTitle>
        <TextField
          autoFocus
          size="small"
          placeholder="Name..."
          helperText="(ex. 'Ev sector')"
          className={classes.inputHelper}
          onChange={titleHandler}
          color="secondary"
        />
        <DialogContent className={classes.color}>
          <DialogContentText className={classes.cardText}>
            {titleName && titleName}
          </DialogContentText>
          {error && <Alert severity="info">{error}</Alert>}
        </DialogContent>
        <DialogActions className={classes.color}>
          <Button onClick={closeHandler} style={{ padding: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={newTitleHandler}
            style={{ border: "1px solid white", padding: 2 }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
