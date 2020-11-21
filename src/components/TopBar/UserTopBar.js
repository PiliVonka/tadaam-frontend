import React, { useState, useEffect } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import PersonIcon from "@material-ui/icons/Person";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useMutation } from "@apollo/react-hooks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Logo from "src/components/Logo";
import { userMutations } from "src/graphql/graphql";
import actions from "src/store/actions/actions";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const UserTopBar = ({ className, onMobileNavOpen, removeAuthUser, user, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [LogOut, { data, loading, error }] = useMutation(userMutations.LOG_OUT);

  const handleLogOut = () => {
    LogOut();
  };

  if (!loading && !error && data) {
    removeAuthUser();
    return (
      <Redirect to={{ pathname: "/posters" }} />
    );
  }

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <IconButton color="inherit">
          <Badge badgeContent={notifications.length} color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" aria-controls="simple-menu" onClick={handleClick}>
          <PersonIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

UserTopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  user: PropTypes.object,
  removeAuthUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeAuthUser: actions.removeAuthUser
    },
    dispatch
  );
};

const ConnectedUserTopBar = connect(mapStateToProps, mapDispatchToProps)(UserTopBar);

export default ConnectedUserTopBar;
