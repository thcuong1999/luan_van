import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Bophankd from "./Bophankd";
import Daily1 from "./Daily1";
import Daily2 from "./Daily2";
import Hodan from "./Hodan";
import BophankdThem from "./BophankdThem";
import BophankdChitiet from "./BophankdChitiet";
import BophankdChinhsua from "./BophankdChinhsua";
import Daily1Them from "./Daily1Them";
import Daily1Chitiet from "./Daily1Chitiet";
import Daily1Chinhsua from "./Daily1Chinhsua";
import Daily2Chitiet from "./Daily2Chitiet";
import Daily2Chinhsua from "./Daily2Chinhsua";
import Daily2Them from "./Daily2Them";
import HodanThem from "./HodanThem";
import HodanChitiet from "./HodanChitiet";
import HodanChinhsua from "./HodanChinhsua";
import GSV from "./GSV";
import GSVThem from "./GSVThem";
import GSVChitiet from "./GSVChitiet";
import GSVChinhsua from "./GSVChinhsua";

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
          {/* <li>
            <NavLink to="/admin" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </NavLink>
          </li> */}

          <li>
            <NavLink to="/admin/bophankd" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Bộ phận kinh doanh</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/daily1" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Đại lý cấp 1</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/daily2" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Đại lý cấp 2</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/hodan" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Hộ dân</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/gsv" activeClassName="active">
              <i className="fas fa-home"></i>
              <span>Giám sát vùng</span>
            </NavLink>
          </li>

          <button className="btn btn-primary mt-4" onClick={handleLogout}>
            Dang xuat
          </button>
        </ul>
      </div>
      <div className="rightSide">
        <Route exact path="/admin" component={TongQuan} />
        <Route exact path="/admin/bophankd" component={Bophankd} />
        <Route path="/admin/bophankd/them" component={BophankdThem} />
        <Route path="/admin/bophankd/chitiet/:id" component={BophankdChitiet} />
        <Route
          path="/admin/bophankd/chinhsua/:id"
          component={BophankdChinhsua}
        />

        <Route exact path="/admin/daily1" component={Daily1} />
        <Route path="/admin/daily1/them" component={Daily1Them} />
        <Route path="/admin/daily1/chitiet/:id" component={Daily1Chitiet} />
        <Route path="/admin/daily1/chinhsua/:id" component={Daily1Chinhsua} />

        <Route exact path="/admin/daily2" component={Daily2} />
        <Route path="/admin/daily2/them" component={Daily2Them} />
        <Route path="/admin/daily2/chitiet/:id" component={Daily2Chitiet} />
        <Route path="/admin/daily2/chinhsua/:id" component={Daily2Chinhsua} />

        <Route exact path="/admin/hodan" component={Hodan} />
        <Route path="/admin/hodan/them" component={HodanThem} />
        <Route path="/admin/hodan/chitiet/:id" component={HodanChitiet} />
        <Route path="/admin/hodan/chinhsua/:id" component={HodanChinhsua} />

        <Route exact path="/admin/gsv" component={GSV} />
        <Route path="/admin/gsv/them" component={GSVThem} />
        <Route path="/admin/gsv/chitiet/:id" component={GSVChitiet} />
        <Route path="/admin/gsv/chinhsua/:id" component={GSVChinhsua} />
      </div>
    </div>
  );
};

export default Dashboard;
