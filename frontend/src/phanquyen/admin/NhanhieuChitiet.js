import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiNhanhieu from "../../axios/apiNhanhieu";

const NhanhieuChitiet = (props) => {
  const [singleNhanhieu, setSingleNhanhieu] = useState(null);
  const { id: nhanhieuId } = props.match.params;
  const [loading, setLoading] = useState(false);

  const fetchSingleSanpham = async () => {
    setLoading(true);
    const data = await apiNhanhieu.singleNhanhieu(nhanhieuId);
    setSingleNhanhieu(data.nhanhieu);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách sản phẩm làng nghề"
          titleBack
          onClick={() => props.history.push("/admin/nhanhieu")}
          headerRight={
            <ButtonMaterial
              variant="contained"
              onClick={() =>
                props.history.push(`/admin/nhanhieu/chinhsua/${nhanhieuId}`)
              }
            >
              Chỉnh sửa
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết nhãn hiệu</FormTitle>

              <FormGroup>
                <Label>Mã nhãn hiệu:</Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={singleNhanhieu?.ma}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>Tên nhãn hiệu:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={singleNhanhieu?.ten}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>Mô tả:</Label>
                <TextArea
                  placeholder="Nhập mô tả"
                  rows="5"
                  name="mota"
                  value={singleNhanhieu?.mota}
                  disabled
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
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

export default NhanhieuChitiet;
