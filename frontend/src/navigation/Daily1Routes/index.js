import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../../phanquyen/daily1/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const Daily1Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/daily1" component={Dashboard} />
        <ProtectedRoute exact path="/daily1/daily2" component={Dashboard} />
        <ProtectedRoute path="/daily1/daily2/them" component={Dashboard} />
        <ProtectedRoute
          path="/daily1/daily2/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/daily1/daily2/chinhsua/:id"
          component={Dashboard}
        />

        <ProtectedRoute exact path="/daily1/congcu" component={Dashboard} />
        <ProtectedRoute path="/daily1/congcu/them" component={Dashboard} />
        <ProtectedRoute
          path="/daily1/congcu/chitiet/:id"
          component={Dashboard}
        />

        <ProtectedRoute exact path="/daily1/vattu" component={Dashboard} />
        <ProtectedRoute path="/daily1/vattu/them" component={Dashboard} />
        <ProtectedRoute
          exact
          path="/daily1/vattu/chitiet/:id"
          component={Dashboard}
        />

        <ProtectedRoute
          path="/daily1/congcu/chinhsua/:id"
          component={Dashboard}
        />
        <ProtectedRoute exact path="/daily1/phanphat" component={Dashboard} />
        <ProtectedRoute
          path="/daily1/phanphat/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/daily1/phanphat/chuyentiep/:id"
          component={Dashboard}
        />
        {/* //================== */}
        <ProtectedRoute
          exact
          path="/daily1/vattuphanphat"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/daily1/vattuphanphat/chitiet/:id"
          component={Dashboard}
        />
        <ProtectedRoute
          path="/daily1/vattuphanphat/chuyentiep/:id"
          component={Dashboard}
        />

        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default Daily1Routes;
