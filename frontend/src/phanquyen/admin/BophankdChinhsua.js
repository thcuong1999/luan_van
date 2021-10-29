import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputPassword from "../../components/InputPassword";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const BophankdChinhsua = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: bophankdId } = props.match.params;
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, setHuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");
  const [taikhoan, setTaikhoan] = useState(false);
  const [matkhau, setMatkhau] = useState(false);
  const [xnMatkhau, setXnMatkhau] = useState(false);
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [alert, setAlert] = React.useState(false);

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    const dl = {
      ten: bophankd.ten,
      sdt: bophankd.sdt,
      email: bophankd.email,
      diachi: `${xa}, ${huyen}, ${tinh}`,
      taikhoan: taikhoan,
      matkhau: matkhau,
    };
    const data = await apiBophankd.suaBophankd(bophankdId, dl);
    console.log(data);
    if (data.success) {
      setAlert(true);
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
    const dc = bophankd.diachi.split(",").map((item) => item.trim());
    setXa(dc[0]);
    setHuyen(dc[1]);
    setTinh(dc[2]);
    setTaikhoan(bophankd?.user?.taikhoan);
    setBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách bộ phận kinh doanh"
          titleBack
          onClick={() => props.history.push("/admin/bophankd")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={handleSubmit}>
              Cập nhật
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật bộ phận kinh doanh</FormTitle>
              <FormGroup>
                <Label>Tên bộ phận kinh doanh:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={bophankd?.ten}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      ten: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={bophankd?.sdt}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      sdt: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={bophankd?.email}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ</Label>
                <div className="row">
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={tinh}
                      data={dsTinh}
                      onClick={(val) => {
                        setTinh(val);
                        setHuyen("Chọn Quận/Huyện");
                        setXa("Chọn Xã");
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={huyen}
                      data={dsHuyen}
                      onClick={(val) => setHuyen(val)}
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
                  type="text"
                  name="taikhoan"
                  value={taikhoan}
                  onChange={(e) => setTaikhoan(e.target.value)}
                  disabled={bophankd?.user?.taikhoan}
                />
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <InputPassword
                      label="Mật khẩu"
                      name="matkhau"
                      value={bophankd?.matkhau}
                      onChange={(e) => setMatkhau(e.target.value)}
                      style={{ width: 362 }}
                    />
                  </FormGroup>
                </div>

                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Xác nhận mật khẩu:</Label>
                    <InputPassword
                      label="Xác nhận"
                      name="xnmatkhau"
                      value={bophankd?.xnmatkhau}
                      onChange={(e) => {
                        setXnMatkhau(e.target.value);
                        setPwdNotMatch(false);
                      }}
                      style={{ width: 362 }}
                    />
                    {pwdNotMatch && (
                      <ErrMsg>Xác nhận mật khẩu không chính xác</ErrMsg>
                    )}
                  </FormGroup>
                </div>
              </div>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <SnackbarMaterial
        severity="success"
        message="Chỉnh sửa thành công"
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

export default BophankdChinhsua;
