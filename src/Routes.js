import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main/Main";
import Following from "./pages/Following/Following";
import MainDetail from "./pages/MainDetail/MainDetail";
import Signup from "./pages/Signup/Signup";
import MyPage from "./pages/MyPage/MyPage";
import Header from "./components/Header";
import PinBuilder from "./pages/MyPage/PinBuilder/PinBuilder";
import PinsFromBoard from "./pages/MyPage/Board/PinsFromBoard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/follows" component={Following} />
        <Route exact path="/detail/:id" component={MainDetail} />
        <Route exact path="/header" component={Header} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/pin-builder" component={PinBuilder} />
        <Route exact path="/boards/:id" component={PinsFromBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;
