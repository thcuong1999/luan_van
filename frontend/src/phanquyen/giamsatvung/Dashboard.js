import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
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
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";

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
              to="/giamsatvung/"
              activeClassName={props.match.path === "/giamsatvung" && "active"}
            >
              <i className="fas fa-hammer"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/langnghe" activeClassName="active">
              <i className="fas fa-hammer"></i>
              <span>Làng nghề</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/hodan" activeClassName="active">
              <i className="fab fa-magento"></i>
              <span>Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
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
