import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiVattu from "../../axios/apiVattu";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const VattuChinhsua = (props) => {
  const [alert, setAlert] = React.useState(false);
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [loading, setLoading] = useState(false);
  const [vattu, setVattu] = useState({});
  const { id: vattuId } = props.match.params;

  const fetchVattu = async () => {
    setLoading(true);
    const { vattu } = await apiVattu.singleVattu(vattuId);
    setVattu(vattu);
    setThuoctinh(vattu.thuoctinh.length ? vattu.thuoctinh : thuoctinh);
    setLoading(false);
  };

  useEffect(() => {
    fetchVattu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("ten", vattu.ten);
    formData.append("mota", vattu.mota);
    formData.append("hinhanh", vattu.hinhanh);
    formData.append("congdung", vattu.congdung);
    formData.append("soluong", vattu.soluong);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

    const data = await apiVattu.suaVattu(vattuId, formData);
    // console.log(data);
    if (data.success) {
      setAlert(true);
    }
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

  // general handlechange
  const handleChange = (e) => {
    setVattu({
      ...vattu,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/bophankd/vattu")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={submitForm}>
              Cập nhật
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>Cập nhật vật tư</FormTitle>
              <FormGroup>
                <Label>Tên vật tư:</Label>
                <Input
                  type="text"
                  placeholder="Nhập tên vật tư"
                  value={vattu.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>Mô tả vật tư:</Label>
                <TextArea
                  value={vattu.mota}
                  name="mota"
                  onChange={handleChange}
                  rows="5"
                />
              </FormGroup>

              <FormGroup>
                <Label>Chọn ảnh:</Label>
                <input
                  type="file"
                  onChange={(e) =>
                    setVattu({
                      ...vattu,
                      hinhanh: e.target.files[0],
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Công dụng:</Label>
                <Input
                  type="text"
                  placeholder="Nhập công dụng"
                  name="congdung"
                  value={vattu.congdung}
                  onChange={handleChange}
                />
                {/* {!congdung && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>Số lượng:</Label>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  value={vattu.soluong}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (isNaN(val)) {
                      e.target.value = 0;
                      setVattu({
                        ...vattu,
                        soluong: 0,
                      });
                    } else {
                      setVattu({
                        ...vattu,
                        soluong: e.target.value,
                      });
                    }
                  }}
                />
                {/* {!soluong && <ErrMsg>{errMsg}</ErrMsg>} */}
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
        message="Chỉnh sửa thành công"
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

export default VattuChinhsua;
