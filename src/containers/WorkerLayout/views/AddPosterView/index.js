// External
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { message } from "antd";

// Local
import Page from "src/components/Page";
import { posterMutations } from "src/graphql/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddPosterView = () => {
  const classes = useStyles();
  const [AddPoster] = useMutation(posterMutations.ADD_POSTER);

  const handleSubmitForm = async (values, actions) => {
    const { title, description, stdin, stdout } = values;
    // const { setErrors, setSubmitting } = actions;
    console.log({ title, description, stdin, stdout });

    AddPoster({ variables: { title, description, stdin, stdout } }).then(
      (res) => {
        message.success(JSON.stringify(res));
        console.log({ res });
      },
      (err) => {
        const errors = {};
        console.log({ err });
        err.graphQLErrors.map(x => {
          if (x.message.includes("email")) {
            errors.email = "Email has already been taken.";
          }
          if (x.message.includes("username")) {
            errors.username = "Username has already been taken.";
          }
          return x;
        });
        // setSubmitting(false);
        // setErrors(errors);
        alert(JSON.stringify(err));
      }
    );
  };

  return (
    <Page className={classes.root} title="Post">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              title: "",
              description: "",
              stdin: "",
              stdout: "",
            }}
            onSubmit={(values, actions) => handleSubmitForm(values, actions)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  rows={10}
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  variant="outlined"
                />
                <TextField
                  label="Input"
                  margin="normal"
                  name="stdin"
                  rows={10}
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stdin}
                  variant="outlined"
                />
                <TextField
                  label="Output"
                  margin="normal"
                  name="stdout"
                  rows={10}
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stdout}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Post
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default AddPosterView;
