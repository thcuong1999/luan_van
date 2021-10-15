import React from "react";
import apiPhanphat from "../../axios/apiPhanphat";
import BackdropMaterial from "../../components/BackdropMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import styled from "styled-components";
import Header from "../../components/Header";
import TablePhanphatDen from "./tables/TablePhanphatDen";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import apiHodan from "../../axios/apiHodan";

const Phanphat = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [dsPhanphat, setDsPhanphat] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsPhanphat = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodanBasedUser(userInfo._id);
    const { dsphanphat } = await apiHodan.dsPhanphat(hodan._id);
    // console.log(data);
    setDsPhanphat(dsphanphat);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchDsPhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Danh sách phân phát" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/bophankd/congcu")}
          >
            Thêm phân phát
          </ButtonMaterial>
        </BtnRight>
        <FilterSection>
          <TitleWrapper>
            <Title>Danh sách phân phát đến</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim công cụ theo tên, công dụng"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TablePhanphatDen dsPhanphat={dsPhanphat} />
        </FilterSection>
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
  padding: 0 36px;
`;

const BtnRight = styled.div`
  text-align: right;
  padding: 16px 0;
`;

const FilterSection = styled.div`
  background: #fff;
`;

const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;

const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;

export default Phanphat;
