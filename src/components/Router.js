import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/user/:userId" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
