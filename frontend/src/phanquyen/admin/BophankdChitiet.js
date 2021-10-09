import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMaterial from "../../components/DialogMaterial";
import Button from "@mui/material/Button";

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
        text: "Then nhan hieu thanh cong",
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
    // console.log(data);
    setBophankd(data.bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <BophankinhdoanhThemWrapper>
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
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <InputText
                    label="Tên BPKD"
                    name="ten"
                    value={bophankd?.ten}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Tên tài khoản"
                    name="taikhoan"
                    value={bophankd?.user?.taikhoan}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <InputText
                    label="Số điện thoại"
                    name="sdt"
                    value={bophankd?.sdt}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="E-mail"
                    name="email"
                    value={bophankd?.email}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText
                    multiline
                    rows={4}
                    label="Địa chỉ"
                    value={bophankd?.diachi}
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

export default BophankdChitiet;
