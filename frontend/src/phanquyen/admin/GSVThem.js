import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputPassword from "../../components/InputPassword";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiGSV from "../../axios/apiGSV";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const GSVThem = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [gsv, setGsv] = useState({
    ten: "",
    taikhoan: "",
    matkhau: "",
    xnmatkhau: "",
    sdt: "",
    cmnd: "",
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

  const handleChangeGsv = (e) => {
    setGsv({
      ...gsv,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !gsv.ten ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      xa === "Chọn Xã" ||
      !gsv.taikhoan ||
      !gsv.matkhau ||
      !gsv.xnmatkhau ||
      !gsv.sdt ||
      !gsv.cmnd ||
      !gsv.email
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
      if (passwordMatch(gsv.matkhau, gsv.xnmatkhau)) {
        const dl = {
          ten: gsv.ten,
          taikhoan: gsv.taikhoan,
          matkhau: gsv.matkhau,
          xnmatkhau: gsv.xnmatkhau,
          sdt: gsv.sdt,
          cmnd: gsv.cmnd,
          email: gsv.email,
          diachi: `${xa}, ${huyen}, ${tinh}`,
        };
        console.log(dl);
        const data = await apiGSV.themGsv(dl);
        console.log(data);
        if (data.success) {
          setAlert(true);
          resetFields();
          setErrMsg("");
        }
      }
    }
  };

  const resetFields = () => {
    setGsv({
      ten: "",
      taikhoan: "",
      matkhau: "",
      xnmatkhau: "",
      sdt: "",
      cmnd: "",
      email: "",
    });
    setTinh("Chọn Tỉnh/Thành Phố");
    sethuyen("Chọn Quận/Huyện");
    setXa("Chọn Xã");
  };

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={handleSubmit}>
              Lưu
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm giám sát vùng</FormTitle>

              <FormGroup>
                <Label>Tên giám sát vùng:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={gsv.ten}
                  onChange={handleChangeGsv}
                />
                {!gsv.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={gsv.sdt}
                  onChange={handleChangeGsv}
                />
                {!gsv.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Số chứng minh nhân dân:</Label>
                <Input
                  placeholder="Nhập cmnd"
                  type="text"
                  name="cmnd"
                  value={gsv.cmnd}
                  onChange={handleChangeGsv}
                />
                {!gsv.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={gsv.email}
                  onChange={handleChangeGsv}
                />
                {!gsv.email && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
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
                      label="Chọn Tỉnh/Thành Phố"
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
                      label="Chọn Quận/Huyện"
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={xa}
                      data={dsXa}
                      onClick={(val) => setXa(val)}
                      label="Chọn Xã"
                    />
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="taikhoan"
                  value={gsv.taikhoan}
                  onChange={handleChangeGsv}
                />
                {!gsv.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <InputPassword
                      label="Mật khẩu"
                      name="matkhau"
                      value={gsv.matkhau}
                      onChange={handleChangeGsv}
                      style={{ width: 362 }}
                    />
                    {!gsv.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </div>

                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Xác nhận mật khẩu:</Label>
                    <InputPassword
                      label="Xác nhận"
                      name="xnmatkhau"
                      value={gsv.xnmatkhau}
                      onChange={(e) => {
                        handleChangeGsv(e);
                        setPwdNotMatch(false);
                      }}
                      style={{ width: 362 }}
                    />
                    {!gsv.xnmatkhau ? (
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

      <SnackbarMaterial
        severity="success"
        message="Thêm thành công"
        open={alert}
        setOpen={setAlert}
      />
    </>
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
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default GSVThem;
