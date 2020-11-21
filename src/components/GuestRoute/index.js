import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ component: Component, loggedIn, user, ...rest }) => {
  console.log({ loggedIn });
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Redirect to={{ pathname: "/worker/dashboard", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

GuestRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  Component: PropTypes.elementType,
  user: PropTypes.object
};

const ConnectedGuestRoute = connect(mapStateToProps)(GuestRoute);

export default ConnectedGuestRoute;
