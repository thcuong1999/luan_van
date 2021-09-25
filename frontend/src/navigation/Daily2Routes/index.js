import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Daily2Dashboard from "../../phanquyen/daily2/Daily2Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const Daily2Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/daily2" component={Daily2Dashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default Daily2Routes;
