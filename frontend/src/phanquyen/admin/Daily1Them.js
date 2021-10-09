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
import apiDaily1 from "../../axios/apiDaily1";

const Daily1Them = (props) => {
  const [daily1, setDaily1] = useState({
    ten: "",
    taikhoan: "",
    matkhau: "",
    xnmatkhau: "",
    sdt: "",
    email: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);

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

  const handleChangeDaily1 = (e) => {
    setDaily1({
      ...daily1,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !daily1.ten ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      xa === "Chọn Xã" ||
      !daily1.taikhoan ||
      !daily1.matkhau ||
      !daily1.xnmatkhau ||
      !daily1.sdt ||
      !daily1.email
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
      if (passwordMatch(daily1.matkhau, daily1.xnmatkhau)) {
        const dl = {
          ten: daily1.ten,
          sdt: daily1.sdt,
          email: daily1.email,
          diachi: `${xa}, ${huyen}, ${tinh}`,
          taikhoan: daily1.taikhoan,
          matkhau: daily1.matkhau,
        };
        // console.log(dl);
        const data = await apiDaily1.themDaily1(dl);
        if (data.success) {
          Toastify({
            text: "Thêm đại lý 1 thành công",
            backgroundColor: "#0DB473",
            className: "toastifyInfo",
            position: "center",
          }).showToast();
          resetFields();
        }
      }
    }
  };

  const resetFields = () => {
    setDaily1({
      ten: "",
      taikhoan: "",
      matkhau: "",
      xnmatkhau: "",
      sdt: "",
      email: "",
    });
    setTinh("Chọn Tỉnh/Thành Phố");
    sethuyen("Chọn Quận/Huyện");
    setXa("Chọn Xã");
    setErrMsg("");
  };

  return (
    <Daily1ThemWrapper>
      <Header
        title="Quay lại danh sách đại lý 1"
        titleBack
        onClick={() => props.history.push("/admin/daily1")}
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
                  label="Tên đại lý"
                  name="ten"
                  value={daily1.ten}
                  onChange={handleChangeDaily1}
                />
                {!daily1.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Tên tài khoản"
                  name="taikhoan"
                  value={daily1.taikhoan}
                  onChange={handleChangeDaily1}
                />
                {!daily1.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Mật khẩu"
                  name="matkhau"
                  value={daily1.matkhau}
                  onChange={handleChangeDaily1}
                />
                {!daily1.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Xác nhận mật khẩu"
                  name="xnmatkhau"
                  value={daily1.xnmatkhau}
                  onChange={(e) => {
                    handleChangeDaily1(e);
                    setPwdNotMatch(false);
                  }}
                />
                {!daily1.xnmatkhau ? (
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
                  value={daily1.sdt}
                  onChange={handleChangeDaily1}
                />
                {!daily1.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="E-mail"
                  name="email"
                  value={daily1.email}
                  onChange={handleChangeDaily1}
                />
                {!daily1.email && <ErrMsg>{errMsg}</ErrMsg>}
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
                    {(tinh === "Chọn Tỉnh/Thành Phố " ||
                      huyen === "Chọn Quận/Huyện" ||
                      xa === "Chọn Xã") && <ErrMsg>{errMsg}</ErrMsg>}
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
    </Daily1ThemWrapper>
  );
};

const Daily1ThemWrapper = styled.div`
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

export default Daily1Them;
