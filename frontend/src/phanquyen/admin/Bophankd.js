import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableBophankd from "./tables/TableBophankd";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const Bophankd = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsBophankd, setDsBophankd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const [alert, setAlert] = React.useState(false);

  const search = (dsBpkd) => {
    return (
      dsBpkd &&
      dsBpkd.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  const fetchDsBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.dsBophankd();
    setDsBophankd(
      bophankd && bophankd.length
        ? bophankd.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setLoading(false);
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsBophankd();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Bộ phận kinh doanh" />
        <Content>
          <BtnRight>
            <ButtonMaterial
              variant="contained"
              onClick={() => props.history.push("/admin/bophankd/them")}
            >
              Thêm bộ phận
            </ButtonMaterial>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả bộ phận kinh doanh</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim bộ phận kinh doanh theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableBophankd
                dsBophankd={search(dsBophankd)}
                setRowsRemoved={setRowsRemoved}
                setAlert={setAlert}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>

      <SnackbarMaterial
        severity="success"
        message="Xóa thành công"
        open={alert}
        setOpen={setAlert}
      />
    </>
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
  font-family: "Poppins", sans-serif;
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
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default Bophankd;
