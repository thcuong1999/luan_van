import React, { useState, useRef, useEffect } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import apiVattu from "../../axios/apiVattu";
import styled from "styled-components";
import Header from "../../components/Header";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const VattuThem = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [hinhanh, sethinhanh] = useState(null);
  const [congdung, setCongdung] = useState("");
  const [soluong, setSoluong] = useState("");
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const ref = useRef();

  const getThuocTinh = () => {
    if (
      thuoctinh.length === 1 &&
      thuoctinh[0].ten === "" &&
      thuoctinh[0].giatri === ""
    ) {
      return [];
    }
    return thuoctinh;
  };

  const emptyField = () => {
    if (!ten || !congdung || !soluong) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyField()) {
      const formData = new FormData();
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("hinhanh", hinhanh);
      formData.append("congdung", congdung);
      formData.append("soluong", soluong);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
      formData.append("bophankdId", bophankdInfo._id);
      const data = await apiVattu.themVattu(formData);
      if (data.success) {
        setAlert(true);
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setTen("");
    setMota("");
    ref.current.value = "";
    setCongdung("");
    setSoluong("");
    setThuoctinh([{ ten: "", giatri: "" }]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...thuoctinh];
    list[index][name] = value;
    setThuoctinh(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...thuoctinh];
    list.splice(index, 1);
    setThuoctinh(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setThuoctinh([...thuoctinh, { ten: "", giatri: "" }]);
  };

  const fetchBophankdInfo = async () => {
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(data.bophankd);
  };

  useEffect(() => {
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/bophankd/vattu")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={submitForm}>
              Lưu
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Thêm vật tư</FormTitle>
              <FormGroup>
                <Label>Tên vật tư:</Label>
                <Input
                  type="text"
                  placeholder="Nhập tên vật tư"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
                {!ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả vật tư:</Label>
                <TextArea
                  value={mota}
                  onChange={(e) => setMota(e.target.value)}
                  rows="5"
                />
              </FormGroup>

              <FormGroup>
                <Label>Chọn ảnh:</Label>
                <input
                  ref={ref}
                  type="file"
                  onChange={(e) => sethinhanh(e.target.files[0])}
                  style={{ border: "none", paddingLeft: 0 }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Công dụng:</Label>
                <Input
                  type="text"
                  placeholder="Nhập công dụng"
                  value={congdung}
                  onChange={(e) => setCongdung(e.target.value)}
                />
                {!congdung && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Số lượng:</Label>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  onChange={(e) => {
                    let val = e.target.value;
                    if (isNaN(val)) {
                      e.target.value = 0;
                      setSoluong(0);
                    } else {
                      setSoluong(e.target.value);
                    }
                  }}
                />
                {!soluong && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Thuộc tính:</Label>
                {thuoctinh.map((item, key) => {
                  return (
                    <div className="row">
                      <div className="col-lg-4">
                        <FormGroup style={{ marginBottom: 10 }}>
                          <Input
                            type="text"
                            name="ten"
                            value={item.ten}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="Tên thuộc tính"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center">
                          <Input
                            type="text"
                            name="giatri"
                            value={item.giatri}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="Giá trị"
                          />
                          {thuoctinh.length !== 1 && (
                            <CrossButton onClick={() => handleRemoveClick(key)}>
                              <i class="fas fa-times"></i>
                            </CrossButton>
                          )}
                        </div>
                      </div>

                      <div className="addElementBtn">
                        {thuoctinh.length - 1 === key && (
                          <PlusButton onClick={handleAddClick}>
                            <i class="fas fa-plus"></i>
                            <span>Thêm thuộc tính khác</span>
                          </PlusButton>
                        )}
                      </div>
                    </div>
                  );
                })}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <SnackbarMaterial
        severity="success"
        message="Thêm thành công"
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
  font-weight: bold;
  text-align: center;
  color: #555;
  margin-bottom: 26px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;
const PlusButton = styled.button`
  margin-left: 20px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 25px;
    height: 25px;
    line-height: 20px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
  }
  &:active {
    outline: none;
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
const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
`;
export default VattuThem;