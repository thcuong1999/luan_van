import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMaterial from "../../components/DialogMaterial";

const Daily1Chitiet = (props) => {
  const [daily1, setDaily1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: daily1Id } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXoaDaily1 = async () => {
    const data = await apiDaily1.xoa1Daily1(daily1Id);
    if (data.success) {
      Toastify({
        text: "Xóa đại lý thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/admin/daily1");
    }
  };

  const fetchDaily1 = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1(daily1Id);
    // console.log(data);
    setDaily1(daily1);
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily1();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <BophankinhdoanhThemWrapper>
        <Header
          title="Quay lại danh sách đại lý 1"
          titleBack
          onClick={() => props.history.push("/admin/daily1")}
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
                  props.history.push(`/admin/daily1/chinhsua/${daily1Id}`)
                }
              >
                Chỉnh sửa
              </ButtonMaterial>
            </>
          }
        />
        <Content>
          <Form>
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <InputText
                    label="Tên đại lý"
                    name="ten"
                    value={daily1?.ten}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Tên tài khoản"
                    value={daily1?.user?.taikhoan}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <InputText
                    label="Số điện thoại"
                    name="sdt"
                    value={daily1?.sdt}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="E-mail"
                    name="email"
                    value={daily1?.email}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    multiline
                    rows={4}
                    label="Địa chỉ"
                    value={daily1?.diachi}
                  />
                </FormGroup>
              </div>
            </div>
          </Form>
        </Content>
      </BophankinhdoanhThemWrapper>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa đại lý"
        content="Bạn chắc xóa đại lý này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleXoaDaily1}
      />
    </>
  );
};

const BophankinhdoanhThemWrapper = styled.div`
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

const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default Daily1Chitiet;
