import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import HodanDashboard from "../../phanquyen/hodan/HodanDashboard";

const HodanRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/hodan" component={HodanDashboard} />
      </Switch>
    </Router>
  );
};

export default HodanRoutes;
