import firebase from "firebase/app";
import "firebase/auth";
const serviceAccount = require("./FireBase.json");
const app = firebase.initializeApp(serviceAccount);
export const auth = app.auth();
export default app;
