import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import apiLangnghe from "../../axios/apiLangnghe";
import ButtonMaterial from "../../components/ButtonMaterial";
import DropdownCustom from "../../components/DropdownCustom";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import apiHodan from "../../axios/apiHodan";
import apiPhanphat from "../../axios/apiPhanphat";
import TablePhanphatChuyentiep from "./tables/TablePhanphatChuyentiep";
import BackdropMaterial from "../../components/BackdropMaterial";
import ModalChitietCongcu from "../../components/ModalChitietCongcu";
import ModalTienhanhPhanphat from "./ModalTienhanhPhanphat";

const PhanphatChuyentiep = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setdsCongcu] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [langngheInfo, setLangngheInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [daily2Info, setDaily2Info] = useState(null);
  const { id: phanphatId } = props.match.params;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTienhanhpp, setModalTienhanhpp] = useState(false);
  const [singleCongcu, setSingleCongcu] = useState(null);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenModalTienhanhpp = async () => setModalTienhanhpp(true);
  const handleCloseModalTienhanhpp = () => setModalTienhanhpp(false);

  const handleTienhanhPhanphat = async () => {
    const payload = {
      phanphatId,
      daily2Id: daily2Info._id,
      daily1Id: daily1Info._id,
    };
    const data = await apiPhanphat.daily1ppDaily2(payload);
    console.log(data);
    if (data.success) {
      Toastify({
        text: "Phân phát thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      handleCloseModalTienhanhpp();
      // prop.push do later
    }
  };

  const fetchPhanphat = async () => {
    setLoading(true);
    const { phanphat } = await apiPhanphat.singlePhanphat(phanphatId);
    // fetch langnghe
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.to.hodan.langnghe
    );
    // set data
    setdsCongcu(phanphat.items);
    setBophankdInfo(phanphat.from.bophankd);
    setLangngheInfo(langnghe);
    setHodanInfo(phanphat.to.hodan);
    setDaily1Info(phanphat.to.daily1);
    setDaily2Info(phanphat.to.daily2);
    //console.log({ langnghe });
    setLoading(false);
  };

  useEffect(() => {
    fetchPhanphat();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay về trang danh sách phân phát"
          titleBack
          onClick={() =>
            props.history.push(`/daily1/phanphat/chitiet/${phanphatId}`)
          }
        />
        <Content>
          <FormWrapper>
            <Form>
              <FormTitle>Tiến hành phân phát</FormTitle>
              <FormGroup>
                <Label>Bộ phận kinh doanh:</Label>
                <Input
                  type="text"
                  value={`${bophankdInfo?.ten}, ${bophankdInfo?.diachi}`}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Làng nghề:</Label>
                <Input
                  type="text"
                  value={`${langngheInfo?.ten}, ${langngheInfo?.huyen}, ${langngheInfo?.tinh}`}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Hộ dân:</Label>
                <Input
                  type="text"
                  value={`${hodanInfo?.daidien}, ${hodanInfo?.diachi}`}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Đại lý cấp 2:</Label>
                <Input
                  type="text"
                  value={`${daily2Info?.ten}, ${daily2Info?.diachi}`}
                  readOnly
                />
              </FormGroup>
            </Form>
          </FormWrapper>

          <Section>
            <SectionTitle>Danh sách công cụ phân phát</SectionTitle>
            <TablePhanphatChuyentiep
              dsCongcu={dsCongcu}
              setSingleCongcu={setSingleCongcu}
              handleOpenModal={handleOpenModal}
            />
          </Section>

          <ButtonRight>
            <ButtonMaterial
              variant="contained"
              onClick={handleOpenModalTienhanhpp}
            >
              Tiến hành phân phát
            </ButtonMaterial>
          </ButtonRight>
        </Content>
      </Wrapper>

      <ModalTienhanhPhanphat
        open={modalTienhanhpp}
        onClose={handleCloseModalTienhanhpp}
        info={{ daily2Info, hodanInfo }}
        handleTienhanhPhanphat={handleTienhanhPhanphat}
      />

      <ModalChitietCongcu
        open={modalOpen}
        onClose={handleCloseModal}
        congcu={singleCongcu}
      />
    </>
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
  background: #fff;
  padding: 36px 20px 16px 36px;
  width: 100%;
`;
const Form = styled.div`
  width: 570px;
  margin: auto;
  padding: 0 26px;
`;
const FormTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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
const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;
const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: -10px;
`;
const ButtonRight = styled.div`
  text-align: right;
  margin-top: 20px;
  background: #fff;
  padding: 20px;
`;
const Section = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
`;
const SectionTitle = styled.h6`
  margin-bottom: 20px;
  color: #333;
`;

export default PhanphatChuyentiep;
