import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableGSV from "./tables/TableGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";

const GSV = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "cmnd", "taikhoan", "email"]);
  const [dsGsv, setDsGsv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsGsv = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.dsGsv();
    //console.log(data);
    setDsGsv(
      gsv && gsv.length
        ? gsv.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsGsv) => {
    return (
      dsGsv &&
      dsGsv.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsGsv();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header title="Danh sách giám sát vùng" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/admin/gsv/them")}
          >
            Thêm giám sát vùng
          </ButtonMaterial>
        </BtnRight>
        <FilterSection>
          <TitleWrapper>
            <Title>Tất cả giám sát vùng</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim giám sát vùng theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TableGSV dsGsv={search(dsGsv)} setRowsRemoved={setRowsRemoved} />
        </FilterSection>
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

export default GSV;
