import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const Header = ({ title, onClick, titleBack, headerRight, arrOfLinks }) => {
  const [active, setActive] = useState(false);

  return (
    <Wrapper>
      {titleBack ? (
        <TitleBack onClick={onClick}>
          <i class="fas fa-angle-left"></i>
          <span>{title}</span>
        </TitleBack>
      ) : (
        <Title>{title}</Title>
      )}
      {!titleBack ? (
        <AvatarWrapper onClick={() => setActive(!active)}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 35, height: 35 }}
          />
          <span>Hoang Cuong Tran</span>
          <ExpandMoreIcon style={{ color: "#666" }} />
          <div className={`dropdown ${active && "active"}`}>
            <ul>
              {arrOfLinks &&
                arrOfLinks.map((link) => (
                  <li>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </AvatarWrapper>
      ) : (
        <HeaderRight>{headerRight}</HeaderRight>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  background: #fff;
  min-height: 50px;
`;
const Title = styled.h5`
  font-size: 18px;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;
const TitleBack = styled.h5`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  font-family: "Poppins", sans-serif;
  i {
    color: rgba(0, 0, 0, 0.35);
    margin-right: 10px;
    font-size: 20px;
  }
`;
const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 15px;
    margin-left: 10px;
    color: #444;
    font-family: "Poppins", sans-serif;
  }
  .dropdown {
    display: none;
    position: absolute;
    right: 0;
    background: #fff;
    top: 38px;
    left: -30%;
    z-index: 1;
    width: 130%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    ul {
      list-style: none;
      width: 100%;
      height: 100%;
      padding-top: 12px;
      li > a {
        display: block;
        padding: 10px 0 10px 26px;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.45);
        font-family: "Poppins", sans-serif;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
          font-weight: bold;
        }
      }
    }
    &.active {
      display: block;
    }
  }
`;
const HeaderRight = styled.div`
  display: flex;
`;

export default Header;
