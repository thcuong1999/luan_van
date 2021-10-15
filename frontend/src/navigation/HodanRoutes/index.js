import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import Dashboard from "../../phanquyen/hodan/Dashboard";
import NotfoundPage from "../../components/NotfoundPage";

const HodanRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/hodan" component={Dashboard} />
        <ProtectedRoute exact path="/hodan/congcu" component={Dashboard} />
        <ProtectedRoute exact path="/hodan/hodan" component={Dashboard} />
        <ProtectedRoute path="/hodan/hodan/them" component={Dashboard} />
        <ProtectedRoute exact path="/hodan/phanphat" component={Dashboard} />
        <ProtectedRoute
          path="/hodan/phanphat/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/hodan/phanphat/chuyentiep/:id"
          component={Dashboard}
        />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default HodanRoutes;
