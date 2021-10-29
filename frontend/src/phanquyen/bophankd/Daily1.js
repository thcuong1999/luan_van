import React from "react";
import TableDaily1 from "./tables/TableDaily1";
import ButtonMaterial from "../../components/ButtonMaterial";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const Daily1 = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "sdt", "email", "taikhoan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsDaily1, setDsDaily1] = React.useState([]);
  const [bophankdInfo, setBophankdInfo] = React.useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const {
      daily1: { daily1 },
      success,
    } = await apiBophankd.bophankdDsDaily1(data1.bophankd._id);
    // console.log(daily1);
    if (success) {
      setDsDaily1(
        daily1 && daily1.length
          ? daily1.map((item) => ({
              ...item,
              taikhoan: item.user ? item.user.taikhoan : "",
            }))
          : []
      );
      setBophankdInfo(data1.bophankd);
    }
    setLoading(false);
  };

  const search = (dsDaily1) => {
    return (
      dsDaily1 &&
      dsDaily1.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setRowsRemoved(false);
    fetchDsDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Đại lý cấp 1" />
        <Content>
          <BtnRight>
            <ButtonMaterial
              variant="contained"
              onClick={() => props.history.push("/bophankd/daily1/them")}
            >
              Thêm đại lý
            </ButtonMaterial>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả đại lý cấp 1</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim công cụ theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDaily1
                dsDaily1={search(dsDaily1)}
                bophankdId={bophankdInfo?._id}
                setRowsRemoved={setRowsRemoved}
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

export default Daily1;
