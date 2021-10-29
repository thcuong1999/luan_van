import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DialogMaterial from "../../components/DialogMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";

const NguyenlieuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: nguyenlieuId } = props.match.params;
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [nguyenlieu, setNguyenlieu] = useState(null);

  const fetchSingleNguyenlieu = async () => {
    setLoading(true);
    const data = await apiNguyenlieu.singleNguyenlieu(nguyenlieuId);
    const data2 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setNguyenlieu(data.nguyenlieu);
    setBophankdInfo(data2.bophankd);
    setLoading(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const payload = {
      bophankdId: bophankdInfo._id,
      nguyenlieuId,
    };
    const data = await apiBophankd.xoa1Nguyenlieu(payload);
    // console.log(payload);
    if (data.success) {
      setOpen(false);
      Toastify({
        text: "Xóa nguyên liệu thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/bophankd/nguyenlieu");
    }
  };

  useEffect(() => {
    fetchSingleNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách nguyên liệu"
          titleBack
          onClick={() => props.history.push("/bophankd/nguyenlieu")}
          headerRight={
            <>
              <ButtonMaterial
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                Xóa
              </ButtonMaterial>
              <ButtonMaterial
                style={{ marginLeft: 20 }}
                variant="contained"
                onClick={() =>
                  props.history.push(
                    `/bophankd/nguyenlieu/chinhsua/${nguyenlieuId}`
                  )
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
              <FormTitle>Chi tiết nguyên liệu</FormTitle>
              <FormGroup>
                <Label>Tên nguyên liệu:</Label>
                <Input type="text" value={nguyenlieu?.ten} />
              </FormGroup>

              <FormGroup>
                <Label>Mô tả nguyên liệu:</Label>
                <TextArea value={nguyenlieu?.mota} rows="5" />
              </FormGroup>

              <FormGroup>
                <Label>Hình ảnh:</Label>
                <Image
                  src={
                    nguyenlieu?.hinhanh
                      ? `/uploads/${nguyenlieu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!nguyenlieu?.hinhanh && "noImage"}
                />
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Sản lượng:</Label>
                    <Input type="text" value={nguyenlieu?.sanluong} />
                  </FormGroup>
                </div>
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>Đơn vị tính:</Label>
                    <Input type="text" value={nguyenlieu?.donvitinh} />
                  </FormGroup>
                </div>
              </div>

              <FormGroup>
                <Label>Thuộc tính:</Label>
                {nguyenlieu && nguyenlieu.thuoctinh.length
                  ? nguyenlieu.thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup
                              style={{ width: "100%", marginBottom: 10 }}
                            >
                              <Input type="text" value={item.ten} />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <FormGroup
                                style={{ width: "100%", marginBottom: 10 }}
                              >
                                <Input type="text" value={item.giatri} />
                              </FormGroup>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "-------------"}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa nguyên liệu"
        content="Bạn chắc xóa nguyên liệu này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDelete}
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
  &.noImage {
    opacity: 0.15;
  }
`;

export default NguyenlieuChitiet;
