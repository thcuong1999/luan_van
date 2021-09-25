import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../../phanquyen/bophankd/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const BophankdRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute path="/bophankd" component={Dashboard} />
        <ProtectedRoute path="/bophankd/sanpham" component={Dashboard} />
        <ProtectedRoute
          path="/bophankd/sanpham/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute path="/bophankd/sanpham/them" component={Dashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default BophankdRoutes;
