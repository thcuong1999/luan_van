import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import TableCongcuHuloiDanhsach from "./tables/TableCongcuHuloiDanhsach";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const Congcu = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const [dsCongcuHuloi, setdsCongcuHuloi] = useState([]);

  const fetchDsCongcu = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data2 = await apiBophankd.bophankdDSCongcu(data1.bophankd._id);
    const data3 = await apiBophankd.dsCongcuHuloi(data1.bophankd._id);
    setBophankdInfo(data1.bophankd);
    setDsCongcu(data2.congcu);
    setdsCongcuHuloi(data3.congcu);
    setLoading(false);
  };

  const search = (dsCongcu) => {
    return (
      dsCongcu &&
      dsCongcu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  const search2 = (dsCongcuLoi) => {
    return (
      dsCongcuLoi &&
      dsCongcuLoi.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query2.toLowerCase()) >
            -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Danh s??ch c??ng c???" />
        <Content>
          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>T???t c??? c??ng c???</Title>
              <ButtonMaterial
                variant="contained"
                onClick={() => props.history.push("/bophankd/congcu/them")}
                style={{ marginRight: 20 }}
              >
                Th??m c??ng c???
              </ButtonMaterial>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim c??ng c??? theo t??n, c??ng d???ng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableCongcu
                dsCongcu={search(dsCongcu)}
                setRowsRemoved={setRowsRemoved}
                bophankdId={bophankdInfo?._id}
                setAlert={setAlert}
              />
            </TableSection>
          </FilterSection>

          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>T???t c??? c??ng c??? h?? l???i</Title>
              <ButtonMaterial
                variant="contained"
                onClick={() =>
                  props.history.push("/bophankd/congcu/huloi/them2")
                }
                style={{ marginRight: 20 }}
              >
                Th??m c??ng c??? l???i
              </ButtonMaterial>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim c??ng c??? theo t??n, c??ng d???ng"
                  value={query2}
                  onChange={(e) => setQuery2(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableCongcuHuloiDanhsach
                dsCongcuHuloi={search2(dsCongcuHuloi)}
                setAlert={setAlert}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>

      <SnackbarMaterial
        severity="success"
        message="X??a th??nh c??ng"
        open={alert}
        setOpen={setAlert}
      />
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
  padding: 26px 36px;
`;
const FilterSection = styled.div`
  background: #fff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  font-family: "Poppins", sans-serif;
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

export default Congcu;
