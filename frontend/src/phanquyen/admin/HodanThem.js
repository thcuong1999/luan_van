import React, { useState } from "react";
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
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
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

  const handleSubmit = async () => {
    if (hodan.matkhau !== hodan.xnmatkhau) {
      return setPwdNotMatch(true);
    }
    const dl = {
      daidien: hodan.daidien,
      taikhoan: hodan.taikhoan,
      matkhau: hodan.matkhau,
      sdt: hodan.sdt,
      cmnd: hodan.cmnd,
      namsinh: hodan.namsinh,
      diachi: `${xa}, ${huyen}, ${tinh}`,
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
  };

  return (
    <HodanThemWrapper>
      <Header
        title="Quay lại danh sách hộ dân"
        titleBack
        onClick={() => props.history.push("/admin/hodan")}
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
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Tên tài khoản"
                  name="taikhoan"
                  value={hodan.taikhoan}
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Mật khẩu"
                  name="matkhau"
                  value={hodan.matkhau}
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Xác nhận mật khẩu"
                  name="xnmatkhau"
                  value={hodan.xnmatkhau}
                  onChange={(e) => {
                    handleChangeHodan(e);
                    setPwdNotMatch(false);
                  }}
                />
                {pwdNotMatch && (
                  <ErrMsg>Xác nhận mật khẩu không chính xác</ErrMsg>
                )}
              </FormGroup>
            </div>
            <div className="col-lg-6">
              <FormGroup>
                <InputText
                  label="Số điện thoại"
                  name="sdt"
                  value={hodan.sdt}
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="CMND"
                  name="cmnd"
                  value={hodan.cmnd}
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Năm sinh"
                  name="namsinh"
                  value={hodan.namsinh}
                  onChange={handleChangeHodan}
                />
              </FormGroup>

              <FormGroup>
                <span>Địa chỉ</span>
                <div className="row">
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={tinh}
                      data={dsTinh}
                      onClick={(val) => {
                        setTinh(val);
                        sethuyen("Chọn Quận/Huyện");
                        setXa("Chọn Xã");
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={huyen}
                      data={dsHuyen}
                      onClick={(val) => {
                        sethuyen(val);
                        setXa("Chọn Xã");
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={xa}
                      data={dsXa}
                      onClick={(val) => setXa(val)}
                    />
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
        </Form>
      </Content>
    </HodanThemWrapper>
  );
};

const HodanThemWrapper = styled.div`
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

const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default HodanThem;
