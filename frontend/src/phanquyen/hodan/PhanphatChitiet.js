import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiPhanphat from "../../axios/apiPhanphat";
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ModalChitietCongcu from "../../components/ModalChitietCongcu";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import apiHodan from "../../axios/apiHodan";

const PhanphatChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [dsCongcu, setDsCongcu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [congcu, setCongcu] = useState(null);
  const [success, setSuccess] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { id: phanphatId } = props.match.params;

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleXacnhan = async () => {
    let dscc = dsCongcu.map((item) => ({
      congcu: item.congcu._id,
      soluongphanphat: item.soluongphanphat,
    }));
    let payload = {
      phanphatId,
      hodanId: hodanInfo._id,
      dsCongcu: dscc,
    };
    const data = await apiPhanphat.hoanthanhPhanphat(payload);
    if (data.success) {
      Toastify({
        text: "X??c nh???n th??nh c??ng",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      handleCloseDialog();
      setSuccess(true);
    }
  };

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodanBasedUser(userInfo._id);
    const { phanphat } = await apiHodan.singlePhanphat(hodan._id, phanphatId);
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.phanphat.to.hodan.langnghe
    );
    console.log(phanphat);
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily1Info(phanphat.phanphat.to.daily1);
    setDsCongcu(phanphat.phanphat.items);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchSinglePhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay l???i danh s??ch ph??n ph??t"
          titleBack
          onClick={() => props.history.push("/hodan/phanphat")}
        />
        <Content>
          <Section>
            <div className="row">
              <div className="col-lg-4">
                <Title>B??? ph???n kinh doanh</Title>
                <FormGroup>
                  <InputText label="T??n b??n c???p" value={bophankdInfo?.ten} />
                </FormGroup>

                <FormGroup>
                  <InputText label="S??? ??i???n tho???i" value={bophankdInfo?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="E-mail" value={bophankdInfo?.email} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="?????a ch???"
                    rows={5}
                    multiline
                    value={bophankdInfo?.diachi}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-4">
                <Title>?????i l?? c???p 1</Title>
                <FormGroup>
                  <InputText label="T??n b??n c???p" value={daily1Info?.ten} />
                </FormGroup>

                <FormGroup>
                  <InputText label="S??? ??i???n tho???i" value={daily1Info?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="E-mail" value={daily1Info?.email} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="?????a ch???"
                    rows={5}
                    multiline
                    value={daily1Info?.diachi}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-4">
                <Title>?????i l?? c???p 2</Title>
                <FormGroup>
                  <InputText
                    label="T??n ?????i l?? nh???n"
                    value={hodanInfo?.daidien}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText label="S??? ??i???n tho???i" value={hodanInfo?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="CMND" value={hodanInfo?.cmnd} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="?????a ch???"
                    rows={5}
                    multiline
                    value={hodanInfo?.diachi}
                  />
                </FormGroup>
              </div>
            </div>
          </Section>

          <Section>
            <Title style={{ textAlign: "left" }}>Danh s??ch c??ng c???</Title>
            <TableSection>
              <TablePhanphatChitiet
                dsCongcu={dsCongcu}
                phanphat={phanphat}
                setCongcu={setCongcu}
                handleOpenModal={handleOpenModal}
              />
            </TableSection>
          </Section>
          <ButtonRight>
            {phanphat?.daxacnhan ? (
              <ButtonMaterial variant="outlined">
                <CheckIcon /> ???? x??c nh???n
              </ButtonMaterial>
            ) : (
              <ButtonMaterial variant="contained" onClick={handleOpenDialog}>
                X??c nh???n
              </ButtonMaterial>
            )}
          </ButtonRight>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="X??c nh???n ph??n ph??t"
        content="X??c nh???n ho??n th??nh phi??n ph??n ph??t"
        text1="H???y"
        text2="?????ng ??"
        onClick1={handleCloseDialog}
        onClick2={handleXacnhan}
      />

      <ModalChitietCongcu
        open={modalOpen}
        onClose={handleCloseModal}
        congcu={congcu}
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
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Section = styled.div`
  padding: 26px;
  background: #fff;
  margin-bottom: 20px;
`;
const Title = styled.h6`
  text-align: center;
  margin-bottom: 20px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
  input,
  textarea {
    font-family: "Poppins", sans-serif;
  }
`;
const TableSection = styled.div`
  table {
    th,
    td {
      font-family: "Poppins", sans-serif;
    }
    th:first-child {
      display: none;
    }
    td:first-child {
      display: none;
    }
  }
`;
const ButtonRight = styled.div`
  text-align: right;
  padding: 20px;
  background-color: #fff;
`;

export default PhanphatChitiet;
