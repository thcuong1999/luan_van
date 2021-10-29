import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ButtonMaterial from "../../components/ButtonMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiTiendo from "../../axios/apiTiendo";
import BackdropMaterial from "../../components/BackdropMaterial";

const BaocaoThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [hinhanh, setHinhAnh] = useState(null);
  const [baocao, setBaocao] = useState({
    ten: "",
    noidung: "",
  });
  const { idtiendo: tiendoId, idbaocao: baocaoId } = props.match.params;

  const emptyField = () => {
    if (!baocao.ten || !baocao.noidung) {
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

      const data = await apiTiendo.capnhatBaocao(tiendoId, baocaoId, formData);
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

  const fetchSingleBaocao = async () => {
    setLoading(true);
    const { baocao } = await apiTiendo.singleBaocao(tiendoId, baocaoId);
    setBaocao({
      ten: baocao.ten,
      noidung: baocao.noidung,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleBaocao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại chi tiết tiến độ"
        titleBack
        onClick={() => props.history.push(`/hodan/tiendo/chitiet/${tiendoId}`)}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmitForm}>
            Cập nhật
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Cập nhật báo cáo</FormTitle>
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
  font-family: "Poppins", sans-serif;
`;
const Form = styled.div`
  background: #fff;
  padding: 36px 20px;
`;
const FormContent = styled.div`
  width: 750px;
  margin: auto;
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
