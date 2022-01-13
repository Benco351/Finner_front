import { createSlice } from "@reduxjs/toolkit";
interface actionType {
  payload: setSnackbarType;
}
interface setSnackbarType {
  snackbarOpen: boolean;
  snackbarType: "error" | "warning" | "info" | "success";
  snackbarMessage: string;
}

const SnackBarSlice = createSlice({
  name: "snack_bar",
  initialState: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "",
  },
  reducers: {
    setSnackBar(state, action: actionType) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSnackBar } = SnackBarSlice.actions;
export default SnackBarSlice.reducer;
