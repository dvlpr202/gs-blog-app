import React, { useContext } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    handleClose();
    navigate("/login");
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderList = () => {
    if (state) {
      return [
        <IconButton
        size="large"
        aria-label="search"
        color="inherit"
        component={ Link }
        to="/search "
        >
          <SearchIcon />
        </IconButton>,
        <Button variant="standard" component={Link} to="/" className="btn-nav">
          RECENT POSTS
        </Button>,
        <Button
          variant="standard"
          className="btn-nav"
          component={Link}
          to="/newpost"
        >
          NEW POST
        </Button>,
        <Button
          variant="standard"
          className="btn-nav"
          component={Link}
          to="/profile"
        >
          PROFILE
        </Button>,
        <Button
          variant="standard"
          className="btn-nav"
          onClick={handleClickOpen}
          sx={{
            "&:hover": {
              color: "#aa2e25",
            },
          }}
        >
          Logout
        </Button>,
      ];
    } else {
      return [
        <Button variant="standard" component={Link} to="/" className="btn-nav">
          RECENT POSTS
        </Button>,
        <Button
          variant="standard"
          className="btn-nav"
          component={Link}
          to="login"
        >
          LOGIN
        </Button>,
        <Button
          variant="standard"
          component={Link}
          to="/register"
          className="btn-nav"
        >
          Register
        </Button>,
      ];
    }
  };
  return (
    <React.Fragment>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item sx={12} sm={12} md={6} lg={6}>
              <Typography variant="h4" color="common.white" component={ Link } to="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  color: "white",
                  textDecoration: "none"
                }
              }}
              >
                {props.blogName}
              </Typography>
            </Grid>

            <Grid
              container
              item
              justifyContent="flex-end"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <ButtonGroup>{renderList()}</ButtonGroup>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Keep Me Signed In</Button>
          <Button
            onClick={logOut}
            autoFocus
            sx={{
              color: "#aa2e25",
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NavBar;
