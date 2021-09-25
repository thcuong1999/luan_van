import React, { useState, useRef } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Axios from "axios";
import InputText from "../../components/InputText";
import ButtonMaterial from "../../components/ButtonMaterial";

const CongcuThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [hinhanh, sethinhanh] = useState(null);
  const [congdung, setCongdung] = useState("");
  const [soluong, setSoluong] = useState(0);
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

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("ten", ten);
    formData.append("mota", mota);
    formData.append("hinhanh", hinhanh);
    formData.append("congdung", congdung);
    formData.append("soluong", soluong);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

    const { data } = await Axios.post("/api/congcu/them", formData);
    if (data.success) {
      Toastify({
        text: "Then nhan hieu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setTen("");
      setMota("");
      ref.current.value = "";
      setCongdung("");
      setSoluong(0);
      setThuoctinh([{ ten: "", giatri: "" }]);
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

  return (
    <>
      <div id="bophankdThemcongcu">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/congcu")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách cong cu</span>
          </h5>
          <div className="btns">
            <ButtonMaterial variant="contained" onClick={submitForm}>
              Lưu
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
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Mô tả công cụ"
                    value={mota}
                    onChange={(e) => setMota(e.target.value)}
                    multiline
                    rows={5}
                  />
                </div>

                <div className="formGroup">
                  <span>Hinh anh</span>
                  <input
                    ref={ref}
                    type="file"
                    onChange={(e) => sethinhanh(e.target.files[0])}
                    style={{ border: "none", paddingLeft: 0 }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="Công dụng"
                    value={congdung}
                    onChange={(e) => setCongdung(e.target.value)}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số lượng"
                    value={soluong}
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
                </div>

                <div className="themThuocTinh">
                  <h5>
                    Thuoc tinh
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
                                  <span>Them thuoc tinh khac</span>
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

export default CongcuThem;
