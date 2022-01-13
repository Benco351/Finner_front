import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../../redux/slices/snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface snackValues {
  snackbarOpen: boolean;
  snackbarType: any;
  snackbarMessage: string;
}
interface snackBar {
  snackbar: snackValues;
}

const Toast = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(
    (state: snackBar) => state.snackbar.snackbarOpen
  );
  const snackbarType = useSelector(
    (state: snackBar) => state.snackbar.snackbarType
  );
  const snackbarMessage = useSelector(
    (state: snackBar) => state.snackbar.snackbarMessage
  );

  const closeHandler = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    const payload = {
      snackbarOpen: false,
      snackbarType,
      snackbarMessage,
    };
    dispatch(setSnackBar(payload));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={closeHandler}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
