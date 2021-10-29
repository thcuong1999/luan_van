import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import { useSelector } from "react-redux";
import apiSanpham from "../../axios/apiSanpham";
import apiGSV from "../../axios/apiGSV";
import apiLangnghe from "../../axios/apiLangnghe";

const LangngheThem = (props) => {
  const [gsvInfo, setGsvInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [ten, setTen] = useState("");
  const [dsLoaiSp, setDsLoaiSp] = useState([]);
  const [sanphamchinh, setSanphamchinh] = useState("Chọn loại sản phẩm");
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);

  const [errMsg, setErrMsg] = useState("");
  const [errField, setErrField] = useState("");

  const handleCheckValidate = () => {
    if (!ten) {
      setErrMsg("Vui lòng nhập tên làng");
      setErrField("ten");
      return;
    } else {
      setErrMsg("");
      setErrField("");
    }
    if (tinh === "Chọn Tỉnh/Thành Phố") {
      setErrMsg("Vui lòng chọn tỉnh/thành phố");
      setErrField("tinh");
      return;
    } else {
      setErrMsg("");
      setErrField("");
    }
    if (huyen === "Chọn Quận/Huyện") {
      setErrMsg("Vui lòng chọn quận/huyện");
      setErrField("huyen");
      return;
    } else {
      setErrMsg("");
      setErrField("");
    }
    if (sanphamchinh === "Chọn loại sản phẩm") {
      setErrMsg("Vui lòng chọn loại sản phẩm");
      setErrField("sanphamchinh");
      return;
    } else {
      setErrMsg("");
      setErrField("");
    }
  };

  const handleSubmit = async () => {
    handleCheckValidate();
    const dl = {
      gsvId: gsvInfo._id,
      ten,
      tinh,
      huyen,
      sanphamchinh:
        sanphamchinh !== "Chọn loại sản phẩm"
          ? dsLoaiSp.find((item) => item.ten === sanphamchinh).key
          : sanphamchinh,
    };
    // console.log(dl);
    const data = await apiLangnghe.themLangnghe(dl);
    if (data.success) {
      Toastify({
        text: "Thêm làng nghề thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      resetFields();
    }
  };

  const resetFields = () => {
    setTen("");
    setTinh("Chọn Tỉnh/Thành Phố");
    sethuyen("Chọn Quận/Huyện");
    setSanphamchinh("Chọn loại sản phẩm");
  };

  const fetchDsLoaiSp = async () => {
    const { loai } = await apiSanpham.dsLoai();
    setDsLoaiSp(
      loai.map((item) => {
        if (item === "thucongmynghe") {
          return {
            key: "thucongmynghe",
            ten: "Thủ công mỹ nghệ",
          };
        } else if (item === "nongsan") {
          return {
            key: "nongsan",
            ten: "Nông sản",
          };
        } else {
          return {
            key: "nguyenlieu",
            ten: "Nguyên liệu",
          };
        }
      })
    );
  };

  const fetchGsvInfo = async () => {
    const data = await apiGSV.singleGsvBasedUserId(userInfo._id);
    setGsvInfo(data.gsv);
  };

  useEffect(() => {
    fetchDsLoaiSp();
    fetchGsvInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmit}>
            Lưu
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Thêm làng nghề</FormTitle>

            <FormGroup>
              <Label>Tên làng:</Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                value={ten}
                onChange={(e) => {
                  setTen(e.target.value);
                }}
              />
              {errMsg && errField === "ten" && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              <DropdownCustom
                dropdownStyles={{ width: "100%" }}
                selected={tinh}
                data={dsTinh}
                onClick={(val) => {
                  setTinh(val);
                  sethuyen("Chọn Quận/Huyện");
                }}
              />
              {errMsg && errField === "tinh" && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              <DropdownCustom
                dropdownStyles={{ width: "100%" }}
                selected={huyen}
                data={dsHuyen}
                onClick={(val) => {
                  sethuyen(val);
                }}
              />
              {errMsg && errField === "huyen" && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>Sản phẩm chính:</Label>
              <DropdownCustom
                dropdownStyles={{ width: "100%" }}
                selected={sanphamchinh}
                data={dsLoaiSp.map((item) => item.ten)}
                onClick={(val) => {
                  setSanphamchinh(val);
                }}
              />
              {errMsg && errField === "sanphamchinh" && (
                <ErrMsg>{errMsg}</ErrMsg>
              )}
            </FormGroup>
          </FormContent>
        </Form>
      </Content>
    </Container>
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
const FormContent = styled.div`
  width: 570px;
  margin: auto;
  font-family: "Poppins", sans-serif;
`;
const FormTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #555;
  margin-bottom: 36px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
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
const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export default LangngheThem;
