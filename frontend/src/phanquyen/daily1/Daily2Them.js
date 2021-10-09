import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import TableDaily2Them from "./tables/TableDaily2Them";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import { apiTinhThanh } from "../../apiTinhThanh";
import { gethuyen, getTinh, getXa } from "../../utils";
import { useSelector } from "react-redux";
import DialogMaterial from "../../components/DialogMaterial";
import apiDaily2 from "../../axios/apiDaily2";

const Daily2Them = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns, setSearchColumns] = React.useState([
    "ten",
    "sdt",
    "email",
    "taikhoan",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [dsDaily2, setDsDaily2] = React.useState([]);
  const [daily1Info, setDaily1Info] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [dsSelectedDaily2, setDsSelectedDaily2] = useState([]);

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
    setDsSelectedDaily2(daily1Arr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const dl = {
      daily1Id: daily1Info._id,
      daily2Arr: dsSelectedDaily2,
    };
    // console.log({ dl });
    const data = await apiDaily1.themDaily2(dl);
    if (data.success) {
      Toastify({
        text: "Thêm đại lý 2 thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    props.history.push("/daily1/daily2");
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

  const fetchDsDaily2 = async () => {
    setLoading(true);
    const { daily2, success } = await apiDaily2.dsDaily2Daily1Null();
    console.log({ daily2 });
    if (success) {
      setDsDaily2(
        daily2 && daily2.length
          ? daily2.map((item) => ({
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
    const data = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    setDaily1Info(data.daily1);
  };

  React.useEffect(() => {
    fetchDsDaily2();
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách đại lý 2"
          onClick={() => props.history.push("/daily1/daily2")}
          titleBack
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Thêm đại lý cấp 2</Title>
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
          <TableDaily2Them
            dsDaily2={search(dsDaily2)}
            handleThemDaily={handleThemDaily}
          />
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

export default Daily2Them;
