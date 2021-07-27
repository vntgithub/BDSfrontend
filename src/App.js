import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignupPage from "./pages/Signup.Page";
import SignPage from "./pages/Signin.Page";
import ProductDetail from "./pages/ProductDetail.Page";
import Dashboard from "./pages/Dashobard.Page";
import { signInByToken } from "./slices/user";
import userApi from "./apis/user.api";
import { useDispatch } from "react-redux";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  
  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    if(token){
        const data = await userApi.signInByToken(token)
        if(data.id){
          dispatch(signInByToken(data))
        }
               
    }
}

  useEffect(() => {
    fetchUser();
  }, [])
  return (
      <Router>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/signup" exact component={SignupPage}/>
        <Route path="/signin" exact component={SignPage}/>
        <Route path="/productdetail/**" component={ProductDetail} />
      </Switch>
      </Router>
  );
}

export default App;
