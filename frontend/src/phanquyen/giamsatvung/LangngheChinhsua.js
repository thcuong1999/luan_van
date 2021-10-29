import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import DropdownCustom from "../../components/DropdownCustom";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiSanpham from "../../axios/apiSanpham";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";

const LangngheThem = (props) => {
  const [loading, setLoading] = useState(false);
  const { id: langngheId } = props.match.params;

  const [ten, setTen] = useState("");
  const [dsLoaiSp, setDsLoaiSp] = useState([]);
  const [sanphamchinh, setSanphamchinh] = useState("Chọn loại sản phẩm");
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, sethuyen] = useState("Chọn Quận/Huyện");
  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);

  const handleSubmit = async () => {
    const dl = {
      ten,
      tinh,
      huyen,
      sanphamchinh: dsLoaiSp.find((item) => item.ten === sanphamchinh).key,
    };
    // console.log(dl);
    const data = await apiLangnghe.chinhsuaLangnghe(langngheId, dl);
    if (data.success) {
      Toastify({
        text: "Chỉnh sửa làng nghề thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    props.history.push("/giamsatvung/langnghe");
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

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    setTen(langnghe.ten);
    setTinh(langnghe.tinh);
    sethuyen(langnghe.huyen);
    setSanphamchinh(
      langnghe.sanphamchinh === "thucongmynghe"
        ? "Thủ công mỹ nghệ"
        : langnghe.sanphamchinh === "nongsan"
        ? "Nông sản"
        : "Nguyên liệu"
    );
    fetchDsLoaiSp();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
        headerRight={
          <ButtonMaterial variant="contained" onClick={handleSubmit}>
            Cập nhật
          </ButtonMaterial>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Cập nhật làng nghề</FormTitle>

            <FormGroup>
              <Label>Tên làng:</Label>
              <Input
                type="text"
                placeholder="Nhập tên làng"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              <DropdownCustom
                label="Chọn Tỉnh/Thành Phố"
                dropdownStyles={{ width: "100%" }}
                selected={tinh}
                data={dsTinh}
                onClick={(val) => {
                  setTinh(val);
                  sethuyen("Chọn Quận/Huyện");
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              <DropdownCustom
                label="Chọn Quận/Huyện"
                dropdownStyles={{ width: "100%" }}
                selected={huyen}
                data={dsHuyen}
                onClick={(val) => {
                  sethuyen(val);
                }}
              />
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
