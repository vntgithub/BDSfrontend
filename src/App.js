import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignupPage from "./pages/Signup.Page";
import SignPage from "./pages/Signin.Page";
import HomePage from "./pages/Home.Page";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/signup" exact component={SignupPage}/>
        <Route path="/signin" exact component={SignPage}/>
      </Switch>
    </Router>
  );
}

export default App;
