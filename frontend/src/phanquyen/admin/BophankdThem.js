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
import apiBophankd from "../../axios/apiBophankd";

const BophankdThem = (props) => {
  const [bpkd, setBpkd] = useState({
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

  const handleChangeBpkd = (e) => {
    setBpkd({
      ...bpkd,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !bpkd.ten ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      xa === "Chọn Xã" ||
      !bpkd.taikhoan ||
      !bpkd.matkhau ||
      !bpkd.xnmatkhau ||
      !bpkd.sdt ||
      !bpkd.email
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
      if (passwordMatch(bpkd.matkhau, bpkd.xnmatkhau)) {
        const dl = {
          ten: bpkd.ten,
          sdt: bpkd.sdt,
          email: bpkd.email,
          diachi: `${xa}, ${huyen}, ${tinh}`,
          taikhoan: bpkd.taikhoan,
          matkhau: bpkd.matkhau,
        };
        // console.log(dl);
        const data = await apiBophankd.themBophankd(dl);
        if (data.success) {
          Toastify({
            text: "Thêm bộ phận kinh doanh thành công",
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
    setBpkd({
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
  };

  return (
    <BophankinhdoanhThemWrapper>
      <Header
        title="Quay lại danh sách bộ phận kinh doanh"
        titleBack
        onClick={() => props.history.push("/admin/bophankd")}
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
                  label="Tên BPKD"
                  name="ten"
                  value={bpkd.ten}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Tên tài khoản"
                  name="taikhoan"
                  value={bpkd.taikhoan}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Mật khẩu"
                  name="matkhau"
                  value={bpkd.matkhau}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Xác nhận mật khẩu"
                  name="xnmatkhau"
                  value={bpkd.xnmatkhau}
                  onChange={(e) => {
                    handleChangeBpkd(e);
                    setPwdNotMatch(false);
                  }}
                />
                {!bpkd.xnmatkhau ? (
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
                  value={bpkd.sdt}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <InputText
                  label="E-mail"
                  name="email"
                  value={bpkd.email}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.email && <ErrMsg>{errMsg}</ErrMsg>}
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
    </BophankinhdoanhThemWrapper>
  );
};

const BophankinhdoanhThemWrapper = styled.div`
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

export default BophankdThem;
