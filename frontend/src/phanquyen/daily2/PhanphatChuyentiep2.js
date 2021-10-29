import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import apiLangnghe from "../../axios/apiLangnghe";
import ButtonMaterial from "../../components/ButtonMaterial";
import Header from "../../components/Header";
import apiPhanphat from "../../axios/apiPhanphat";
import BackdropMaterial from "../../components/BackdropMaterial";
import ModalTienhanhPhanphat from "./ModalTienhanhPhanphat";
import ModalChitietVattu from "../../components/ModalChitietVattu";
import TablePhanphatChuyentiep2 from "./tables/TablePhanphatChuyentiep2";

const PhanphatChuyentiep2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsVattu, setdsVattu] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [langngheInfo, setLangngheInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [daily2Info, setDaily2Info] = useState(null);
  const { id: phanphatId } = props.match.params;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTienhanhpp, setModalTienhanhpp] = useState(false);
  const [singleVattu, setSingleVattu] = useState(null);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenModalTienhanhpp = async () => setModalTienhanhpp(true);
  const handleCloseModalTienhanhpp = () => setModalTienhanhpp(false);

  const handleTienhanhPhanphat = async () => {
    const payload = {
      phanphatId,
      hodanId: hodanInfo._id,
      daily2Id: daily2Info._id,
    };
    // console.log({ payload });
    const data = await apiPhanphat.daily2ppvattuHodan(payload);
    // console.log(data);
    if (data.success) {
      Toastify({
        text: "Phân phát thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/daily2/vattuphanphat/chitiet/${phanphatId}`);
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
    setdsVattu(phanphat.items);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            props.history.push(`/daily2/vattuphanphat/chitiet/${phanphatId}`)
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
                <Label>Đại lý cấp 1:</Label>
                <Input
                  type="text"
                  value={`${daily1Info?.ten}, ${daily1Info?.diachi}`}
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
            </Form>
          </FormWrapper>

          <Section>
            <SectionTitle>Danh sách công cụ phân phát</SectionTitle>
            <TableSection>
              <TablePhanphatChuyentiep2
                dsVattu={dsVattu}
                setSingleVattu={setSingleVattu}
                handleOpenModal={handleOpenModal}
              />
            </TableSection>
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
        hodanInfo={hodanInfo}
        handleTienhanhPhanphat={handleTienhanhPhanphat}
      />

      <ModalChitietVattu
        open={modalOpen}
        onClose={handleCloseModal}
        vattu={singleVattu}
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
  font-family: "Poppins", sans-serif;
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
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default PhanphatChuyentiep2;
