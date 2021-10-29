import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import bpkd from "../../assets/icons/bpkd2.png";
import daily1 from "../../assets/icons/daily1_2.png";
import daily2 from "../../assets/icons/daily2_2.png";
import hodan from "../../assets/icons/hodan2.png";
import apiBophankd from "../../axios/apiBophankd";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import apiHodan from "../../axios/apiHodan";
import BackdropMaterial from "../../components/BackdropMaterial";

const TongQuan = (props) => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    bpkd: 0,
    daily1: 0,
    daily2: 0,
    hodan: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.dsBophankd();
    const { daily1 } = await apiDaily1.dsDaily1();
    const { daily2 } = await apiDaily2.dsDaily2();
    const { hodan } = await apiHodan.dsHodan();
    setCounts({
      bpkd: bophankd.length,
      daily1: daily1.length,
      daily2: daily2.length,
      hodan: hodan.length,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Tổng quan" />
      <Content>
        <div className="row">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/bophankd")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.bpkd}</div>
                  <span>Bộ phận kinh doanh</span>
                </TextInfo>
                <Icon>
                  <Image src={bpkd} alt="bpkd" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/daily1")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.daily1}</div>
                  <span>Đại lý cấp 1</span>
                </TextInfo>
                <Icon>
                  <Image src={daily1} alt="daily1" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/daily2")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.daily2}</div>
                  <span>Đại lý cấp 2</span>
                </TextInfo>
                <Icon>
                  <Image src={daily2} alt="daily2" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/hodan")}>
              <CardContent>
                <TextInfo>
                  <div>{counts.hodan}</div>
                  <span>Hộ dân</span>
                </TextInfo>
                <Icon>
                  <Image src={hodan} alt="hodan" />
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Card = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  &:hover {
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.2);
  }
`;
const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextInfo = styled.div`
  div {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #0f73ba;
  }
  span {
    color: #777;
    font-size: 16px;
  }
`;
const Icon = styled.div``;
const Image = styled.img`
  width: 40px;
  opacity: 0.35;
`;

export default TongQuan;
