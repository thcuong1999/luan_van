import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";

const Congcu = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsCongcu = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data2 = await apiBophankd.bophankdDSCongcu(data1.bophankd._id);
    // console.log(data2);
    setBophankdInfo(data1.bophankd);
    setDsCongcu(data2.congcu.congcu);
    setLoading(false);
  };

  // console.log(dsCongcu);

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsCongcu();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Danh sách công cụ" />
        <Content>
          <BtnRight>
            <ButtonMaterial
              variant="contained"
              onClick={() => props.history.push("/bophankd/congcu/them")}
            >
              Thêm công cụ
            </ButtonMaterial>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả công cụ</Title>
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
            <TableCongcu
              dsCongcu={dsCongcu}
              setRowsRemoved={setRowsRemoved}
              bophankdId={bophankdInfo?._id}
            />
          </FilterSection>
        </Content>
      </Wrapper>
    </>
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

export default Congcu;
