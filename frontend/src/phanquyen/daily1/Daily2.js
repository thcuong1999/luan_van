import React, { useEffect, useState } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableDaily2 from "./tables/TableDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import styled from "styled-components";
import Header from "../../components/Header";

const Daily2 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const [daily1Info, setDaily1Info] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  // console.log(dsDaily2);

  const fetchData = async () => {
    setLoading(true);
    const data1 = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const {
      daily2: { daily2 },
    } = await apiDaily1.dsDaily2(data1.daily1._id);
    setDsDaily2(
      daily2.map((item) => ({
        ...item,
        taikhoan: item.user.taikhoan,
      }))
    );
    setDaily1Info(data1.daily1);
    setLoading(false);
  };

  // const columns = ["ten", "price", "countInStock"];
  const search = (dsDaily2) => {
    return dsDaily2.filter((item) =>
      searchColumns.some(
        (col) =>
          item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchData();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Đại lý cấp 2" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/daily1/daily2/them")}
          >
            Thêm đại lý
          </ButtonMaterial>
        </BtnRight>
        <FilterSection>
          <TitleWrapper>
            <Title>Tất cả đại lý cấp 2</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tìm đại lý theo tên, số điện thoại, email và tài khoản"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          {/* <TableDaily1
            dsDaily1={search(dsDaily1)}
            bophankdId={bophankdInfo?._id}
            setRowsRemoved={setRowsRemoved}
          /> */}
          <TableDaily2
            dsDaily2={search(dsDaily2)}
            setRowsRemoved={setRowsRemoved}
            daily1Id={daily1Info?._id}
          />
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

export default Daily2;
