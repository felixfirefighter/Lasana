import React, { Component } from "react";
import { Form, Segment, Header, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FullContainer from "../common/FullContainer";
import * as actions from "../../actions/authActions";

class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ loading: true });

    const { email, password, password2 } = this.state;
    this.props.register({ email, password, password2 }, this.props.history);
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <FullContainer>
        <div>
          <Header as="h1" inverted textAlign="center">
            Lasana
          </Header>
          <Segment className="auth-segment">
            <Header as="h2" textAlign="center" color="grey">
              Sign Up
            </Header>
            <Form error onSubmit={this.handleSubmit}>
              <Form.Input
                label="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                error={errors.email != null}
              />
              {errors.email != null && (
                <Label content={errors.email} color="red" />
              )}

              <Form.Input
                label="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
                error={errors.password != null}
              />
              {errors.password != null && (
                <Label content={errors.password} color="red" />
              )}
              <Form.Input
                label="Confirm Password"
                name="password2"
                type="password"
                onChange={this.handleChange}
                error={errors.password2 != null}
              />
              {errors.password2 != null && (
                <Label content={errors.password2} color="red" />
              )}
              <Form.Field style={{ textAlign: "right" }}>
                <Button content="Sign up" primary loading={loading} />
              </Form.Field>
            </Form>
          </Segment>
          <div className="center">
            <p style={{ color: "#fff", marginBottom: 0, marginRight: "1rem" }}>
              Already have an account?
            </p>
            <Button as={Link} to="/login" inverted color="grey">
              Log in
            </Button>
          </div>
        </div>
      </FullContainer>
    );
  }
}

const mapState = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapState,
  actions
)(Register);
