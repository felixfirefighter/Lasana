import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/home/board" component={Board} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
