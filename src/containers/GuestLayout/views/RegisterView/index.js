import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import Page from "src/components/Page";

import validators from "src/validators/validators";
import { userMutations } from "src/graphql/graphql";
import EmailSent from "../EmailSent/EmailSent";
import { message } from "antd";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const [registeredEmail, setRegisteredEmail] = useState();
  const [SignUp] = useMutation(userMutations.SIGN_UP);

  const handleSubmitForm = async (values, actions) => {
    const { email, password, name, username } = values;
    const { setErrors, setSubmitting } = actions;

    SignUp({ variables: { email, password, name, username } }).then(
      res => {
        message.success(JSON.stringify(res));
        console.log({ res });
        setRegisteredEmail(email);
      },
      err => {
        console.log({ err });
        const errors = {};

        err.graphQLErrors.map(x => {
          if (x.message.includes("email")) {
            errors.email = "Email has already been taken.";
          }
          if (x.message.includes("username")) {
            errors.username = "Username has already been taken.";
          }
        });
        setSubmitting(false);
        setErrors(errors);
      }
    );
  };
  if (registeredEmail) {
    return <EmailSent email={registeredEmail} />;
  } else {
    return (
      <Page className={classes.root} title="Register">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                username: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                policy: false
              }}
              validationSchema={validators.user.registerSchema}
              onSubmit={(values, actions) => handleSubmitForm(values, actions)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="Username"
                    margin="normal"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm password"
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{" "}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/app/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    );
  }
};

export default RegisterView;
