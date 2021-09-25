import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "../../phanquyen/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const AdminRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/admin" component={AdminDashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default AdminRoutes;
