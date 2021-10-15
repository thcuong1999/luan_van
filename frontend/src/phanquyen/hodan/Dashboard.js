import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Congcu from "./Congcu";
import Phanphat from "./Phanphat";
import PhanphatChitiet from "./PhanphatChitiet";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <div id="bpkdDashboard">
      <div className="leftSide">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Craft Village</span>
        </div>

        <ul className="menu">
          <li>
            <NavLink to="/hodan/congcu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Công cụ</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/hodan/phanphat" activeClassName="active">
              <i class="fas fa-th-list"></i>
              <span>Danh sách phân phát</span>
            </NavLink>
          </li>

          <button className="btn btn-primary mt-4" onClick={handleLogout}>
            Dang xuat
          </button>
        </ul>
      </div>
      <div className="rightSide">
        <Route exact path="/hodan" component={Tongquan} />
        <Route exact path="/hodan/congcu" component={Congcu} />

        <Route exact path="/hodan/phanphat" component={Phanphat} />
        <Route path="/hodan/phanphat/chitiet/:id" component={PhanphatChitiet} />
      </div>
    </div>
  );
};

export default Dashboard;
