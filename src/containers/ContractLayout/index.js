import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { makeStyles } from "@material-ui/core";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import RunCode from "./views/RunCode";

import TopBar from "src/components/TopBar";

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

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const ContractLayout = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
      <div className={classes.root}>
        <TopBar />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Web3ReactProvider getLibrary={getLibrary}>
                <Switch>
                  <Route path={`${path}/run-code/:id`} component={RunCode} />
                </Switch>
              </Web3ReactProvider>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContractLayout;
