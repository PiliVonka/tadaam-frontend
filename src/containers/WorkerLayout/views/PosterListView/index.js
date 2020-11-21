import React, { useState, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import PosterCard from "src/components/PosterCard";
// import data1 from "./data";
import { useQuery } from "@apollo/react-hooks";
import { posterQueries } from "src/graphql/graphql";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: "100%"
  }
}));

const ProductList = () => {
  const classes = useStyles();
  // const [products] = useState(data1);
  const { loading, error, data } = useQuery(posterQueries.GET_POSTERS);
  console.log({ loading, error, data });
  return (
    <Page className={classes.root} title="Posters">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={2}>
          <Grid container spacing={3}>
            {loading === true || !data
              ? null
              : data.posters.map(poster => (
                <Grid item key={poster.id} lg={4} md={6} xs={12}>
                  <PosterCard
                    className={classes.productCard}
                    poster={poster}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
