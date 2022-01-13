import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setLists } from "../../redux/slices/userLists";
import { getWatchListHandler } from "../../redux/slices/watchListNews";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        padding: theme.spacing(0),
        width: "clamp(18ch, 20ch , 22ch)",
      },
    },
    cssLabel: {
      color: "black",
    },
  })
);

export const ListHandler = () => {
  const dispatch = useDispatch();
  const allLists = useSelector(
    (state: stateType) => state.watchLists.watchLists
  );
  const watchListsData = useSelector((state: stateType) => state.watchLists);
  const user = useSelector((state: stateType) => state.user);
  const classes = useStyles();
  const [title, setTitle] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    const result: list[] = allLists.filter(
      (keyList: list) => keyList.title === event.target.value
    );
    const newCurrentList: list = result[0];
    const payload = {
      currentList: { title: newCurrentList.title, words: newCurrentList.words },
    };
    dispatch(setLists(payload));
    dispatch(
      getWatchListHandler({
        token: user.token,
        watchListSearch: watchListsData.watchListSearch,
        currentList: watchListsData.currentList,
      })
    );
  };

  useEffect(() => {
    if (watchListsData.currentList?.title) {
      setTitle(watchListsData.currentList.title);
    }
  }, [watchListsData.currentList]);

  return (
    <Grid item>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          select
          value={title}
          onChange={handleChange}
          SelectProps={{ native: true }}
          inputProps={{
            style: {
              color: "var(--orange-color)",
              height: "16px",
              fontSize: "16px",
            },
          }}
          size="small"
        >
          {allLists &&
            allLists?.map((option: list) => (
              <option key={option.title} value={option.title}>
                {option.title.length > 0 ? option.title : "Select watchlist"}
              </option>
            ))}
        </TextField>
      </form>
    </Grid>
  );
};
