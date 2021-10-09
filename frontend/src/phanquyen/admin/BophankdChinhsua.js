import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";

const BophankdChinhsua = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: bophankdId } = props.match.params;
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, setHuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");
  const [taikhoan, setTaikhoan] = useState(false);
  const [matkhau, setMatkhau] = useState(false);
  const [xnMatkhau, setXnMatkhau] = useState(false);
  const [pwdNotMatch, setPwdNotMatch] = useState(false);

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    const dl = {
      ten: bophankd.ten,
      sdt: bophankd.sdt,
      email: bophankd.email,
      diachi: `${xa}, ${huyen}, ${tinh}`,
      taikhoan: taikhoan,
      matkhau: matkhau,
    };
    // console.log(dl);
    const data = await apiBophankd.suaBophankd(bophankdId, dl);
    console.log(data);
    if (data.success) {
      Toastify({
        text: "Then nhan hieu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/admin/bophankd`);
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
    const dc = bophankd.diachi.split(",").map((item) => item.trim());
    setXa(dc[0]);
    setHuyen(dc[1]);
    setTinh(dc[2]);
    setTaikhoan(bophankd?.user?.taikhoan);
    setBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <BophankinhdoanhThemWrapper>
      <Header
        title="Quay lại danh sách bộ phận kinh doanh"
        titleBack
        onClick={() => props.history.push("/admin/bophankd")}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmit}>
            Cập nhật
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <div className="row">
            <div className="col-lg-6">
              <FormGroup>
                <InputText
                  label="Tên BPKD"
                  name="ten"
                  value={bophankd?.ten}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      ten: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="Tên tài khoản"
                  name="taikhoan"
                  value={taikhoan}
                  onChange={(e) => setTaikhoan(e.target.value)}
                  disabled={bophankd?.user?.taikhoan}
                />
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Mật khẩu"
                  name="matkhau"
                  value={bophankd?.matkhau}
                  onChange={(e) => setMatkhau(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <InputPassword
                  label="Xác nhận mật khẩu"
                  name="xnmatkhau"
                  value={bophankd?.xnmatkhau}
                  onChange={(e) => {
                    setXnMatkhau(e.target.value);
                    setPwdNotMatch(false);
                  }}
                />
                {pwdNotMatch && (
                  <ErrMsg>Xác nhận mật khẩu không chính xác</ErrMsg>
                )}
              </FormGroup>
            </div>
            <div className="col-lg-6">
              <FormGroup>
                <InputText
                  label="Số điện thoại"
                  name="sdt"
                  value={bophankd?.sdt}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      sdt: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <InputText
                  label="E-mail"
                  name="email"
                  value={bophankd?.email}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <span>Địa chỉ</span>
                <div className="row">
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={tinh}
                      data={dsTinh}
                      onClick={(val) => {
                        setTinh(val);
                        setHuyen("Chọn Quận/Huyện");
                        setXa("Chọn Xã");
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={huyen}
                      data={dsHuyen}
                      onClick={(val) => setHuyen(val)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DropdownCustom
                      dropdownStyles={{ width: 230 }}
                      selected={xa}
                      data={dsXa}
                      onClick={(val) => setXa(val)}
                    />
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
        </Form>
      </Content>
    </BophankinhdoanhThemWrapper>
  );
};

const BophankinhdoanhThemWrapper = styled.div`
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
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default BophankdChinhsua;
