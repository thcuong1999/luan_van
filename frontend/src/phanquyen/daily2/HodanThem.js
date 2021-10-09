import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import TableHodanThem from "./tables/TableHodanThem";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import { apiTinhThanh } from "../../apiTinhThanh";
import { gethuyen, getTinh, getXa } from "../../utils";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import DialogMaterial from "../../components/DialogMaterial";
import apiHodan from "../../axios/apiHodan";
import apiDaily2 from "../../axios/apiDaily2";

const HodanThem = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns, setSearchColumns] = React.useState([
    "daidien",
    "sdt",
    "cmnd",
    "namsinh",
    "tenlangnghe",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [dsHodan, setDsHodan] = React.useState([]);
  const [daily2Info, setdaily2Info] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [dsSelectedHodan, setDsSelectedHodan] = useState([]);

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

  const handleThemHodan = (hodanArr) => {
    setDsSelectedHodan(hodanArr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const payload = {
      daily2Id: daily2Info._id,
      arrayOfId: dsSelectedHodan,
    };
    // console.log({ payload });
    const data = await apiDaily2.themHodan(payload);
    if (data.success) {
      Toastify({
        text: "Thêm hộ dân thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    props.history.push("/daily2/hodan");
  };

  const search = (dsHodan) => {
    return (
      dsHodan &&
      dsHodan.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  const fetchDsHodan = async () => {
    setLoading(true);
    const { hodan, success } = await apiHodan.dsHodanDaily2Null();
    // console.log({ daily1 });
    if (success) {
      setDsHodan(
        hodan && hodan.length
          ? hodan.map((item) => ({
              ...item,
              taikhoan: item.user ? item.user.taikhoan : "",
              xa: getXa(item.diachi),
              huyen: gethuyen(item.diachi),
              tinh: getTinh(item.diachi),
              tenlangnghe: item.langnghe.ten,
            }))
          : []
      );
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchDaily2Info = async () => {
    const { daily2 } = await apiDaily2.singleBophankdBasedUser(userInfo._id);
    setdaily2Info(daily2);
  };

  React.useEffect(() => {
    fetchDsHodan();
    fetchDaily2Info();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách hộ dân"
          onClick={() => props.history.push("/daily2/hodan")}
          titleBack
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Thêm hộ dân</Title>
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
          <TableHodanThem
            dsHodan={search(dsHodan)}
            handleThemHodan={handleThemHodan}
          />
        </Content>
      </Wrapper>

      <DialogMaterial
        open={open}
        onClose={handleCloseDialog}
        title="Thêm hộ dân"
        content="Thêm tất cả các hộ dân đã chọn"
        text1="Hủy"
        text2="Thêm"
        onClick1={handleCloseDialog}
        onClick2={handleSubmit}
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
  width: 360px;
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

export default HodanThem;
