import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Congcu from "./Congcu";
import Phanphat from "./Phanphat";
import PhanphatChitiet from "./PhanphatChitiet";
import Phanphat2 from "./Phanphat2";
import PhanphatChitiet2 from "./PhanphatChitiet2";
import Vattu from "./Vattu";
import Tiendo from "./Tiendo";
import TiendoThem from "./TiendoThem";
import TiendoChinhsua from "./TiendoChinhsua";
import TiendoChitiet from "./TiendoChitiet";
import BaocaoThem from "./BaocaoThem";
import BaocaoChitiet from "./BaocaoChitiet";
import BaocaoChinhsua from "./BaocaoChinhsua";
import styled from "styled-components";
import LogoutButton from "../../components/LogoutButton";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <Container>
      <LeftMenu>
        <Logo>
          <img src={logo} alt="logo" />
          <span>Craft Village</span>
        </Logo>

        <Menu>
          <MenuItem>
            <NavLink
              to="/hodan"
              activeClassName={props.match.path === "/hodan" && "active"}
            >
              <i className="fas fa-hammer"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/hodan/congcu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/hodan/vattu" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/hodan/phanphat" activeClassName="active">
              <i class="fas fa-th-list"></i>
              <span>Công cụ phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/hodan/vattuphanphat" activeClassName="active">
              <i class="fas fa-th-list"></i>
              <span>Vật tư phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/hodan/tiendo" activeClassName="active">
              <i class="fas fa-th-list"></i>
              <span>Báo cáo tiến độ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/hodan" component={Tongquan} />
        <Route exact path="/hodan/congcu" component={Congcu} />
        <Route exact path="/hodan/phanphat" component={Phanphat} />
        <Route path="/hodan/phanphat/chitiet/:id" component={PhanphatChitiet} />
        <Route exact path="/hodan/vattuphanphat" component={Phanphat2} />
        <Route
          path="/hodan/vattuphanphat/chitiet/:id"
          component={PhanphatChitiet2}
        />
        <Route exact path="/hodan/vattu" component={Vattu} />
        <Route exact path="/hodan/tiendo" component={Tiendo} />
        <Route path="/hodan/tiendo/them" component={TiendoThem} />
        <Route path="/hodan/tiendo/chinhsua/:id" component={TiendoChinhsua} />
        <Route
          exact
          path="/hodan/tiendo/chitiet/:id"
          component={TiendoChitiet}
        />
        <Route
          path="/hodan/tiendo/chitiet/:idtiendo/baocao/them"
          component={BaocaoThem}
        />
        <Route
          path="/hodan/tiendo/chitiet/:idtiendo/baocao/chitiet/:idbaocao"
          component={BaocaoChitiet}
        />
        <Route
          path="/hodan/tiendo/chitiet/:idtiendo/baocao/chinhsua/:idbaocao"
          component={BaocaoChinhsua}
        />
      </RightContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const LeftMenu = styled.div`
  width: 230px;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  background-color: #202d3f;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);

  img {
    width: 30px;
  }

  span {
    font-size: 20px;
    margin-left: 8px;
    color: #fff;
    font-weight: bold;
  }
`;
const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const MenuItem = styled.li`
  display: block;

  a {
    display: block;
    text-decoration: none;
    padding: 12px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    i {
      color: #cad6e2;
      font-size: 22px;
    }
    span {
      color: #cad6e2;
      margin-left: 14px;
    }
    &:hover {
      background: #304664;
      i,
      span {
        color: #fff;
      }
    }
    &.active {
      background: #2e96e0;
      i,
      span {
        color: #fff;
      }
    }
  }
`;
const RightContent = styled.div`
  margin-left: 230px;
  flex: 1;
`;

export default Dashboard;
