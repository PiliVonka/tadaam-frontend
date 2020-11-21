import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./src/components/PrivateRoute";
import GuestRoute from "./src/components/GuestRoute";
import CheckIfLoggedIn from "./src/components/CheckIfLoggedIn";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import WorkerLayout from "./src/containers/WorkerLayout";
import GuestLayout from "./src/containers/GuestLayout";
import MainLayout from "./src/containers/PosterLayout";
import ContractLayout from "./src/containers/ContractLayout";

import GlobalStyles from "./src/components/GlobalStyles";

const App = props => {
  return (
    <ConnectedRouter history={props.history}>
      <CheckIfLoggedIn>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Switch>
            <PrivateRoute path="/worker" component={WorkerLayout} />
            <GuestRoute path="/app" component={GuestLayout} />
            <Route path="/posters" component={MainLayout} />
            <Route path="/contract" component={ContractLayout} />
          </Switch>
        </ThemeProvider>
      </CheckIfLoggedIn>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
