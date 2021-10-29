import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ButtonMaterial from "../../components/ButtonMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiTiendo from "../../axios/apiTiendo";
import { getCurrentDatetime } from "../../utils";

const BaocaoThem = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [hinhanh, setHinhAnh] = useState(null);
  const [baocao, setBaocao] = useState({
    ten: "",
    noidung: "",
  });
  const { idtiendo: tiendoId } = props.match.params;

  const emptyField = () => {
    if (!baocao.ten || !baocao.noidung || !hinhanh) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleSubmitForm = async () => {
    if (!emptyField()) {
      const formData = new FormData();
      formData.append("ten", baocao.ten);
      formData.append("noidung", baocao.noidung);
      formData.append("hinhanh", hinhanh);
      formData.append("thoigian", getCurrentDatetime());

      const data = await apiTiendo.themBaocao(tiendoId, formData);
      if (data.success) {
        Toastify({
          text: "Thêm báo cáo thành công",
          backgroundColor: "#0DB473",
          className: "toastifyInfo",
          position: "center",
        }).showToast();
        props.history.push(`/hodan/tiendo/chitiet/${tiendoId}`);
      }
    }
  };

  const handleChangeBaocao = (e) => {
    setBaocao({
      ...baocao,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Header
        title="Quay lại chi tiết tiến độ"
        titleBack
        onClick={() => props.history.push(`/hodan/tiendo/chitiet/${tiendoId}`)}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmitForm}>
            Lưu
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Thêm báo cáo</FormTitle>
            <FormGroup>
              <Label>Tên/chủ đề báo cáo:</Label>
              <Input
                type="text"
                placeholder="Nhập tên"
                name="ten"
                value={baocao.ten}
                onChange={handleChangeBaocao}
              />
              {!baocao.ten && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Nội dung:</Label>
              <TextArea
                rows="7"
                placeholder="Nhập nội dung"
                name="noidung"
                value={baocao.noidung}
                onChange={handleChangeBaocao}
              />
              {!baocao.noidung && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Chọn ảnh:</Label>
              <input
                type="file"
                style={{ border: "none" }}
                onChange={(e) => setHinhAnh(e.target.files[0])}
              />
              {!hinhanh && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>
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
  margin-bottom: 26px;
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
const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
  display: block;
`;
export default BaocaoThem;
