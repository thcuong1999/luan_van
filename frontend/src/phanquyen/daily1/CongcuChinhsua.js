import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import BackdropMaterial from "../../components/BackdropMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import apiCongcu from "../../axios/apiCongcu";

const CongcuChinhsua = (props) => {
  const { id: congcuId } = props.match.params;
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  // api
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});

  const fetchCongcu = async () => {
    setLoading(true);
    const data = await apiCongcu.singleCongcu(congcuId);
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

    const data = await apiCongcu.suaCongcu(congcuId, formData);
    if (data.success) {
      Toastify({
        text: "Then nhan hieu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setTimeout(() => {
        props.history.push(`/daily1/congcu/chitiet/${congcuId}`);
      }, 1000);
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
      <div id="daily1Congcuthem">
        <div className="header">
          <h5
            className="title"
            onClick={() =>
              props.history.push(`/daily1/congcu/chitiet/${congcuId}`)
            }
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang chi tiết công cụ</span>
          </h5>
          <div className="btns">
            <ButtonMaterial variant="contained" onClick={submitForm}>
              Cập nhật
            </ButtonMaterial>
          </div>
        </div>
        <div className="content">
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="Tên công cụ"
                    name="ten"
                    value={congcu.ten}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Mô tả công cụ"
                    multiline
                    rows={5}
                    name="mota"
                    value={congcu.mota}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <span>Hình ảnh</span>
                  <input
                    type="file"
                    onChange={(e) =>
                      setCongcu({ ...congcu, hinhanh: e.target.files[0] })
                    }
                    style={{ border: "none", paddingLeft: 0 }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="Công dụng"
                    name="congdung"
                    value={congcu.congdung}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số lượng"
                    name="soluong"
                    value={congcu.soluong}
                    onChange={handleChange}
                  />
                </div>

                <div className="productInfo">
                  <h5>
                    Thuộc tính
                    <a
                      data-toggle="collapse"
                      href="#themThuocTinh"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <i class="fas fa-plus"></i>
                    </a>
                  </h5>

                  <div id="themThuocTinh" className="collapse show">
                    <div className="productInfoWrapper">
                      {thuoctinh.map((item, key) => {
                        return (
                          <div className="row">
                            <div className="col-lg-4 pl-0">
                              <input
                                type="text"
                                name="ten"
                                value={item.ten}
                                onChange={(e) => handleInputChange(e, key)}
                                placeholder="Ten thuoc tinh"
                              />
                            </div>
                            <div className="col-lg-8">
                              <div className="d-flex align-items-center">
                                <input
                                  type="text"
                                  name="giatri"
                                  value={item.giatri}
                                  onChange={(e) => handleInputChange(e, key)}
                                  placeholder="Gia tri"
                                />
                                {thuoctinh.length !== 1 && (
                                  <button
                                    className="removeElement"
                                    onClick={() => handleRemoveClick(key)}
                                  >
                                    <i class="fas fa-times"></i>
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="addElementBtn">
                              {thuoctinh.length - 1 === key && (
                                <button onClick={handleAddClick}>
                                  <i class="fas fa-plus"></i>
                                  <span>Thêm thuộc tính khác</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CongcuChinhsua;
