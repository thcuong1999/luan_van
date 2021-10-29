import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import SnackbarMaterial from "../../components/SnackbarMaterial";
import apiNhanhieu from "../../axios/apiNhanhieu";

const NhanhieuThem = (props) => {
  const [nhanhieu, setNhanhieu] = useState({
    ma: "",
    ten: "",
    mota: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [alert, setAlert] = useState(false);

  const emptyFields = () => {
    if (!nhanhieu.ma || !nhanhieu.ten) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setNhanhieu({
      ...nhanhieu,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const data = await apiNhanhieu.themNhanhieu(nhanhieu);
      if (data.success) {
        setAlert(true);
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setNhanhieu({
      ma: "",
      ten: "",
      mota: "",
    });
  };

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách nhãn hiệu"
          titleBack
          onClick={() => props.history.push("/admin/nhanhieu")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={handleSubmit}>
              Lưu
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm nhãn hiệu</FormTitle>

              <FormGroup>
                <Label>Mã nhãn hiệu:</Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={nhanhieu.ma}
                  onChange={handleChange}
                />
                {!nhanhieu.ma && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Tên nhãn hiệu:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={nhanhieu.ten}
                  onChange={handleChange}
                />
                {!nhanhieu.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả:</Label>
                <TextArea
                  placeholder="Nhập mô tả"
                  rows="5"
                  name="mota"
                  value={nhanhieu.mota}
                  onChange={handleChange}
                />
              </FormGroup>
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
  width: 600px;
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
const TextArea = styled.textarea`
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

export default NhanhieuThem;
