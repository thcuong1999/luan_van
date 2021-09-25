import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import Daily2 from "./Daily2";
import Tongquan from "./Tongquan";
import ThemDaily2 from "./Daily2Them";
import { logout } from "../../redux/actions/userActions";
import ChitietDaily2 from "./Daily2Chitiet";
import ChinhsuaDaily2 from "./Daily2Chinhsua";
import Congcu from "./Congcu";
import CongcuThem from "./CongcuThem";
import CongcuChitiet from "./CongcuChitiet";
import CongcuChinhsua from "./CongcuChinhsua";
import PhanphatDen from "./PhanphatDen";
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
            <NavLink to="/daily1/congcu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Công cụ</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/daily1/daily2" activeClassName="active">
              <i className="fab fa-magento"></i>
              <span>Đại lý cấp 2</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/daily1/phanphat" activeClassName="active">
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
        <Route exact path="/daily1" component={Tongquan} />
        <Route exact path="/daily1/daily2" component={Daily2} />
        <Route path="/daily1/daily2/them" component={ThemDaily2} />
        <Route path="/daily1/daily2/chitiet/:id" component={ChitietDaily2} />
        <Route path="/daily1/daily2/chinhsua/:id" component={ChinhsuaDaily2} />
        <Route exact path="/daily1/congcu" component={Congcu} />
        <Route path="/daily1/congcu/them" component={CongcuThem} />
        <Route
          exact
          path="/daily1/congcu/chitiet/:id"
          component={CongcuChitiet}
        />
        <Route
          exact
          path="/daily1/congcu/chinhsua/:id"
          component={CongcuChinhsua}
        />
        <Route exact path="/daily1/phanphat" component={PhanphatDen} />
        <Route
          path="/daily1/phanphat/chitiet/:id"
          component={PhanphatChitiet}
        />
      </div>
    </div>
  );
};

export default Dashboard;
