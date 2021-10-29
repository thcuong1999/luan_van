import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiDaily2 from "../../axios/apiDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMaterial from "../../components/DialogMaterial";

const Daily2Chitiet = (props) => {
  const [daily2, setDaily2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: daily2Id } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXoaDaily2 = async () => {
    const data = await apiDaily2.xoa1daily2(daily2Id);
    if (data.success) {
      Toastify({
        text: "Xóa đại lý thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/admin/daily2");
    }
  };

  const fetchDaily2 = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    // console.log(data);
    setDaily2(daily2);
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/admin/daily2")}
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
                  props.history.push(`/admin/daily2/chinhsua/${daily2Id}`)
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
              <FormTitle>Chi tiết đại lý</FormTitle>
              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input type="text" value={daily2?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input type="text" value={daily2?.user?.taikhoan} />
              </FormGroup>

              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input type="text" value={daily2?.sdt} />
              </FormGroup>

              <FormGroup>
                <Label>Tên đại lý:</Label>
                <Input type="text" value={daily2?.email} />
              </FormGroup>

              <FormGroup>
                <Label>Địa chỉ:</Label>
                <TextArea value={daily2?.diachi} rows="5" />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa đại lý"
        content="Bạn chắc xóa đại lý này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleXoaDaily2}
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

export default Daily2Chitiet;
