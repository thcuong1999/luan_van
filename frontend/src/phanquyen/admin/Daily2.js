import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableDaily2 from "./tables/TableDaily2";
import apiDaily2 from "../../axios/apiDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";

const Daily2 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsDaily2 = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.dsDaily2();
    //console.log(data);
    setDsDaily2(
      daily2 && daily2.length
        ? daily2.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsDaily2) => {
    return (
      dsDaily2 &&
      dsDaily2.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsDaily2();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <BophankinhdoanhWrapper>
      <Header title="Danh sách đại lý 2" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/admin/daily2/them")}
          >
            Thêm bộ đại lý 2
          </ButtonMaterial>
        </BtnRight>
        <FilterSection>
          <TitleWrapper>
            <Title>Tất cả đại lý 2</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim đại lý 2 theo tên, số điện thoại, email, tài khoản"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TableDaily2
            dsDaily2={search(dsDaily2)}
            setRowsRemoved={setRowsRemoved}
          />
        </FilterSection>
      </Content>
    </BophankinhdoanhWrapper>
  );
};

const BophankinhdoanhWrapper = styled.div`
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
