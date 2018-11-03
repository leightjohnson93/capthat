import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Profile} />
      <Route exact path="/user" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
