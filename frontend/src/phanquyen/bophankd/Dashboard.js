import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Sanpham from "./Sanpham";
import SanphamThem from "./SanphamThem";
import SanphamChitiet from "./SanphamChitiet";
import Congcu from "./Congcu";
import CongcuThem from "./CongcuThem";
import CongcuChitiet from "./CongcuChitiet";
import CongcuChinhsua from "./CongcuChinhsua";
import Khohang from "./Khohang";
import Daily1 from "./Daily1";
import Daily1Them from "./Daily1Them";
import Phanphat from "./Phanphat";
import PhanphatChitiet from "./PhanphatChitiet";
import PhanphatThem from "./PhanphatThem";
import PhanphatChinhsua from "./PhanphatChinhsua";
import Vattu from "./Vattu";
import VattuThem from "./VattuThem";
import VattuChinhsua from "./VattuChinhsua";
import Nguyenlieu from "./Nguyenlieu";
import NguyenlieuThem from "./NguyenlieuThem";
import NguyenlieuChinhsua from "./NguyenlieuChinhsua";
import VattuChitiet from "./VattuChitiet";
import NguyenlieuChitiet from "./NguyenlieuChitiet";
import CongcuHuloiThem from "./CongcuHuloiThem";
import CongcuHuloiThem2 from "./CongcuHuloiThem2";
import VattuHuloiThem from "./VattuHuloiThem";
import VattuHuloiThem2 from "./VattuHuloiThem2";
import Phanphat2 from "./Phanphat2";
import PhanphatThem2 from "./PhanphatThem2";
import PhanphatChitiet2 from "./PhanphatChitiet2";
import TheodoiBaocao from "./TheodoiBaocao";
import ChitietHodan from "./ChitietHodan";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import Daily1Chitiet from "./Daily1Chitiet";
import splnIcon from "../../assets/icons/spln.png";
import daily1Icon from "../../assets/icons/daily1.png";

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
              to="/bophankd"
              activeClassName={props.match.path === "/bophankd" && "active"}
            >
              <i className="fas fa-home"></i>
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span>Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span>Nguyên liệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          {/* <MenuItem>
            <NavLink to="/bophankd/khohang" activeClassName="active">
              <i className="fas fa-warehouse"></i>
              <span>Kho hàng</span>
            </NavLink>
          </MenuItem> */}

          <MenuItem>
            <NavLink to="/bophankd/daily1" activeClassName="active">
              <Image src={daily1Icon} alt="splangnghe" />
              <span>Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/phanphat" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/vattuphanphat" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư phân phát</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/theodoibaocao" activeClassName="active">
              <i class="fas fa-newspaper"></i>
              <span>Theo dõi báo cáo</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/bophankd" component={TongQuan} />
        <Route exact path="/bophankd/sanpham" component={Sanpham} />
        <Route path="/bophankd/sanpham/them" component={SanphamThem} />
        <Route
          path="/bophankd/sanpham/chitiet/:id"
          component={SanphamChitiet}
        />
        <Route exact path="/bophankd/congcu" component={Congcu} />
        <Route path="/bophankd/congcu/them" component={CongcuThem} />
        <Route path="/bophankd/congcu/chitiet/:id" component={CongcuChitiet} />
        <Route
          path="/bophankd/congcu/chinhsua/:id"
          component={CongcuChinhsua}
        />
        <Route path="/bophankd/congcu/huloi/them" component={CongcuHuloiThem} />
        <Route
          path="/bophankd/congcu/huloi/them2"
          component={CongcuHuloiThem2}
        />
        <Route exact path="/bophankd/khohang" component={Khohang} />
        <Route exact path="/bophankd/daily1" component={Daily1} />
        <Route path="/bophankd/daily1/them" component={Daily1Them} />
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
        <Route exact path="/bophankd/vattu" component={Vattu} />
        <Route path="/bophankd/vattu/them" component={VattuThem} />
        <Route path="/bophankd/vattu/chinhsua/:id" component={VattuChinhsua} />
        <Route path="/bophankd/vattu/chitiet/:id" component={VattuChitiet} />
        <Route path="/bophankd/vattu/huloi/them" component={VattuHuloiThem} />
        <Route path="/bophankd/vattu/huloi/them2" component={VattuHuloiThem2} />
        <Route exact path="/bophankd/nguyenlieu" component={Nguyenlieu} />
        <Route path="/bophankd/nguyenlieu/them" component={NguyenlieuThem} />
        <Route
          path="/bophankd/nguyenlieu/chinhsua/:id"
          component={NguyenlieuChinhsua}
        />
        <Route
          path="/bophankd/nguyenlieu/chitiet/:id"
          component={NguyenlieuChitiet}
        />
        <Route exact path="/bophankd/vattuphanphat" component={Phanphat2} />
        <Route path="/bophankd/vattuphanphat/them" component={PhanphatThem2} />
        <Route
          path="/bophankd/vattuphanphat/chitiet/:id"
          component={PhanphatChitiet2}
        />
        <Route exact path="/bophankd/theodoibaocao" component={TheodoiBaocao} />
        <Route
          path="/bophankd/theodoibaocao/hodan/:id"
          component={ChitietHodan}
        />
        <Route path="/bophankd/daily1/chitiet/:id" component={Daily1Chitiet} />
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
