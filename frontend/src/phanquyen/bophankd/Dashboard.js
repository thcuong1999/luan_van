import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Sanpham from "./Sanpham";
import SanphamThem from "./SanphamThem";
import SanphamChinhsua from "./SanphamChinhsua";
import SanphamChitiet from "./SanphamChitiet";
import Congcu from "./Congcu";
import CongcuThem from "./CongcuThem";
import CongcuChitiet from "./CongcuChitiet";
import CongcuChinhsua from "./CongcuChinhsua";
import Khohang from "./Khohang";
import Daily1 from "./Daily1";
import Daily1Them from "./Daily1Them";
import Daily1Chitiet from "./Daily1Chitiet";
import Phanphat from "./Phanphat";
import PhanphatChitiet from "./PhanphatChitiet";
import PhanphatThem from "./PhanphatThem";
import PhanphatChinhsua from "./PhanphatChinhsua";

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
            <Link to="/bophankd" className={props.match.isExact && "active"}>
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </Link>
          </li>

          <li>
            <NavLink to="/bophankd/sanpham" activeClassName="active">
              <i className="fas fa-carrot"></i>
              <span>Sản phẩm</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/bophankd/congcu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Công cụ</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/bophankd/khohang" activeClassName="active">
              <i className="fas fa-warehouse"></i>
              <span>Kho hàng</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/bophankd/daily1" activeClassName="active">
              <i className="fab fa-magento"></i>
              <span>Đại lý cấp 1</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/bophankd/phanphat" activeClassName="active">
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
        <Route exact path="/bophankd" component={TongQuan} />
        <Route exact path="/bophankd/sanpham" component={Sanpham} />
        <Route path="/bophankd/sanpham/them" component={SanphamThem} />
        <Route
          path="/bophankd/sanpham/chitiet/:id"
          component={SanphamChitiet}
        />
        <Route
          path="/bophankd/sanpham/chinhsua/:id"
          component={SanphamChinhsua}
        />
        <Route exact path="/bophankd/congcu" component={Congcu} />
        <Route path="/bophankd/congcu/them" component={CongcuThem} />
        <Route path="/bophankd/congcu/chitiet/:id" component={CongcuChitiet} />
        <Route
          path="/bophankd/congcu/chinhsua/:id"
          component={CongcuChinhsua}
        />
        <Route exact path="/bophankd/khohang" component={Khohang} />
        <Route exact path="/bophankd/daily1" component={Daily1} />
        <Route path="/bophankd/daily1/them" component={Daily1Them} />
        <Route path="/bophankd/daily1/chitiet/:id" component={Daily1Chitiet} />

        <Route exact path="/bophankd/phanphat" component={Phanphat} />
        <Route path="/bophankd/phanphat/them" component={PhanphatThem} />
        <Route
          path="/bophankd/phanphat/chitiet/:id"
          component={PhanphatChitiet}
        />
        <Route
          path="/bophankd/phanphat/chinhsua/:id"
          component={PhanphatChinhsua}
        />
      </div>
    </div>
  );
};

export default Dashboard;
