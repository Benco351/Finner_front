import { useState, useEffect, Suspense, lazy } from "react";
import { TwitterNews } from "./NewsFeed/table2";
import { Loading } from "../UI/Loading";
import { Divider } from "../UI/divider2";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const SymbolTracker = lazy(() => import("./symbolTrackerw"));

const useStyles = makeStyles({
  button: {
    fontSize: "0.8rem",
  },
  selectedButton: {
    fontSize: "0.8rem",
    color: "var(--blue-color)",
    backgroundColor: "var(--main-color-light-inner)",
  },
});

export const RightTable = () => {
  const classes = useStyles();
  const currentSymbol = useSelector(
    (state: stateType) => state.userData.currentSymbol
  );
  useEffect(() => {
    if (currentSymbol.show) {
      setSelectedTable("symbol-tracker");
    }
  }, [currentSymbol]);

  const [selectedTable, setSelectedTable] = useState("social-media");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onClick={() => setSelectedTable("social-media")}
          className={
            selectedTable === "symbol-tracker"
              ? classes.button
              : classes.selectedButton
          }
        >
          News feed
        </Button>
        <Button
          className={
            selectedTable === "symbol-tracker"
              ? classes.selectedButton
              : classes.button
          }
          onClick={() => setSelectedTable("symbol-tracker")}
        >
          Stock tracker
        </Button>
      </div>
      <Divider width={100} backgroundColor={"grey"} />
      <div style={{ height: "inherit" }}>
        {selectedTable === "social-media" && <TwitterNews />}
        <Suspense fallback={<Loading />}>
          {selectedTable === "symbol-tracker" && <SymbolTracker />}
        </Suspense>
      </div>
    </>
  );
};
