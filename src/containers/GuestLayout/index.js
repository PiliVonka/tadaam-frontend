import React from "react";
import { makeStyles } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TopBar from "src/components/TopBar";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%"
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden"
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto"
  }
}));

const GuestLayout = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route path={`${path}/login`} component={LoginView} />
              <Route path={`${path}/register`} component={RegisterView} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
