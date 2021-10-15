import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../../phanquyen/daily2/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const Daily2Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/daily2" component={Dashboard} />
        <ProtectedRoute exact path="/daily2/congcu" component={Dashboard} />
        <ProtectedRoute exact path="/daily2/hodan" component={Dashboard} />
        <ProtectedRoute path="/daily2/hodan/them" component={Dashboard} />
        <ProtectedRoute exact path="/daily2/phanphat" component={Dashboard} />
        <ProtectedRoute
          path="/daily2/phanphat/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/daily2/phanphat/chuyentiep/:id"
          component={Dashboard}
        />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default Daily2Routes;
