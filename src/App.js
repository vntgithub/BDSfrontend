import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignupPage from "./pages/Signup.Page";
import LoginPage from "./pages/Login.Page";
import HomePage from "./pages/Home.Page";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/signup" exact component={SignupPage}/>
        <Route path="/signup" exact component={LoginPage}/>
      </Switch>
    </Router>
  );
}

export default App;
