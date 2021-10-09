import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Congcu from "./Congcu";
import Hodan from "./Hodan";
import Phanphat from "./Phanphat";
import HodanThem from "./HodanThem";

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
            <NavLink to="/daily2/congcu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Công cụ</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/daily2/hodan" activeClassName="active">
              <i className="fab fa-magento"></i>
              <span>Hộ dân</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/daily2/phanphat" activeClassName="active">
              <i class="fas fa-th-list"></i>
              <span>C.Cụ phân phát đến</span>
            </NavLink>
          </li>

          <button className="btn btn-primary mt-4" onClick={handleLogout}>
            Dang xuat
          </button>
        </ul>
      </div>
      <div className="rightSide">
        <Route exact path="/daily2/hodan" component={Hodan} />
        <Route path="/daily2/hodan/them" component={HodanThem} />

        <Route exact path="/daily2" component={Tongquan} />
        <Route exact path="/daily2/congcu" component={Congcu} />

        <Route exact path="/daily2/phanphat" component={Phanphat} />
      </div>
    </div>
  );
};

export default Dashboard;
