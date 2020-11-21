import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userMutations } from "../../graphql/graphql";
import actions from "../../store/actions/actions";

const CheckIfLoggedIn = props => {
  console.log({ ...props });
  if (props.firstAuthValidationDone) return props.children;

  const [CheckIfLoggedIn, { data, loading, error }] = useMutation(userMutations.VERIFY_LOGGED_IN);

  useEffect(() => {
    CheckIfLoggedIn();
  }, []);

  if (loading || (!data && !error)) {
    return <Spin />;
  }
  console.log({ loading, data, error });
  if (data) {
    const { CheckIfLoggedIn: user } = data;
    props.setFirstAuthState(true, user);
  }

  if (error) {
    props.setFirstAuthState(false, null);
  }

  return props.children;
};

CheckIfLoggedIn.propTypes = {
  firstAuthValidationDone: PropTypes.bool.isRequired,
  setFirstAuthState: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    firstAuthValidationDone: state.auth.firstAuthValidationDone
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFirstAuthState: actions.setFirstAuthState
    },
    dispatch
  );
};

const connectedCheckIfLoggedIn = connect(mapStateToProps, mapDispatchToProps)(CheckIfLoggedIn);

export default connectedCheckIfLoggedIn;
