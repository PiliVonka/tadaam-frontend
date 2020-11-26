// External
import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";

// Icons
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import RefreshIcon from "@material-ui/icons/Refresh";

import { Spin } from "antd";

import {
  CardContent,
  CardHeader,
  Container,
  Card,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

// Local
import { ADD_SUBMISSION, CHECK_SUBMISSION } from "src/graphql/mutations/submission";
import { GET_POSTER } from "src/graphql/queries/poster";

// Local components
import Editor from "src/components/Editor";
import Page from "src/components/Page";
import Wallet from "src/components/Wallet";

const statuses = {
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    maxWidth: 4000,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RunCode = ({ match }) => {
  // Init style
  const classes = useStyles();

  // Retrieve posterId from url params
  const { id: posterId } = match.params;

  // Init apollo queries
  const [addSubmission, addSubmissionResult] = useMutation(ADD_SUBMISSION);
  const [checkSubmission, checkSubmissionResult] = useMutation(CHECK_SUBMISSION);

  // Set code and run
  const [code, setCode] = useState("");
  const editorOnChange = useCallback((newCode) => {
    setCode(newCode);
  });
  const runCode = useCallback(() => {
    addSubmission({ variables: { code, posterId } });
  });

  // Callback to refresh the code result
  const refreshResult = useCallback(() => {
    const { loading, data, error } = addSubmissionResult;
    if (!loading && data && !error) {
      const { id } = data.addSubmission;
      checkSubmission({ variables: { id } });
    }
  });

  // Get poster
  const { loading: posterLoading, error: posterError, data: posterData } = useQuery(GET_POSTER, { variables: { id: posterId } });
  if (posterLoading || (!posterError && !posterData)) {
    return (
      <Spin />
    );
  }
  if (posterError) {
    return (
      <Page className={classes.root} title="Run Code">
        <Typography variant="body2" color="textSecondary" component="p">
          {JSON.stringify(posterError)}
        </Typography>
      </Page>
    );
  }
  const { title, description } = posterData.poster;

  const { error: resultError, data: resultData, loading: resultLoading } = checkSubmissionResult;
  const result = !resultLoading && (resultData || resultError)
    ? (resultError ? JSON.stringify(resultError) : JSON.stringify(resultData))
    : "";

  const { error: statusError, data: statusData, loading: statusLoading } = addSubmissionResult;
  const status = !statusLoading && (statusData || statusError)
    ? (statusError ? JSON.stringify(statusError) : JSON.stringify(statusData))
    : "";

  return (
      <Page className={classes.root} title="Run Code">
      <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item key="2" lg={5} sm={12} xl={5} xs={12}>
          <Card>
            <CardHeader
              title={"Actions"}
            />
            <CardContent>
              <IconButton onClick={runCode}>
                <PlayCircleFilledWhiteIcon/>
              </IconButton>
              <IconButton onClick={refreshResult}>
                <RefreshIcon/>
              </IconButton>
              <IconButton>
                <SaveAltIcon/>
              </IconButton>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title={"Description"}
            />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="h6">
                {title}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title={"Run status"}
            />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="p">
                {status}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={"Results"}
            />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="h6">
                {result}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title={"Your wallet info"}
            />
            <CardContent>
              <Wallet />
            </CardContent>
          </Card>
        </Grid>
        <Grid item key="1" lg={7} sm={12} xl={7} xs={12}>
          <Editor onChange={editorOnChange} code={code} />
        </Grid>
      </Grid>
      </Container>
    </Page>
  );
};

export default RunCode;
