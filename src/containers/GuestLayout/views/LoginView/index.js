import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { message } from "antd";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import FacebookIcon from "src/icons/Facebook";
import GoogleIcon from "src/icons/Google";
import Page from "src/components/Page";
import validators from "src/validators/validators";
import { userMutations } from "src/graphql/graphql";
import actions from "src/store/actions/actions";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = props => {
  const classes = useStyles();
  // const navigate = useNavigate();

  const [LogIn] = useMutation(userMutations.LOG_IN);

  const handleSubmitForm = async (values, actions) => {
    const { email, password } = values;
    const { setErrors, setSubmitting } = actions;

    LogIn({ variables: { email, password } }).then(
      res => {
        props.setAuthUser(res.data.LogIn);
        message.success("Logged in successfully");
      },
      err => {
        setSubmitting(false);
        const errors = {};
        err.graphQLErrors.map(x => {
          console.log(x.message);
          // TODO NOT VERIFIED MESSAGE
          if (x.message.includes("email")) errors.email = "Email has already been taken.";
          if (x.message.includes("username")) errors.username = "Username has already been taken.";
        });
        setErrors({ auth: "Incorrect email or password.", errors });
      }
    );
  };

  return (
    <Page className={classes.root} title="Login">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "demo@devias.io",
              password: "Password123"
            }}
            validationSchema={validators.user.loginSchema}
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
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={1}>
                  <Typography align="center" color="textSecondary" variant="body1">
                    or login with email address
                  </Typography>
                </Box>
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/app/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAuthUser: actions.setAuthUser
    },
    dispatch
  );
};

LoginView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
