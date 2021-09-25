import React, { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useSelector } from "react-redux";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputPassword from "../../components/InputPassword";
import InputText from "../../components/InputText";
import apiDaily2 from "../../axios/apiDaily2";

const Daily2Them = (props) => {
  const [state, setState] = useState({
    ten: "",
    sdt: "",
    email: "",
    diachi: "",
    taikhoan: "",
    matkhau: "",
    xacnhanmk: "",
  });
  const {
    userInfo: { _id },
  } = useSelector((state) => state.user);

  const submitForm = async () => {
    const dl = {
      ...state,
      daily1: _id,
    };
    const data = await apiDaily2.themDaily2(dl);
    if (data.success) {
      Toastify({
        text: "Thêm dai ly thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setState({
        ten: "",
        sdt: "",
        email: "",
        diachi: "",
        taikhoan: "",
        matkhau: "",
        xacnhanmk: "",
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div id="daily2Them">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/daily1/daily2")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách dai ly 2</span>
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
                    label="Tên đại lý"
                    name="ten"
                    value={state.ten}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Tài khoản"
                    name="taikhoan"
                    value={state.taikhoan}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputPassword
                    label="Mật khẩu"
                    name="matkhau"
                    value={state.matkhau}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputPassword
                    label="Xác nhận mật khẩu"
                    name="xacnhanmk"
                    value={state.xacnhanmk}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="E-mail"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    name="sdt"
                    value={state.sdt}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Địa chỉ"
                    value={state.diachi}
                    name="diachi"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Daily2Them;
