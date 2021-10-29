import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMaterial from "../../components/DialogMaterial";

const BophankdChitiet = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: bophankdId } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXoaBophankd = async () => {
    const data = await apiBophankd.xoa1Bophankd(bophankdId);
    if (data.success) {
      Toastify({
        text: "Xóa thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/admin/bophankd");
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const data = await apiBophankd.singleBophankd(bophankdId);
    setBophankd(data.bophankd);
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
            <>
              <ButtonMaterial
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
              >
                Xóa
              </ButtonMaterial>
              <ButtonMaterial
                variant="contained"
                style={{ marginLeft: 16 }}
                onClick={() =>
                  props.history.push(`/admin/bophankd/chinhsua/${bophankdId}`)
                }
              >
                Chỉnh sửa
              </ButtonMaterial>
            </>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Chi tiết bộ phận kinh doanh</FormTitle>
              <FormGroup>
                <Label>Tên bộ phận kinh doanh:</Label>
                <Input type="text" name="ten" value={bophankd?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Tên tài khoản:</Label>
                <Input
                  type="text"
                  name="taikhoan"
                  value={bophankd?.user?.taikhoan}
                />
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input type="text" name="sdt" value={bophankd?.sdt} />
              </FormGroup>

              <FormGroup>
                <Label>E-mail:</Label>
                <Input type="text" name="email" value={bophankd?.email} />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
                <TextArea value={bophankd?.diachi} rows="5" />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa bộ phận kinh doanh"
        content="Bạn chắc xóa bộ phận kinh doanh này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleXoaBophankd}
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

export default BophankdChitiet;
