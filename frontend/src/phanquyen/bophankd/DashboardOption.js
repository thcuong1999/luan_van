import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, Route, NavLink } from "react-router-dom";
import { logout, switchPhanquyen } from "../../redux/actions/userActions";
import TongquanOption from "./TongquanOption";

const Dashboard = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  useEffect(() => {
    if (!userInfo.vaitro2) {
      props.history.push("/bophankd/tongquan");
    }
  }, []);

  return (
    <div id="bpkdDashboard">
      <div className="leftSide">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Craft Village</span>
        </div>

        <ul className="menu">
          <li>
            <Link to="#" className={props.match.isExact && "active"}>
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </Link>
          </li>

          <button className="btn btn-primary mt-4" onClick={handleLogout}>
            Dang xuat
          </button>
        </ul>
      </div>
      <div className="rightSide">
        <Route exact path="/bophankd" component={TongquanOption} />
      </div>
    </div>
  );
};

export default Dashboard;
