import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";
import apiHodan from "../../axios/apiHodan";
import apiTiendo from "../../axios/apiTiendo";

const TiendoThem = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [hodanInfo, setHodanInfo] = useState(null);
  const [tiendo, setTiendo] = useState({
    ten: "",
    noidung: "",
    sanpham: "",
    dientich: "",
    donvi: "",
    thoigianbatdau: "",
    thoigianthuhoach: "",
  });

  const emptyField = () => {
    if (
      !tiendo.ten ||
      !tiendo.noidung ||
      !tiendo.sanpham ||
      !tiendo.dientich ||
      !tiendo.donvi
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleSubmitForm = async () => {
    if (!emptyField()) {
      const payload = {
        hodanId: hodanInfo._id,
        tiendo,
      };
      const data = await apiTiendo.themTiendo(payload);
      if (data.success) {
        Toastify({
          text: "Thêm tiến độ thành công",
          backgroundColor: "#0DB473",
          className: "toastifyInfo",
          position: "center",
        }).showToast();
        props.history.push("/hodan/tiendo");
      }
    }
  };

  const handleChangeTiendo = (e) => {
    setTiendo({
      ...tiendo,
      [e.target.name]: e.target.value,
    });
  };

  const fetchHodanInfo = async () => {
    const { hodan } = await apiHodan.singleHodanBasedUser(userInfo._id);
    setHodanInfo(hodan);
  };

  useEffect(() => {
    fetchHodanInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header
        title="Quay lại trang danh sách theo dõi tiến độ"
        titleBack
        onClick={() => props.history.push("/hodan/tiendo")}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmitForm}>
            Lưu
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Thêm tiến độ</FormTitle>
            <FormGroup>
              <Label>Tên tiến độ:</Label>
              <Input
                type="text"
                placeholder="Nhập tên "
                name="ten"
                value={tiendo.ten}
                onChange={handleChangeTiendo}
              />
              {!tiendo.ten && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Nội dung:</Label>
              <TextArea
                rows="4"
                placeholder="Nhập nội dung"
                name="noidung"
                value={tiendo.noidung}
                onChange={handleChangeTiendo}
              />
              {!tiendo.noidung && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Sản phẩm:</Label>
              <Input
                type="text"
                placeholder="Nhập tên"
                name="sanpham"
                value={tiendo.sanpham}
                onChange={handleChangeTiendo}
              />
              {!tiendo.sanpham && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Diện tích:</Label>
                  <Input
                    type="text"
                    placeholder="Nhập diện tích"
                    name="dientich"
                    value={tiendo.dientich}
                    onChange={handleChangeTiendo}
                  />
                  {!tiendo.dientich && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Đơn vị:</Label>
                  <Input
                    type="text"
                    placeholder="Nhập đơn vị"
                    name="donvi"
                    value={tiendo.donvi}
                    onChange={handleChangeTiendo}
                  />
                  {!tiendo.donvi && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Thời gian bắt đầu:</Label>
                  <Input
                    type="date"
                    // value={tiendo.thoigianbatdau}
                    name="thoigianbatdau"
                    onChange={handleChangeTiendo}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Thời gian thu hoạch:</Label>
                  <Input
                    type="date"
                    // value={tiendo.thoigianthuhoach}
                    name="thoigianthuhoach"
                    onChange={handleChangeTiendo}
                  />
                </FormGroup>
              </div>
            </div>
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
const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
`;

export default TiendoThem;
