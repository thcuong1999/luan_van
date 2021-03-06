import React from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import styled from "styled-components";
import { arrOfLinks } from "./links";
import apiSanpham from "../../axios/apiSanpham";
import TableSanphamThem from "./tables/TableSanphamThem";
import DialogMaterial from "../../components/DialogMaterial";
import SnackbarMaterial from "../../components/SnackbarMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";

const SanphamThem = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "ten", "loai", "nhanhieu"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [bpkdInfo, setBpkdInfo] = React.useState(null);
  const [dsSelectedSanpham, setDsSelectedSanpham] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleThemSanpham = (sphamArr) => {
    setDsSelectedSanpham(sphamArr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const dl = {
      bophankdId: bpkdInfo._id,
      sanphamArr: dsSelectedSanpham,
    };
    const data = await apiBophankd.themSanpham(dl);
    if (data.success) {
      setOpen(false);
      setAlert(true);
      setSuccess(true);
    }
  };

  const fetchDsSanpham = async () => {
    setLoading(true);
    const data2 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data = await apiSanpham.dsNotInBophankd(data2.bophankd._id);
    setBpkdInfo(data2.bophankd);
    setDsSanpham(data.sanpham);
    setLoading(false);
  };

  const search = (dsSanpham) => {
    return (
      dsSanpham &&
      dsSanpham.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setSuccess(false);
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay l???i danh s??ch s???n ph???m"
          arrOfLinks={arrOfLinks}
          titleBack
          onClick={() => props.history.push("/bophankd/sanpham")}
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>T???t c??? s???n ph???m</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="T??m s???n ph???m theo m??, t??n, lo???i, nh??n hi???u"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableSanphamThem
                dsSanpham={search(dsSanpham)}
                handleThemSanpham={handleThemSanpham}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={open}
        onClose={handleCloseDialog}
        title="Th??m s???n ph???m"
        content="Th??m t???t c??? c??c s???n ph???m ???? ch???n ?"
        text1="H???y"
        text2="Th??m"
        onClick1={handleCloseDialog}
        onClick2={handleSubmit}
      />

      <SnackbarMaterial
        severity="success"
        message="Th??m th??nh c??ng"
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

export default SanphamThem;
