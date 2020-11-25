// External
import React, { useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import CodeIcon from "@material-ui/icons/Code";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import {
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Card,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

// Local components
import Editor from "src/components/Editor";
import Page from "src/components/Page";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    maxWidth: 4000,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    1337, // local
  ],
});

const RunCode = () => {
  const { chainId, account, activate, active } = useWeb3React();
  useEffect(() => {
    // activate(injectedConnector);
  });
  const classes = useStyles();

  return (
      <Page className={classes.root} title="Run Code">
      <Container maxWidth={true}>
      <Grid container spacing={3}>
        <Grid item key="2" lg={5} sm={12} xl={5} xs={12}>
          <Card>
            <CardHeader
              title={"Actions"}
              subheader="Press button"
            />
            <CardContent>
            <IconButton>
                <PlayCircleFilledWhiteIcon/>
              </IconButton>
              <IconButton>
                <CodeIcon/>
              </IconButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={"Your wallet info"}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <div>ChainId: {chainId}</div>
                <div>Account: {account}</div>
                <div>Active: {active}</div>
                {active ? (<div> Done </div>) : null }
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={"Description"}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="p" color="textSecondary" component="p">
                Write a function, which adds two numbers
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Input: 4, 5
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Output: 9
              </Typography>

            </CardContent>
          </Card>
        </Grid>
        <Grid item key="1" lg={7} sm={12} xl={7} xs={12}>
        <Editor />
        </Grid>
      </Grid>
      </Container>
    </Page>
  );
};

export default RunCode;
