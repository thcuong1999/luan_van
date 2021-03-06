import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DialogMaterial from "../../components/DialogMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiCongcu from "../../axios/apiCongcu";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";

const CongcuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: congcuId } = props.match.params;
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});

  const fetchCongcu = async () => {
    setLoading(true);
    const data = await apiCongcu.singleCongcu(congcuId);
    if (data.success) {
      setCongcu(data.congcu);
      setLoading(false);
    }
  };

  const fetchBophankdInfo = async () => {
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(data.bophankd);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const data = await apiBophankd.bophankdXoaCongcu({
      bophankdId: bophankdInfo._id,
      congcuId,
    });
    if (data.success) {
      setOpen(false);
      Toastify({
        text: "Xoa cong cu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/bophankd/congcu");
    }
  };

  useEffect(() => {
    fetchCongcu();
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay l???i trang danh s??ch c??ng c???"
          titleBack
          onClick={() => props.history.push("/bophankd/congcu")}
          headerRight={
            <>
              <ButtonMaterial
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                X??a
              </ButtonMaterial>
              <ButtonMaterial
                style={{ marginLeft: 20 }}
                variant="contained"
                onClick={() =>
                  props.history.push(`/bophankd/congcu/chinhsua/${congcuId}`)
                }
              >
                Ch???nh s???a c??ng c???
              </ButtonMaterial>
            </>
          }
        />
        <Content>
          <Form>
            <FormTitle>Chi ti???t c??ng c???</FormTitle>
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>T??n c??ng c???:</Label>
                  <Input type="text" value={congcu.ten} />
                </FormGroup>

                <FormGroup>
                  <Label>M?? t??? c??ng c???:</Label>
                  <TextArea value={congcu.mota} rows="5" />
                </FormGroup>

                <FormGroup>
                  <Label>H??nh ???nh:</Label>
                  <Image
                    src={
                      congcu.hinhanh
                        ? `/uploads/${congcu.hinhanh}`
                        : img_placeholder
                    }
                    alt="anhcongcu"
                    className={!congcu.hinhanh && "noImage"}
                  />
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>C??ng d???ng:</Label>
                  <Input type="text" value={congcu.congdung} />
                </FormGroup>

                <FormGroup>
                  <Label>S??? l?????ng:</Label>
                  <Input type="text" value={congcu.soluong} />
                </FormGroup>

                <FormGroup>
                  <Label>Thu???c t??nh:</Label>
                  {congcu.thuoctinh && !congcu.thuoctinh.length && (
                    <div>---</div>
                  )}
                  {congcu.thuoctinh &&
                    congcu.thuoctinh.map((item) => (
                      <div className="row mt-3">
                        <div className="col-4">
                          <FormGroup style={{ marginBottom: 0 }}>
                            <Input type="text" value={item.ten} />
                          </FormGroup>
                        </div>
                        <div className="col-8">
                          <Input type="text" value={item.giatri} />
                        </div>
                      </div>
                    ))}
                </FormGroup>
              </div>
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="X??a s???n ph???m?"
        text2="X??a"
        text1="H???y"
        content=" B???n ch???c x??a c??ng c??? n??y ch??? ?"
        onClick2={handleDelete}
        onClick1={handleClose}
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
  padding: 26px 36px;
`;
const Form = styled.div`
  background: #fff;
  padding: 30px 20px;
  font-family: "Poppins", sans-serif;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const FormTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  color: #555;
  margin-bottom: 26px;
`;
const Image = styled.img`
  width: 200px;
  &.noImage {
    opacity: 0.15;
  }
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

export default CongcuChitiet;
