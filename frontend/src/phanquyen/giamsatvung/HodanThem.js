import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
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
          langngheId:
            selectedLangnghe !== "Chọn làng nghề"
              ? dsLangnghe.find((item) => item.ten === selectedLangnghe)._id
              : selectedLangnghe,
        };
        //console.log(dl);
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
          <div className="row">
            <div className="col-lg-6">
              <FormGroup>
                <InputText
                  label="Đại diện"
                  name="daidien"
                  value={hodan.daidien}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.daidien && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Tên tài khoản"
                  name="taikhoan"
                  value={hodan.taikhoan}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Mật khẩu"
                  name="matkhau"
                  value={hodan.matkhau}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Xác nhận mật khẩu"
                  name="xnmatkhau"
                  value={hodan.xnmatkhau}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.xnmatkhau ? (
                  <ErrMsg>{errMsg}</ErrMsg>
                ) : pwdNotMatch ? (
                  <ErrMsg>{pwdNotMatch}</ErrMsg>
                ) : null}
              </FormGroup>
            </div>
            <div className="col-lg-6">
              <FormGroup>
                <InputText
                  label="Số điện thoại"
                  name="sdt"
                  value={hodan.sdt}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="CMND"
                  name="cmnd"
                  value={hodan.cmnd}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Năm sinh"
                  name="namsinh"
                  value={hodan.namsinh}
                  onChange={(e) => {
                    handleChangeHodan(e);
                  }}
                />
                {!hodan.namsinh && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <span>Làng nghề</span>
                <div className="row">
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 380 }}
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

              <FormGroup>
                <span>Nơi cư trú</span>
                <DropdownCustom
                  dropdownStyles={{ width: 380 }}
                  selected={xa}
                  data={dsXa}
                  onClick={(val) => {
                    setXa(val);
                  }}
                />
              </FormGroup>
            </div>
          </div>
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
  padding: 36px 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
`;

export default HodanThem;
