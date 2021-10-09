import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Langnghe from "./Langnghe";
import Hodan from "./Hodan";
import LangngheThem from "./LangngheThem";
import LangngheChinhsua from "./LangngheChinhsua";
import HodanThem from "./HodanThem";
import HodanChitiet from "./HodanChitiet";
import HodanChinhsua from "./HodanChinhsua";
import LangngheChitiet from "./LangngheChitiet";

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
            <NavLink to="/giamsatvung/langnghe" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Làng nghề</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/giamsatvung/hodan" activeClassName="active">
              <i className="fab fa-magento"></i>
              <span>Hộ dân</span>
            </NavLink>
          </li>

          <button className="btn btn-primary mt-4" onClick={handleLogout}>
            Dang xuat
          </button>
        </ul>
      </div>
      <div className="rightSide">
        <Route exact path="/giamsatvung" component={Tongquan} />

        <Route exact path="/giamsatvung/langnghe" component={Langnghe} />
        <Route path="/giamsatvung/langnghe/them" component={LangngheThem} />
        <Route
          path="/giamsatvung/langnghe/chinhsua/:id"
          component={LangngheChinhsua}
        />
        <Route
          path="/giamsatvung/langnghe/chitiet/:id"
          component={LangngheChitiet}
        />

        <Route exact path="/giamsatvung/hodan" component={Hodan} />
        <Route path="/giamsatvung/hodan/them" component={HodanThem} />
        <Route path="/giamsatvung/hodan/chitiet/:id" component={HodanChitiet} />
        <Route
          path="/giamsatvung/hodan/chinhsua/:id"
          component={HodanChinhsua}
        />
      </div>
    </div>
  );
};

export default Dashboard;
