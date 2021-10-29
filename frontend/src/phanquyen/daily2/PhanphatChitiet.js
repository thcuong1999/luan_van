import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiPhanphat from "../../axios/apiPhanphat";
import apiDaily2 from "../../axios/apiDaily2";
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ModalChitietCongcu from "../../components/ModalChitietCongcu";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";

const PhanphatChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [langngheInfo, setLangngheInfo] = useState(null);
  const [hodanInfo, setHodanInfo] = useState(null);
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

  const handleNhapkho = async () => {
    const items = dsCongcu.map((item) => ({
      congcu: item.congcu._id,
      soluongphanphat: item.soluongphanphat,
      phanphat: phanphatId,
    }));
    const payload = {
      items,
      daily2Id: daily2Info._id,
      phanphatId,
    };
    //  console.log(payload);
    const data = await apiPhanphat.nhapKhoCongcu(payload);
    console.log(data);
    if (data.success) {
      Toastify({
        text: "Nhập kho thành công",
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
    const { daily2 } = await apiDaily2.singleBophankdBasedUser(userInfo._id);
    const { phanphat } = await apiDaily2.singlePhanphat(daily2._id, phanphatId);
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.phanphat.to.hodan.langnghe
    );
    console.log(phanphat);
    // set data
    setPhanphat(phanphat);
    setBophankdInfo(phanphat.phanphat.from.bophankd);
    setHodanInfo(phanphat.phanphat.to.hodan);
    setDaily2Info(daily2);
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
          onClick={() => props.history.push("/daily1/phanphat")}
        />
        <Content>
          <Section>
            <div className="row">
              <div className="col-lg-6">
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
              <div className="col-lg-6">
                <Title>Hộ dân đích</Title>
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
                  <InputText label="Năm sinh" value={hodanInfo?.namsinh} />
                </FormGroup>

                <FormGroup>
                  <InputText label="Làng nghề" value={langngheInfo?.ten} />
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
            <Title>Danh sách công cụ</Title>
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
            {phanphat?.danhapkho ? (
              <ButtonMaterial variant="outlined">
                <CheckIcon /> Đã nhập kho
              </ButtonMaterial>
            ) : (
              <ButtonMaterial variant="contained" onClick={handleOpenDialog}>
                Nhập kho
              </ButtonMaterial>
            )}

            {phanphat?.daphanphatxuong ? (
              <ButtonMaterial variant="outlined" style={{ marginLeft: 16 }}>
                <CheckIcon /> Đã chuyển tiếp
              </ButtonMaterial>
            ) : (
              <ButtonMaterial
                variant="contained"
                onClick={() =>
                  props.history.push(
                    `/daily2/phanphat/chuyentiep/${phanphatId}`
                  )
                }
                style={{ marginLeft: 16 }}
              >
                Chuyển tiếp
              </ButtonMaterial>
            )}
          </ButtonRight>
        </Content>
      </Wrapper>

      <DialogMaterial
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Nhập kho công cụ"
        content="Nhập tất cả công cụ trong danh phân phát sách vào kho"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleCloseDialog}
        onClick2={handleNhapkho}
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
