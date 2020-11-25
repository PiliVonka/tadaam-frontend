import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useQuery } from "@apollo/react-hooks";

import {
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Card,
  Typography,
  IconButton
} from "@material-ui/core";

import {
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Code as CodeIcon
} from "@material-ui/icons";

import { Spin } from "antd";

// Graphql
import { posterQueries } from "src/graphql/graphql";

// Components
import Page from "src/components/Page";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    maxWidth: 1000,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PosterView = ({ match }) => {
  const { id } = match.params;
  const classes = useStyles();
  const { loading, error, data } = useQuery(posterQueries.GET_POSTER, { variables: { id } });
  if (loading || (!error && !data)) {
    return (
      <Spin />
    );
  }

  if (error) {
    return (
      <h1>{JSON.stringify(error)}</h1>
    );
  }
  console.log({ data, loading, error });

  const { poster } = data;
  return (
    <Page className={classes.root} title="Home">
      <Container maxWidth={true}>
        <Card className={classes.root}>
          <CardHeader
            title={poster.title}
            subheader="September 14, 2020"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {poster.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="show person">
              <PersonIcon />
            </IconButton>
            <IconButton aria-label="solve" href={`/contract/run-code/${id}`}>
              <CodeIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Container>
    </Page>
  );
};

export default PosterView;
