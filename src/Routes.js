import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main/Main";
import MainDetail from "./pages/MainDetail/MainDetail";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import MyPage from "./pages/MyPage/MyPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={MainDetail} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
