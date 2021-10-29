import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
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
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import Sanpham from "./Sanpham";
import SanphamThem from "./SanphamThem";
import SanphamChinhsua from "./SanphamChinhsua";
import SanphamChitiet from "./SanphamChitiet";
import SanphamLangngheChinhsua from "./SanphamLangngheChinhsua";
import SanphamLangnghe from "./SanphamLangnghe";
import SanphamLangngheThem from "./SanphamLangngheThem";
import SanphamLangngheChitiet from "./SanphamLangngheChitiet";
import Nhanhieu from "./Nhanhieu";
import NhanhieuThem from "./NhanhieuThem";
import NhanhieuChinhsua from "./NhanhieuChinhsua";
import NhanhieuChitiet from "./NhanhieuChitiet";
import homeIcon from "../../assets/icons/home.png";
import bpkdIcon from "../../assets/icons/bpkd.png";
import daily1Icon from "../../assets/icons/daily1.png";
import daily2Icon from "../../assets/icons/daily2.png";
import hodanIcon from "../../assets/icons/hodan.png";
import gsvIcon from "../../assets/icons/gsv.png";
import spIcon from "../../assets/icons/sp.png";
import nhanhieuIcon from "../../assets/icons/nhanhieu.png";
import splnIcon from "../../assets/icons/spln.png";

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
              to="/admin"
              activeClassName={props.match.path === "/admin" && "active"}
            >
              <Image src={homeIcon} alt="home" />
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/bophankd" activeClassName="active">
              <Image src={bpkdIcon} alt="bpkd" />
              <span>Bộ phận kinh doanh</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/daily1" activeClassName="active">
              <Image src={daily1Icon} alt="daily1" />
              <span>Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/daily2" activeClassName="active">
              <Image src={daily2Icon} alt="daily2" />
              <span>Đại lý cấp 2</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/hodan" activeClassName="active">
              <Image src={hodanIcon} alt="hodan" />
              <span>Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/gsv" activeClassName="active">
              <Image src={gsvIcon} alt="gsv" />
              <span>Giám sát vùng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/sanpham" activeClassName="active">
              <Image src={spIcon} alt="sanpham" />
              <span>Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/nhanhieu" activeClassName="active">
              <Image src={nhanhieuIcon} alt="nhanhieu" />
              <span>Nhãn hiệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/sanphamlangnghe" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span>Sản phẩm làng nghề</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
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

        <Route exact path="/admin/sanpham" component={Sanpham} />
        <Route path="/admin/sanpham/them" component={SanphamThem} />
        <Route path="/admin/sanpham/chitiet/:id" component={SanphamChitiet} />
        <Route path="/admin/sanpham/chinhsua/:id" component={SanphamChinhsua} />

        <Route
          exact
          path="/admin/sanphamlangnghe"
          component={SanphamLangnghe}
        />
        <Route
          path="/admin/sanphamlangnghe/them"
          component={SanphamLangngheThem}
        />
        <Route
          path="/admin/sanphamlangnghe/chitiet/:id"
          component={SanphamLangngheChitiet}
        />
        <Route
          path="/admin/sanphamlangnghe/chinhsua/:id"
          component={SanphamLangngheChinhsua}
        />

        <Route exact path="/admin/nhanhieu" component={Nhanhieu} />
        <Route path="/admin/nhanhieu/them" component={NhanhieuThem} />
        <Route path="/admin/nhanhieu/chitiet/:id" component={NhanhieuChitiet} />
        <Route
          path="/admin/nhanhieu/chinhsua/:id"
          component={NhanhieuChinhsua}
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
