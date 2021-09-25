import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Axios from "axios";
import Loading from "../../components/Loading";

const Daily1Chinhsua = (props) => {
  const [daily1, setDaily1] = useState({});
  const [credential, setCredential] = useState({ taikhoan: "", matkhau: "" });
  const [loading, setLoading] = useState(false);
  const { id: daily1Id } = props.match.params;

  const submitForm = async () => {
    const dl = {
      ...daily1,
      ...credential,
    };
    // return console.log(dl);
    const { data } = await Axios.put(`/api/daily1/single/${daily1Id}`, dl);
    console.log(data);
    if (data.success) {
      Toastify({
        text: "Sua dai ly thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/bophankd/daily1/chitiet/${daily1Id}`);
    }
  };

  const fetchDaily1 = async () => {
    setLoading(true);
    const { data } = await Axios.get(`/api/daily1/single/${daily1Id}`);
    if (data.success) {
      setDaily1(data.daily1);
      if (data.daily1.user) {
        setCredential({
          ...credential,
          taikhoan: data.daily1.user.taikhoan,
        });
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setDaily1({ ...daily1, [e.target.name]: e.target.value });
  };

  const handleChangeCredential = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdThemdaily1">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/daily1")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách dai ly 1</span>
          </h5>
          <div className="btns">
            <button className="btn btn-primary" onClick={submitForm}>
              Cap nhat
            </button>
          </div>
        </div>
        <div className="content">
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <span>Ten dai ly</span>
                  <input
                    type="text"
                    placeholder="Nhap ten dai ly"
                    name="ten"
                    value={daily1.ten}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <span>Tai khoan</span>
                  <input
                    type="text"
                    placeholder="Nhap tai khoan"
                    name="taikhoan"
                    value={credential.taikhoan}
                    onChange={handleChangeCredential}
                    disabled={daily1.user}
                  />
                </div>

                <div className="formGroup">
                  <span>Mat khau moi</span>
                  <input
                    type="password"
                    placeholder="Nhap mk"
                    name="matkhau"
                    value={daily1.matkhau}
                    onChange={handleChangeCredential}
                  />
                </div>

                <div className="formGroup">
                  <span>Xac nhan mat khau moi</span>
                  <input
                    type="password"
                    placeholder="Xac nhan mk"
                    name="xacnhanmk"
                    value={daily1.xacnhanmk}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <span>E-mail</span>
                  <input
                    type="text"
                    placeholder="Nhap dia chi email"
                    name="email"
                    value={daily1.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <span>So dien thoai</span>
                  <input
                    type="text"
                    placeholder="Nhap so dien thoai"
                    name="sdt"
                    value={daily1.sdt}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <span>Dia chi</span>
                  <textarea
                    value={daily1.diachi}
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

export default Daily1Chinhsua;
