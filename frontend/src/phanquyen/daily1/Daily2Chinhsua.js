import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import BackdropMaterial from "../../components/BackdropMaterial";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiDaily2 from "../../axios/apiDaily2";

const Daily2Chinhsua = (props) => {
  const [daily2, setDaily2] = useState({});
  const [credential, setCredential] = useState({
    taikhoan: "",
    matkhau: "",
    xacnhanmk: "",
  });
  const [loading, setLoading] = useState(false);
  const { id: daily2Id } = props.match.params;

  const submitForm = async () => {
    const dl = {
      ...daily2,
      ...credential,
    };
    // return console.log(dl);
    const data = await apiDaily2.suaDaily2(daily2Id, dl);
    if (data.success) {
      Toastify({
        text: "Sua dai ly thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/daily1/daily2/chitiet/${daily2Id}`);
    }
  };

  const fetchDaily2 = async () => {
    setLoading(true);
    const data = await apiDaily2.singleDaily2(daily2Id);
    if (data.success) {
      setDaily2(data.daily2);
      if (data.daily2.user) {
        setCredential({
          ...credential,
          taikhoan: data.daily2.user.taikhoan,
        });
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setDaily2({ ...daily2, [e.target.name]: e.target.value });
  };

  const handleChangeCredential = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchDaily2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <div id="daily2Chinhsua">
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
                    label="Tên đại lý"
                    name="ten"
                    value={daily2.ten}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Tài khoản"
                    name="taikhoan"
                    value={credential.taikhoan}
                    onChange={handleChangeCredential}
                    disabled={daily2.user}
                  />
                </div>

                <div className="formGroup">
                  <InputPassword
                    label="Mật khẩu"
                    name="matkhau"
                    value={credential.matkhau}
                    onChange={handleChangeCredential}
                  />
                </div>

                <div className="formGroup">
                  <InputPassword
                    label="Xác nhận mật khẩu"
                    name="xacnhanmk"
                    value={credential.xacnhanmk}
                    onChange={handleChangeCredential}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="E-mail"
                    name="email"
                    value={daily2.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    name="sdt"
                    value={daily2.sdt}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Địa chỉ"
                    value={daily2.diachi}
                    name="diachi"
                    onChange={handleChange}
                    multiline
                    rows={5}
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

export default Daily2Chinhsua;
