import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useDispatch, useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import { userSwitch } from "../../redux/actions/userActions";

const TongquanOption = (props) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(userSwitch());
    props.history.push("/");
  };

  return (
    <Container>
      {/* <Header title="Tổng quan" /> */}
      <Content>
        <Wrapper>
          <OptionCard onClick={() => props.history.push("/bophankd/tongquan")}>
            <Title>
              <h5>Bộ phận kinh doanh</h5>
              <ReceiptIcon fontSize="large" color="disabled" />
            </Title>
          </OptionCard>
          <OptionCard onClick={handleOnClick}>
            <Title>
              <h5>Giám sát vùng</h5>
              <LocationCityIcon fontSize="large" color="disabled" />
            </Title>
          </OptionCard>
        </Wrapper>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  /* background: #f0eeee; */
  padding: 0 36px;
`;
const Wrapper = styled.div`
  margin-top: 86px;
  display: flex;
  justify-content: center;
`;

const OptionCard = styled.div`
  width: 380px;
  padding: 68px 26px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  background: #fff;
  border-radius: 5px;
  transition: 0.3;
  border-left: 8px solid #ff3856;
  &:first-child {
    margin-right: 80px;
  }
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h5 {
    font-weight: bold;
    margin: 0;
  }
`;

export default TongquanOption;
