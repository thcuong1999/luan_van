import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiSanphamLangnghe from "../../axios/apiSanphamLangnghe";
import SnackbarMaterial from "../../components/SnackbarMaterial";
import BackdropMaterial from "../../components/BackdropMaterial";

const SanphamLangngheChinhsua = (props) => {
  const [spLangnghe, setSpLangnghe] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const { id: sanphamId } = props.match.params;
  const [loading, setLoading] = useState(false);

  const emptyFields = () => {
    if (!spLangnghe.ma || !spLangnghe.ten) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setSpLangnghe({
      ...spLangnghe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      console.log(spLangnghe);
      const data = await apiSanphamLangnghe.capnhat1Sanpham(
        sanphamId,
        spLangnghe
      );
      if (data.success) {
        setAlert(true);
        setErrMsg("");
      }
    }
  };

  const fetchSingleSanpham = async () => {
    setLoading(true);
    const data = await apiSanphamLangnghe.singleSanpham(sanphamId);
    setSpLangnghe(data.sanpham);
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
          onClick={() => props.history.push("/admin/sanphamlangnghe")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={handleSubmit}>
              Cập nhật
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật sản phẩm làng nghề</FormTitle>

              <FormGroup>
                <Label>Mã sản phẩm:</Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={spLangnghe?.ma}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>Tên sản phẩm:</Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={spLangnghe?.ten}
                  onChange={handleChange}
                />
                {!spLangnghe?.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả:</Label>
                <TextArea
                  placeholder="Nhập mô tả"
                  rows="5"
                  name="mota"
                  value={spLangnghe?.mota}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <SnackbarMaterial
        severity="success"
        message="Cập nhật thành công"
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

export default SanphamLangngheChinhsua;
