import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import apiTiendo from "../../axios/apiTiendo";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";

const BaocaoThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleBaocao, setSingleBaocao] = useState(null);
  const { idtiendo: tiendoId, idbaocao: baocaoId } = props.match.params;

  const fetchSingleBaocao = async () => {
    setLoading(true);
    const { baocao } = await apiTiendo.singleBaocao(tiendoId, baocaoId);
    setSingleBaocao(baocao);
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
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Chi tiết báo cáo</FormTitle>
            <FormGroup>
              <Label>Tên/chủ đề báo cáo:</Label>
              <Input type="text" value={singleBaocao?.ten} />
            </FormGroup>

            <FormGroup>
              <Label>Nội dung:</Label>
              <TextArea rows="7" type="text" value={singleBaocao?.noidung} />
            </FormGroup>

            <FormGroup>
              <Label>Chọn ảnh:</Label>
              <Image
                src={
                  singleBaocao?.hinhanh
                    ? `/uploads/${singleBaocao?.hinhanh}`
                    : img_placeholder
                }
                alt="anhcongcu"
                className={!singleBaocao?.hinhanh && "noImage"}
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
const Image = styled.img`
  width: 100px;
`;

export default BaocaoThem;
