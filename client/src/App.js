import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import NavContainer from "./components/layout/NavContainer";
import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/common/NotFound";

import Board from "./components/home/Board";

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <NavContainer>
                <PrivateRoute exact path="/home/board" component={Board} />
              </NavContainer>

              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
