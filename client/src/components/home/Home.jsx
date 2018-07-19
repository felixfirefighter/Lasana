import React, { Component } from "react";
import { Header, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FullContainer from "../common/FullContainer";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/board");
    }
  }

  render() {
    return (
      <FullContainer>
        <div>
          <Header as="h1" inverted textAlign="center">
            Lasana
          </Header>
          <Segment
            style={{ width: "500px", padding: "4rem", textAlign: "center" }}
          >
            <Header as="h2" content="Organize Your Work" />
            <Button basic secondary as={Link} to="login">
              Log In
            </Button>
            <Button primary as={Link} to="/register">
              Sign Up
            </Button>
          </Segment>
        </div>
      </FullContainer>
    );
  }
}

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState)(Home);
