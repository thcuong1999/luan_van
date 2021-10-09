import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Axios from "axios";
import BackdropMaterial from "../../components/BackdropMaterial";
import InputText from "../../components/InputText";
import ButtonMaterial from "../../components/ButtonMaterial";
import styled from "styled-components";
import Header from "../../components/Header";

const CongcuChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  // api
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});
  const { id: congcuId } = props.match.params;

  const fetchCongcu = async () => {
    setLoading(true);
    const { data } = await Axios.get(`/api/congcu/single/${congcuId}`);
    if (data.success) {
      setCongcu(data.congcu);
      setThuoctinh(
        data.congcu.thuoctinh.length ? data.congcu.thuoctinh : thuoctinh
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCongcu();
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
    formData.append("ten", congcu.ten);
    formData.append("mota", congcu.mota);
    formData.append("hinhanh", congcu.hinhanh);
    formData.append("congdung", congcu.congdung);
    formData.append("soluong", congcu.soluong);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

    const { data } = await Axios.put(
      `/api/congcu/single/${congcuId}`,
      formData
    );
    console.log(data);
    if (data.success) {
      Toastify({
        text: "Then nhan hieu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/bophankd/congcu/chitiet/${congcuId}`);
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
    setCongcu({
      ...congcu,
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
          title="Quay lại trang danh sách công cụ"
          titleBack
          onClick={() => props.history.push("/bophankd/congcu")}
          headerRight={
            <ButtonMaterial variant="contained" onClick={submitForm}>
              Cập nhật
            </ButtonMaterial>
          }
        />
        <Content>
          <Form>
            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Tên công cụ:</Label>
                  <Input
                    type="text"
                    placeholder="Nhập tên công cụ"
                    value={congcu.ten}
                    name="ten"
                    onChange={handleChange}
                  />
                  {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
                </FormGroup>

                <FormGroup>
                  <Label>Mô tả công cụ:</Label>
                  <TextArea
                    value={congcu.mota}
                    name="mota"
                    onChange={handleChange}
                    rows="5"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Hình ảnh:</Label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setCongcu({
                        ...congcu,
                        hinhanh: e.target.files[0],
                      })
                    }
                  />
                </FormGroup>
              </div>
              <div className="col-lg-6">
                <FormGroup>
                  <Label>Công dụng:</Label>
                  <Input
                    type="text"
                    placeholder="Nhập công dụng"
                    name="congdung"
                    value={congcu.congdung}
                    onChange={handleChange}
                  />
                  {/* {!congdung && <ErrMsg>{errMsg}</ErrMsg>} */}
                </FormGroup>

                <FormGroup>
                  <Label>Số lượng:</Label>
                  <Input
                    type="text"
                    placeholder="Nhập số lượng"
                    value={congcu.soluong}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (isNaN(val)) {
                        e.target.value = 0;
                        setCongcu({
                          ...congcu,
                          soluong: 0,
                        });
                      } else {
                        setCongcu({
                          ...congcu,
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
                              <CrossButton
                                onClick={() => handleRemoveClick(key)}
                              >
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
              </div>
            </div>
          </Form>
        </Content>
      </Container>
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

const SmallLabel = styled.span`
  font-size: 15px;
  color: blue;
  display: block;
  margin-top: 4px;
  cursor: pointer;
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

export default CongcuChinhsua;
