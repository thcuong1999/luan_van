import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GsvDashboard from "../../phanquyen/giamsatvung/GsvDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const GsvRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/giamsatvung" component={GsvDashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default GsvRoutes;
