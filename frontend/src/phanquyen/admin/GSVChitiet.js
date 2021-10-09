import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import apiGSV from "../../axios/apiGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMaterial from "../../components/DialogMaterial";

const GSVChitiet = (props) => {
  const [gsv, setGsv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: gsvId } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleXoaHodan = async () => {
  //   const data = await apiHodan.xoa1Hodan(hodanId);
  //   if (data.success) {
  //     Toastify({
  //       text: "Xóa hộ dân thành công",
  //       backgroundColor: "#0DB473",
  //       className: "toastifyInfo",
  //       position: "center",
  //     }).showToast();
  //     props.history.push("/admin/hodan");
  //   }
  // };

  const fetchGsv = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsv(gsvId);
    // console.log(data);
    setGsv(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchGsv();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <HodanThemWrapper>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
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
                  props.history.push(`/admin/gsv/chinhsua/${gsvId}`)
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
                  <InputText label="Tên" value={gsv?.ten} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Tên tài khoản"
                    value={gsv?.user?.taikhoan}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <InputText
                    label="Số điện thoại"
                    name="sdt"
                    value={gsv?.sdt}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText label="CMND" value={gsv?.cmnd} />
                </FormGroup>

                <FormGroup>
                  <InputText label="E-mail" value={gsv?.email} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    multiline
                    rows={4}
                    label="Địa chỉ"
                    value={gsv?.diachi}
                  />
                </FormGroup>
              </div>
            </div>
          </Form>
        </Content>
      </HodanThemWrapper>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa giám sát vùng"
        content="Bạn chắc xóa giám sát vùng này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={() => {}}
      />
    </>
  );
};

const HodanThemWrapper = styled.div`
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

export default GSVChitiet;
