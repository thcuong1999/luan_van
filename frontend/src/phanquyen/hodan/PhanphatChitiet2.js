import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiPhanphat from "../../axios/apiPhanphat";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import apiHodan from "../../axios/apiHodan";
import TablePhanphatChitiet2 from "./tables/TablePhanphatChitiet2";
import ModalChitietVattu from "../../components/ModalChitietVattu";

const PhanphatChitiet2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [dsVattu, setDsVattu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vattu, setVattu] = useState(null);
  const [success, setSuccess] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { id: phanphatId } = props.match.params;

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenModal = async () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleXacnhan = async () => {
    let dsvattu = dsVattu.map((item) => ({
      vattu: item.vattu._id,
      soluongphanphat: item.soluongphanphat,
    }));
    let payload = {
      phanphatId,
      hodanId: hodanInfo._id,
      dsVattu: dsvattu,
    };
    // console.log({ payload });
    const data = await apiPhanphat.hoanthanhVattuPhanphat(payload);
    if (data.success) {
      Toastify({
        text: "Xác nhận thành công",
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
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily1Info(phanphat.phanphat.to.daily1);
    setDsVattu(phanphat.phanphat.items);
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
          title="Quay lại vật tư phân phát"
          titleBack
          onClick={() => props.history.push("/hodan/vattuphanphat")}
        />
        <Content>
          <Section>
            <div className="row">
              <div className="col-lg-4">
                <Title>Bộ phận kinh doanh</Title>
                <FormGroup>
                  <InputText label="Tên bên cấp" value={bophankdInfo?.ten} />
                </FormGroup>

                <FormGroup>
                  <InputText label="Số điện thoại" value={bophankdInfo?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="E-mail" value={bophankdInfo?.email} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Địa chỉ"
                    rows={5}
                    multiline
                    value={bophankdInfo?.diachi}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-4">
                <Title>Đại lý cấp 1</Title>
                <FormGroup>
                  <InputText label="Tên bên cấp" value={daily1Info?.ten} />
                </FormGroup>

                <FormGroup>
                  <InputText label="Số điện thoại" value={daily1Info?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="E-mail" value={daily1Info?.email} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Địa chỉ"
                    rows={5}
                    multiline
                    value={daily1Info?.diachi}
                  />
                </FormGroup>
              </div>
              <div className="col-lg-4">
                <Title>Đại lý cấp 2</Title>
                <FormGroup>
                  <InputText
                    label="Tên đại lý nhận"
                    value={hodanInfo?.daidien}
                  />
                </FormGroup>

                <FormGroup>
                  <InputText label="Số điện thoại" value={hodanInfo?.sdt} />
                </FormGroup>

                <FormGroup>
                  <InputText label="CMND" value={hodanInfo?.cmnd} />
                </FormGroup>

                <FormGroup>
                  <InputText
                    label="Địa chỉ"
                    rows={5}
                    multiline
                    value={hodanInfo?.diachi}
                  />
                </FormGroup>
              </div>
            </div>
          </Section>

          <Section>
            <Title style={{ textAlign: "left" }}>Danh sách vật tư</Title>
            <TableSection>
              <TablePhanphatChitiet2
                dsVattu={dsVattu}
                phanphat={phanphat}
                setVattu={setVattu}
                handleOpenModal={handleOpenModal}
              />
            </TableSection>
          </Section>
          <ButtonRight>
            {phanphat?.daxacnhan ? (
              <ButtonMaterial variant="outlined">
                <CheckIcon /> Đã xác nhận
              </ButtonMaterial>
            ) : (
              <ButtonMaterial variant="contained" onClick={handleOpenDialog}>
                Xác nhận
              </ButtonMaterial>
            )}
          </ButtonRight>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Xác nhận phân phát"
        content="Xác nhận hoàn thành phiên phân phát"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleCloseDialog}
        onClick2={handleXacnhan}
      />

      <ModalChitietVattu
        open={modalOpen}
        onClose={handleCloseModal}
        vattu={vattu}
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

export default PhanphatChitiet2;
