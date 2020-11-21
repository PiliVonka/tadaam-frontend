import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import NavBar from "./NavBar";
import TopBar from "src/components/TopBar";

import DashboardView from "./views/DashboardView";
// import CustomerListView from "../../views/customer/CustomerListView";
import PosterListView from "./views/PosterListView";
import AddPosterView from "./views/AddPosterView";
import AccountView from "./views/AccountView";
import SettingsView from "./views/SettingsView";

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
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
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

const WorkerLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route exact path={`${path}/dashboard`} component={DashboardView} />
              <Route exact path={`${path}/posters`} component={PosterListView} />
              <Route exact path={`${path}/addposter`} component={AddPosterView} />
              <Route exact path={`${path}/account`} component={AccountView} />
              <Route exact path={`${path}/settings`} component={SettingsView} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerLayout;
