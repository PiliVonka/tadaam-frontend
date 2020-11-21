import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TopBar from "src/components/TopBar";

import PosterListView from "./views/PosterListView";
import PosterView from "./views/PosterView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const PosterLayout = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route path={`${path}/:id`} component={PosterView} />
              <Route path={`${path}/`} component={PosterListView} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterLayout;
