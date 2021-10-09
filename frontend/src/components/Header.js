import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = ({ title, onClick, titleBack, headerRight }) => {
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
        <AvatarWrapper>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 35, height: 35 }}
          />
          <span>Hoang Cuong Tran</span>
          <ExpandMoreIcon style={{ color: "#666" }} />
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
`;

const TitleBack = styled.h5`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  i {
    color: rgba(0, 0, 0, 0.35);
    margin-right: 10px;
    font-size: 20px;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 15px;
    margin-left: 10px;
    color: #444;
  }
`;

const HeaderRight = styled.div`
  display: flex;
`;

export default Header;
