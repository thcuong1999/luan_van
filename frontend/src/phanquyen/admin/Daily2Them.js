import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputPassword from "../../components/InputPassword";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiDaily2 from "../../axios/apiDaily2";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const BophankdThem = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [daily2, setDaily2] = useState({
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

  const handleChangeDaily2 = (e) => {
    setDaily2({
      ...daily2,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !daily2.ten ||
      tinh === "Chọn Tỉnh/Thành Phố" ||
      huyen === "Chọn Quận/Huyện" ||
      xa === "Chọn Xã" ||
      !daily2.taikhoan ||
      !daily2.matkhau ||
      !daily2.xnmatkhau ||
      !daily2.sdt ||
      !daily2.email
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
      if (passwordMatch(daily2.matkhau, daily2.xnmatkhau)) {
        const dl = {
          ten: daily2.ten,
          sdt: daily2.sdt,
          email: daily2.email,
          diachi: `${xa}, ${huyen}, ${tinh}`,
          taikhoan: daily2.taikhoan,
          matkhau: daily2.matkhau,
        };
        // console.log(dl);
        const data = await apiDaily2.themDaily2(dl);
        if (data.success) {
          setAlert(true);
          resetFields();
          setErrMsg("");
        }
      }
    }
  };

  const resetFields = () => {
    setDaily2({
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
    <>
      <Container>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/admin/daily2")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={handleSubmit}>
              Lưu
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm đại lý</FormTitle>

              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input
                  placeholder="Nhập tên đại lý"
                  type="text"
                  name="ten"
                  value={daily2.ten}
                  onChange={handleChangeDaily2}
                />
                {!daily2.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={daily2.sdt}
                  onChange={handleChangeDaily2}
                />
                {!daily2.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={daily2.email}
                  onChange={handleChangeDaily2}
                />
                {!daily2.email && <ErrMsg>{errMsg}</ErrMsg>}
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

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input
                  placeholder="Nhập tài khoản"
                  type="text"
                  name="taikhoan"
                  value={daily2.taikhoan}
                  onChange={handleChangeDaily2}
                />
                {!daily2.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <InputPassword
                      label="Mật khẩu"
                      name="matkhau"
                      value={daily2.matkhau}
                      onChange={handleChangeDaily2}
                      style={{ width: 362 }}
                    />
                    {!daily2.matkhau && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </div>

                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Xác nhận mật khẩu:</Label>
                    <InputPassword
                      label="Xác nhận"
                      name="xnmatkhau"
                      value={daily2.xnmatkhau}
                      onChange={(e) => {
                        handleChangeDaily2(e);
                        setPwdNotMatch(false);
                      }}
                      style={{ width: 362 }}
                    />
                    {!daily2.xnmatkhau ? (
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

export default BophankdThem;
