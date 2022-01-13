import { ListHandler } from "../ListHandler/lists2";
import { EditWords } from "../ListHandler/editWords2";
import { AddList } from "../ListHandler/add2";
import { EditList } from "../ListHandler/edit2";
import { News } from "./news2";
////Material////
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, OverlayTrigger } from "react-bootstrap";
const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: "0.1ch",
    maxWidth: 1200,
    backgroundColor: "theme.palette.background.paper",
    margin: "11px 0px 11px 0px",
  },
  root: {
    backgroundColor: "var(--main-color-regular)",
    width: "205px",
    borderRight: "1px solid var(--main-color-light)",
    overflow: "hidden",
  },
  watchList: {
    overflowX: "hidden",
    height: "inherit",
    padding: "0px 1vw 0px 1vw",
    marginRight: "10px",
    backgroundColor: "var(--main-color-regular)",
    width: "calc(100% - 220px)",
    // border: "1px solid var(--main-color-regular-inner)",
  },
});

export const LeftTable = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item container direction="column" className={classes.root}>
        <div className="d-flex flex-row">
          <ListHandler />
          <OverlayTrigger
            trigger="click"
            placement={"right"}
            key={"right"}
            overlay={
              <Popover id={"popover-positioned-right"}>
                <Popover.Content
                  style={{ backgroundColor: "var(--main-color-light)" }}
                >
                  <AddList />
                  <EditList />
                </Popover.Content>
              </Popover>
            }
          >
            <IconButton style={{ padding: 2 }}>
              <MoreVertIcon />
            </IconButton>
          </OverlayTrigger>
        </div>
        <Divider className={classes.divider} />
        <EditWords />
      </Grid>
      <Grid item className={classes.watchList}>
        <News />
      </Grid>
    </>
  );
};
