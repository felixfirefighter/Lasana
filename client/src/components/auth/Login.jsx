import React, { Component } from "react";
import { Header, Segment, Form, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/authActions";

import FullContainer from "../common/FullContainer";

class Login extends Component {
  state = {
    email: "",
    password: "",
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

    const { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
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
              Log In
            </Header>
            <Form onSubmit={this.handleSubmit}>
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
              <Form.Field style={{ textAlign: "right" }}>
                <Button content="Log in" primary loading={loading} />
              </Form.Field>
            </Form>
          </Segment>
          <div className="center">
            <p style={{ color: "#fff", marginBottom: 0, marginRight: "1rem" }}>
              Don't have an account?
            </p>
            <Button as={Link} to="/register" inverted color="grey">
              Sign Up
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
)(Login);
