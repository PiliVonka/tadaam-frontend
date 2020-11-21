import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserTopBar from "./UserTopBar";
import GuestTopBar from "./GuestTopBar";

const TopBar = ({ loggedIn, user, ...rest }) => {
  if (loggedIn) {
    return (
      <UserTopBar {...rest}/>
    );
  }
  return (
    <GuestTopBar {...rest} />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

TopBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const ConnectedTopBar = connect(mapStateToProps)(TopBar);

export default ConnectedTopBar;
