import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiPhanphat from "../../axios/apiPhanphat";
import apiCongcu from "../../axios/apiCongcu";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
// modal
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
// icon
import CheckIcon from "@mui/icons-material/Check";
import { getCurrentDatetime } from "../../utils";
import ModalChitietCongcu from "../../components/ModalChitietCongcu";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import apiHodan from "../../axios/apiHodan";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PhanphatChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [langngheInfo, setLangngheInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [daily2Info, setDaily2Info] = useState(null);
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
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.phanphat.to.hodan.langnghe
    );
    console.log(phanphat);
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily1Info(phanphat.phanphat.to.daily1);
    setDaily2Info(phanphat.phanphat.to.daily2);
    setDsCongcu(phanphat.phanphat.items);
    setLangngheInfo(langnghe);
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
          title="Quay lại danh sách phân phát"
          titleBack
          onClick={() => props.history.push("/hodan/phanphat")}
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
            <Title style={{ textAlign: "left" }}>Danh sách công cụ</Title>
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
`;
const Section = styled.div`
  padding: 26px;
  background: #fff;
  margin-bottom: 20px;
`;
const BophankdSec = styled.div`
  width: 570px;
  margin: auto;
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;
const Title = styled.h6`
  text-align: center;
  margin-bottom: 30px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
`;
const TableSection = styled.div`
  table {
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
