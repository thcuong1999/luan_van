import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Congcu from "./Congcu";
import Hodan from "./Hodan";
import Phanphat from "./Phanphat";
import HodanThem from "./HodanThem";
import PhanphatChitiet from "./PhanphatChitiet";
import PhanphatChuyentiep from "./PhanphatChuyentiep";
import PhanphatChitiet2 from "./PhanphatChitiet2";
import PhanphatChuyentiep2 from "./PhanphatChuyentiep2";
import Phanphat2 from "./Phanphat2";
import Vattu from "./Vattu";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import hodanIcon from "../../assets/icons/hodan.png";

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
              to="/daily2"
              activeClassName={props.match.path === "/daily2" && "active"}
            >
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily2/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily2/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily2/hodan" activeClassName="active">
              <Image src={hodanIcon} alt="home" />
              <span>Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily2/phanphat" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/daily2/vattuphanphat" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/daily2" component={Tongquan} />
        <Route exact path="/daily2/hodan" component={Hodan} />
        <Route path="/daily2/hodan/them" component={HodanThem} />
        <Route exact path="/daily2/congcu" component={Congcu} />
        <Route exact path="/daily2/phanphat" component={Phanphat} />
        <Route
          path="/daily2/phanphat/chitiet/:id"
          component={PhanphatChitiet}
        />
        <Route
          path="/daily2/phanphat/chuyentiep/:id"
          component={PhanphatChuyentiep}
        />
        <Route exact path="/daily2/vattu" component={Vattu} />
        <Route exact path="/daily2/vattuphanphat" component={Phanphat2} />
        <Route
          path="/daily2/vattuphanphat/chitiet/:id"
          component={PhanphatChitiet2}
        />
        <Route
          path="/daily2/vattuphanphat/chuyentiep/:id"
          component={PhanphatChuyentiep2}
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
const Image = styled.img`
  width: 22px;
`;

export default Dashboard;
