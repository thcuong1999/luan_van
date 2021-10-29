import React, { useEffect, useState } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import TableVattu from "./tables/TableVattu";
import TableVattuHuloiDanhsach from "./tables/TableVattuHuloiDanhsach";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const Vattu = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsVattu, setDsVattu] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const [dsVattuHuloi, setdsVattuHuloi] = useState([]);

  const fetchDsVattu = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data2 = await apiBophankd.bophankdDSVattu(data1.bophankd._id);
    const data3 = await apiBophankd.dsVattuHuloi(data1.bophankd._id);
    setBophankdInfo(data1.bophankd);
    setDsVattu(data2.vattu);
    setdsVattuHuloi(data3.vattu);
    setLoading(false);
  };

  const search = (dsVattu) => {
    return (
      dsVattu &&
      dsVattu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  const search2 = (dsVattuLoi) => {
    return (
      dsVattuLoi &&
      dsVattuLoi.filter((item) =>
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
    fetchDsVattu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Danh sách vật tư" />
        <Content>
          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>Tất cả vật tư</Title>
              <ButtonMaterial
                variant="contained"
                onClick={() => props.history.push("/bophankd/vattu/them")}
                style={{ marginRight: 16 }}
              >
                Thêm vật tư
              </ButtonMaterial>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim vật tư theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableVattu
                dsVattu={search(dsVattu)}
                setRowsRemoved={setRowsRemoved}
                bophankdId={bophankdInfo?._id}
                setAlert={setAlert}
              />
            </TableSection>
          </FilterSection>

          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>Tất cả vật tư hư lỗi</Title>
              <ButtonMaterial
                variant="contained"
                onClick={() =>
                  props.history.push("/bophankd/vattu/huloi/them2")
                }
                style={{ marginRight: 16 }}
              >
                Thêm vật tư lỗi
              </ButtonMaterial>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim vật tư theo tên, công dụng"
                  value={query2}
                  onChange={(e) => setQuery2(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableVattuHuloiDanhsach
                dsVattuHuloi={search2(dsVattuHuloi)}
                setAlert={setAlert}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>

      <SnackbarMaterial
        severity="success"
        message="Xóa thành công"
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
  font-family: "Poppins", sans-serif;
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
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default Vattu;
