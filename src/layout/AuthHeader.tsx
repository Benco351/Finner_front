import { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { ContactButton } from "../components/Modals/Contact2";
import logo from "../assets/images/logo.png";
import { MarketTime } from "./MarketTime";

///Material///
import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
////Redux////
import { logOut } from "../redux/slices/user";
import { setUserData } from "../redux/slices/login";
import { useDispatch, useSelector } from "react-redux";

const MainNavBar = (props: any) => {
  const { history } = props;
  const handleMenuClick = (pageURL: string) => {
    history.push(pageURL);
  };
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const toggleHandler = () => {
    setOpen((prevOpen: boolean) => !prevOpen);
  };

  const closeHandler = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };
  const soundKey = useSelector((state: stateType) => state.userData.sound);
  const user = useSelector((state: stateType) => state.user);

  const [soundIcon, setSoundIcon] = useState(soundKey);

  useEffect(() => {
    setSoundIcon(soundKey);
  }, [soundKey]);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (
      !user.email.length &&
      !user.token.length &&
      !user.error.length &&
      !user.loading
    ) {
      history.push("/login");
    }
  }, [user, history]);
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const setSoundHandler = () => {
    if (soundKey) {
      dispatch(setUserData({ sound: false }));
      return;
    }
    dispatch(setUserData({ sound: true }));
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "var(--header-color)" }}>
      <Toolbar variant="dense">
        <img
          src={logo}
          alt=""
          className="cursor"
          style={{ maxWidth: "160px", marginRight: "8px", maxHeight: "50px" }}
          onClick={() => handleMenuClick("/")}
        />
        <div style={{ flex: 4 }}></div>
        <MarketTime />
        <IconButton size="small" onClick={setSoundHandler}>
          {soundIcon && <VolumeUpIcon fontSize="small" />}
          {!soundIcon && <VolumeOffIcon fontSize="small" />}
        </IconButton>
        <div>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={toggleHandler}
            size="small"
          >
            <MenuOpenIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper style={{ backgroundColor: "var(--main-color-regular)" }}>
                  <ClickAwayListener onClickAway={closeHandler}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        style={{ justifyContent: "center" }}
                        onClick={() => handleMenuClick("/feed")}
                      >
                        Main
                      </MenuItem>
                      <MenuItem
                        style={{ justifyContent: "center" }}
                        onClick={() => handleMenuClick("/dash-board")}
                      >
                        My account
                      </MenuItem>
                      <MenuItem>
                        <ContactButton />
                      </MenuItem>
                      <MenuItem
                        style={{ justifyContent: "center" }}
                        onClick={logoutHandler}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(MainNavBar);
