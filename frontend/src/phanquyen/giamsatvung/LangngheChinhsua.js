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
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
        // headerRight={
        //   <ButtonMaterial variant="contained" onClick={handleSubmit}>
        //     Lưu
        //   </ButtonMaterial>
        // }
      />
      <Content>
        <FormWrapper>
          <Form>
            <Title>Chỉnh sửa làng nghề</Title>
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
                label="Chọn loại sản phẩm"
                dropdownStyles={{ width: "100%" }}
                selected={sanphamchinh}
                data={dsLoaiSp.map((item) => item.ten)}
                onClick={(val) => {
                  setSanphamchinh(val);
                }}
              />
            </FormGroup>

            <ButtonRight>
              <ButtonMaterial variant="contained" onClick={handleSubmit}>
                Cập nhật
              </ButtonMaterial>
            </ButtonRight>
          </Form>
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 20px 36px;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 26px;
  width: 570px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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

const ButtonRight = styled.div`
  text-align: right;
`;

export default LangngheThem;
