import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";

const LoginPage = (props) => {
  const [taikhoan, setTaikhoan] = useState("");
  const [matkhau, setMatKhau] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(taikhoan, matkhau));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(`/${userInfo.vaitro}`);
    }
  }, [props.history, userInfo]);

  return (
    <div id="loginPage">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="formWrapper">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <div>Đăng nhập</div>
            </div>

            <div className="inputs">
              <div className="inputWrapper">
                <i class="fas fa-user"></i>
                <input
                  className="input"
                  type="text"
                  placeholder="Tài khoản"
                  onChange={(e) => setTaikhoan(e.target.value)}
                />
              </div>

              <div className="inputWrapper">
                <i class="fas fa-lock"></i>
                <input
                  className="input"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setMatKhau(e.target.value)}
                />
              </div>
            </div>

            <button className="button">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
