import React, { useState, useEffect, useCallback } from "react";
////Material//////
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";
import { TransitionProps } from "@material-ui/core/transitions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
////Redux////
import {
  editListHandler,
  deleteListHandler,
} from "../../redux/slices/userLists";
import { useDispatch, useSelector } from "react-redux";

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

export const EditList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [titleName, setTitleName] = useState("");
  const [newTitleName, setNewTitleName] = useState("");
  const allLists = useSelector(
    (state: stateType) => state.watchLists.watchLists
  );
  const currentUser = useSelector((state: stateType) => state.user);
  const list = useSelector((state: stateType) => state.watchLists.currentList);
  const titleHandler = (e: any) => {
    setError("");
    const inputText = e.currentTarget.value;
    const newTitle = inputText.charAt(0).toUpperCase() + inputText.slice(1);
    if (inputText.length <= 15) {
      setNewTitleName(newTitle);
    } else {
      setError("Watchlist title cannot be more than 15 characters long.");
    }
  };

  const newTitleHandler = useCallback(() => {
    setError("");
    let title;
    let newTitle;
    console.log(list.title);
    if (!!titleName || !!newTitleName) {
      title = list.title;
      newTitle = list.title;
    }
    const { email, token } = currentUser;
    const newList = {
      oldTitle: title,
      newTitle: newTitle,
      words: list.words,
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
    const filteredArray: list[] = allLists.filter(
      (list: list) => list.title === newTitleName
    );
    console.log(filteredArray);
    if (filteredArray.length !== 0) {
      setError("Watchlist name already exists.");
      return;
    }
    dispatch(editListHandler(newList));
    setOpen(false);
  }, [allLists, currentUser, dispatch, titleName, newTitleName, list]);

  const deleteHandler = () => {
    const { email, token } = currentUser;
    const user = {
      title: titleName,
      email,
      token,
    };
    dispatch(deleteListHandler(user));
    setOpen(false);
  };

  useEffect(() => {
    setTitleName(list?.title);
  }, [list]);

  const [open, setOpen] = useState(false);
  const openHandler = () => {
    if (list.title !== "") {
      setOpen(true);
    }
  };

  const closeHandler = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Edit/Delete selected watchlist">
        <IconButton
          onClick={openHandler}
          size="small"
          className={classes.addButton}
        >
          <EditIcon className={classes.addIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
      >
        <DialogTitle className={classes.cardHeader}>Edit watchlist</DialogTitle>
        <TextField
          autoFocus
          size="small"
          placeholder="New name.."
          helperText="(ex. 'Ev sector')"
          className={classes.inputHelper}
          onChange={titleHandler}
          color="secondary"
        />
        <DialogContent className={classes.color}>
          <DialogContentText className={classes.cardText}>
            {newTitleName.length > 0 ? newTitleName : titleName}
          </DialogContentText>
          {error && <Alert severity="info">{error}</Alert>}
        </DialogContent>
        <DialogActions className={classes.color}>
          <Button onClick={closeHandler} style={{ padding: 2 }}>
            Cancel
          </Button>
          <Button onClick={deleteHandler} style={{ padding: 2 }}>
            Delete
          </Button>
          <Button
            onClick={newTitleHandler}
            style={{ border: "1px solid white", padding: 2 }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
