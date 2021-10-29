import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import TableDaily1Them from "./tables/TableDaily1Them";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import { apiTinhThanh } from "../../apiTinhThanh";
import { gethuyen, getTinh, getXa } from "../../utils";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import DialogMaterial from "../../components/DialogMaterial";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const Daily1Them = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchColumns, setSearchColumns] = React.useState([
    "ten",
    "sdt",
    "email",
    "taikhoan",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [dsDaily1, setDsDaily1] = React.useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [dsSelectedDaily1, setDsSelectedDaily1] = useState([]);

  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");
  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleThemDaily = (daily1Arr) => {
    setDsSelectedDaily1(daily1Arr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const dl = {
      bophankdId: bophankdInfo._id,
      daily1Arr: dsSelectedDaily1,
    };
    const data = await apiBophankd.bophankdThemDaily1(dl);
    if (data.success) {
      setOpen(false);
      setAlert(true);
      setSuccess(true);
    }
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

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const { daily1, success } = await apiDaily1.dsDaily1BpkdNull();
    // console.log({ daily1 });
    if (success) {
      setDsDaily1(
        daily1 && daily1.length
          ? daily1.map((item) => ({
              ...item,
              taikhoan: item.user ? item.user.taikhoan : "",
              xa: getXa(item.diachi),
              huyen: gethuyen(item.diachi),
              tinh: getTinh(item.diachi),
            }))
          : []
      );
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchBophankdInfo = async () => {
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(data.bophankd);
  };

  React.useEffect(() => {
    setSuccess(false);
    fetchDsDaily1();
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách đại lý 1"
          onClick={() => props.history.push("/bophankd/daily1")}
          titleBack
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Thêm đại lý cấp 1</Title>
            </TitleWrapper>
            <DropdownsWrapper>
              <div className="row">
                <div className="col-lg-4">
                  <DropdownCustom
                    dropdownStyles={{ width: "100%" }}
                    selected={tinh}
                    data={dsTinh}
                    onClick={(val) => {
                      setTinh(val);
                      sethuyen("Chọn Quận/Huyện");
                      setXa("Chọn Xã");
                      if (val !== "Chọn Tỉnh/Thành Phố") {
                        setSearchColumns([...searchColumns, "tinh"]);
                        setQuery(val);
                      } else {
                        setSearchColumns(
                          searchColumns.filter((item) => item !== "tinh")
                        );
                        setQuery("");
                      }
                    }}
                    label="Chọn Tỉnh/Thành Phố"
                  />
                </div>
                <div className="col-lg-4">
                  <DropdownCustom
                    dropdownStyles={{ width: "100%" }}
                    selected={huyen}
                    data={dsHuyen}
                    onClick={(val) => {
                      sethuyen(val);
                      setXa("Chọn Xã");
                      if (val !== "Chọn Quận/Huyện") {
                        setSearchColumns([...searchColumns, "huyen"]);
                        setQuery(val);
                      } else {
                        setSearchColumns(
                          searchColumns.filter((item) => item !== "huyen")
                        );
                        setQuery("");
                      }
                    }}
                    label="Chọn Quận/Huyện"
                  />
                </div>
                <div className="col-lg-4">
                  <DropdownCustom
                    dropdownStyles={{ width: "100%" }}
                    selected={xa}
                    data={dsXa}
                    onClick={(val) => {
                      setXa(val);
                      if (val !== "Chọn Xã") {
                        setSearchColumns([...searchColumns, "xa"]);
                        setQuery(val);
                      } else {
                        setSearchColumns(
                          searchColumns.filter((item) => item !== "xa")
                        );
                        setQuery("");
                      }
                    }}
                    label="Chọn Xã"
                  />
                </div>
              </div>
            </DropdownsWrapper>
            <FilterWrapper>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </FilterWrapper>
          </FilterSection>

          <TableSection>
            <TableDaily1Them
              dsDaily1={search(dsDaily1)}
              handleThemDaily={handleThemDaily}
            />
          </TableSection>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={open}
        onClose={handleCloseDialog}
        title="Thêm đại lý"
        content="Thêm tất cả các đại lý đã chọn"
        text1="Hủy"
        text2="Thêm"
        onClick1={handleCloseDialog}
        onClick2={handleSubmit}
      />

      <SnackbarMaterial
        severity="success"
        message="Thêm thành công"
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
  background: #ffff;
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
const DropdownsWrapper = styled.div`
  padding: 16px;
`;
const FilterWrapper = styled.div`
  padding-top: 0;
  padding-bottom: 14px;
  padding-left: 17px;
  padding-right: 17px;
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

export default Daily1Them;
