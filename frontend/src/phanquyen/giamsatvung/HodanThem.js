import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputPassword from "../../components/InputPassword";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiHodan from "../../axios/apiHodan";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";

const HodanThem = (props) => {
  const [hodan, setHodan] = useState({
    daidien: "",
    taikhoan: "",
    matkhau: "",
    xnmatkhau: "",
    sdt: "",
    cmnd: "",
    namsinh: "",
    nghe: "",
  });
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLangnghe, setSelectedLangnghe] = useState("Chọn làng nghề");
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");

  const [errMsg, setErrMsg] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState("");

  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeHodan = (e) => {
    setHodan({
      ...hodan,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !hodan.daidien ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      xa === "Chọn Xã" ||
      !hodan.sdt ||
      !hodan.cmnd ||
      !hodan.namsinh ||
      !hodan.taikhoan ||
      !hodan.matkhau ||
      !hodan.xnmatkhau ||
      selectedLangnghe === "Chọn làng nghề"
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const passwordMatch = (pwd1, pwd2) => {
    if (pwd1 !== pwd2) {
      setPwdNotMatch("Mật khẩu không trùng khớp");
      return false;
    } else {
      setPwdNotMatch("");
      return true;
    }
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      if (passwordMatch(hodan.matkhau, hodan.xnmatkhau)) {
        const dl = {
          daidien: hodan.daidien,
          taikhoan: hodan.taikhoan,
          matkhau: hodan.matkhau,
          sdt: hodan.sdt,
          cmnd: hodan.cmnd,
          namsinh: hodan.namsinh,
          diachi: `${xa}, ${huyen}, ${tinh}`,
          nghe: hodan.nghe,
          langngheId:
            selectedLangnghe !== "Chọn làng nghề"
              ? dsLangnghe.find((item) => item.ten === selectedLangnghe)._id
              : selectedLangnghe,
        };
        // console.log(dl);
        const data = await apiHodan.themHodan(dl);
        if (data.success) {
          Toastify({
            text: "Thêm hộ dân thành công",
            backgroundColor: "#0DB473",
            className: "toastifyInfo",
            position: "center",
          }).showToast();
          resetFields();
          setErrMsg("");
        }
      }
    }
  };

  const resetFields = () => {
    setHodan({
      daidien: "",
      taikhoan: "",
      matkhau: "",
      xnmatkhau: "",
      sdt: "",
      cmnd: "",
      namsinh: "",
      nghe: "",
    });
    setTinh("Chọn Tỉnh/Thành Phố");
    sethuyen("Chọn Quận/Huyện");
    setXa("Chọn Xã");
    setSelectedLangnghe("Chọn làng nghề");
  };

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const data = await apiLangnghe.dsLangnghe();
    // console.log(data);
    setDsLangnghe(data.langnghe);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách hộ dân"
        titleBack
        onClick={() => props.history.push("/giamsatvung/hodan")}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmit}>
            Lưu
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Thêm hộ dân</FormTitle>

            <FormGroup>
              <Label>Tên hộ dân:</Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                name="daidien"
                value={hodan.daidien}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.daidien && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Số điện thoại:</Label>
              <Input
                placeholder="Nhập sđt"
                type="text"
                name="sdt"
                value={hodan.sdt}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.sdt && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Chứng minh nhân dân:</Label>
              <Input
                placeholder="Nhập cmnd"
                type="text"
                name="cmnd"
                value={hodan.cmnd}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Năm sinh:</Label>
              <Input
                placeholder="Nhập năm sinh"
                type="text"
                name="namsinh"
                value={hodan.namsinh}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.namsinh && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Nghề:</Label>
              <Input
                placeholder="Nhập năm sinh"
                type="text"
                name="nghe"
                value={hodan.nghe}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.nghe && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Làng nghề</Label>
                  <div className="row">
                    <div className="col-lg-4">
                      <DropdownCustom
                        dropdownStyles={{ width: 362 }}
                        selected={selectedLangnghe}
                        data={dsLangnghe.map((item) => item.ten)}
                        onClick={(val) => {
                          setSelectedLangnghe(val);
                          let { tinh, huyen } = dsLangnghe.find(
                            (item) => item.ten === val
                          );
                          setTinh(tinh);
                          sethuyen(huyen);
                        }}
                      />
                      {selectedLangnghe === "Chọn làng nghề" ? (
                        <ErrMsg>{errMsg}</ErrMsg>
                      ) : null}
                    </div>
                  </div>
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Nơi cư trú</Label>
                  <DropdownCustom
                    dropdownStyles={{ width: 362 }}
                    selected={xa}
                    data={dsXa}
                    onClick={(val) => {
                      setXa(val);
                    }}
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup>
              <Label>Tên tài khoản:</Label>
              <Input
                placeholder="Nhập tài khoản"
                type="text"
                name="taikhoan"
                value={hodan.taikhoan}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Mật khẩu:</Label>
                  <InputPassword
                    label="Mật khẩu"
                    name="matkhau"
                    value={hodan.matkhau}
                    onChange={(e) => {
                      handleChangeHodan(e);
                    }}
                    style={{ width: 362 }}
                  />
                  {!hodan.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Xác nhận mật khẩu:</Label>
                  <InputPassword
                    label="Xác nhận"
                    name="xnmatkhau"
                    value={hodan.xnmatkhau}
                    onChange={(e) => {
                      handleChangeHodan(e);
                    }}
                    style={{ width: 362 }}
                  />
                  {!hodan.xnmatkhau ? (
                    <ErrMsg>{errMsg}</ErrMsg>
                  ) : pwdNotMatch ? (
                    <ErrMsg>{pwdNotMatch}</ErrMsg>
                  ) : null}
                </FormGroup>
              </div>
            </div>
          </FormContent>
        </Form>
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
  padding: 20px 36px;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 26px;
`;
const FormContent = styled.div`
  width: 750px;
  margin: auto;
  font-family: "Poppins", sans-serif;
`;
const FormTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #555;
  margin-bottom: 36px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
`;

export default HodanThem;
