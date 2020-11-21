import React from "react";
import { Spin } from "antd";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";

import Page from "src/components/Page";
import PosterCard from "src/components/PosterCard";
import { posterQueries } from "src/graphql/graphql";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  posterCard: {
    height: "%100"
  }
}));

const PosterListView = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(posterQueries.GET_POSTERS);
  if (loading || (!data && !error)) {
    return (
      <Spin />
    );
  }

  return (
    <Page className={classes.root} title="Posters">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {data.posters.map(poster => (
            <Grid item key={poster.id} lg={3} sm={6} xl={3} xs={12}>
              <PosterCard poster={poster} className={classes.posterCard}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default PosterListView;
