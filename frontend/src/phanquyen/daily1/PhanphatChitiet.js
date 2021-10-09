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
import TableBaocaoThieu from "./tables/TableBaocaoThieu";
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
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openModalPhanphat, setOpenModalPhanphat] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [congcuThieu, setCongcuThieu] = React.useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const { id: phanphatId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [selectedDaily2, setSelectedDaily2] = useState("");
  // api
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [congcu, setCongcu] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const [dsDaily2, setDsDaily2] = useState([]);

  // console.log({ phanphat });

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const data = await apiPhanphat.singlePhanphat(phanphatId);
    if (data.success) {
      setPhanphat(data.phanphat);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchDsDaily2 = async () => {
    const data = await apiDaily2.dsDaily2();
    setDsDaily2(data.daily2);
  };

  const fetchDaily1Info = async () => {
    const data = await apiDaily1.singleBophankdBasedUser(userInfo._id);
    setDaily1Info(data.daily1);
  };

  const handleOpenModalPhanphat = () => setOpenModalPhanphat(true);
  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = () => setDialogOpen(false);
  const handleCloseModalPhanphat = () => setOpenModalPhanphat(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => {
    setOpen2(false);
    setErrMsg("");
  };

  const handleClickOpen = async (congcuId) => {
    const data = await apiCongcu.singleCongcu(congcuId);
    setCongcu(data.congcu);
    setOpen(true);
  };

  const handleXacnhanDaydu = async () => {
    const congcu = phanphat.items.map((item) => ({
      congcu: item.congcu._id,
      soluongphanphat: item.soluongphanphat,
      ngaytiepnhan: getCurrentDatetime(),
    }));
    const dl = {
      phanphatId,
      items: congcu,
      receiveVaitro: userInfo.vaitro,
      receiveId: daily1Info._id,
    };
    // console.log(dl);
    const data = await apiPhanphat.xacnhandaydu(dl);
    // console.log(data);
    if (data.success) {
      Toastify({
        text: "Xác nhận thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/daily1/phanphat");
    }
  };

  const handleBaocaoThieu = () => setOpen2(true);

  const handleXacnhan = async () => {
    const ccthieu = congcuThieu
      .filter(
        (item) =>
          item.selected === true &&
          item.soluongthieu !== "0" &&
          item.soluongthieu !== ""
      )
      .map((item) => ({
        congcu: item.congcu._id,
        soluongphanphat: item.soluongphanphat,
        soluongthieu: item.soluongthieu,
      }));
    if (!ccthieu.length) {
      return setErrMsg("Vui lòng chọn công cụ và nhập số lượng thiếu");
    }
    const dl = {
      phanphatId,
      thieu: ccthieu,
    };
    const data = await apiPhanphat.baocaothieu(dl);
    if (data.success) {
      Toastify({
        text: "Báo cáo thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/daily1/phanphat");
    }
  };

  const handlePhanphat = async () => {
    const dl = {
      items: [],
      from: {},
      to: {},
    };
  };

  useEffect(() => {
    fetchSinglePhanphat();
    fetchDaily1Info();
    fetchDsDaily2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <div id="daily1PhanphatChitiet">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/daily1/phanphat")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách phân phát</span>
          </h5>
        </div>
        <div className="content">
          <div className="section">
            <div className="row">
              <div className="col-lg-6">
                <h6>Bên gửi (Bộ phận kinh doanh)</h6>
                <div className="formGroup">
                  <InputText
                    label="Tên bên cấp"
                    value={phanphat?.from.bophankd.ten}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    value={phanphat?.from.bophankd.sdt}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="E-mail"
                    value={phanphat?.from.bophankd.email}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Địa chỉ"
                    rows={5}
                    multiline
                    value={phanphat?.from.bophankd.diachi}
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <h6>Bên nhận (đại lý 1)</h6>
                <div className="formGroup">
                  <InputText
                    label="Tên đại lý nhận"
                    value={phanphat?.to.daily1.ten}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    value={phanphat?.to.daily1.sdt}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="E-mail"
                    value={phanphat?.to.daily1.email}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Địa chỉ"
                    rows={5}
                    multiline
                    value={phanphat?.to.daily1.diachi}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <h6>Danh sách công cụ</h6>
            <div className="sectionTable">
              <TablePhanphatChitiet
                rows={phanphat}
                handleClickOpen={handleClickOpen}
              />
            </div>
          </div>

          <div style={styleBtns}>
            {phanphat?.trangthai === "daxn" && !phanphat?.thieu.length ? (
              <>
                <ButtonMaterial variant="outlined">
                  <span>Đã xác nhận đầy đủ</span>
                  <CheckIcon />
                </ButtonMaterial>
                <ButtonMaterial
                  variant="contained"
                  style={{ marginLeft: 16 }}
                  onClick={handleOpenModalPhanphat}
                >
                  Phân phát
                </ButtonMaterial>
              </>
            ) : phanphat?.trangthai === "daxn" && phanphat?.thieu.length ? (
              <>
                <ButtonMaterial variant="outlined" onClick={handleBaocaoThieu}>
                  <span>Đã báo cáo thiếu</span>
                  <CheckIcon />
                </ButtonMaterial>
                <ButtonMaterial
                  variant="contained"
                  style={{ marginLeft: 16 }}
                  onClick={handleOpenModalPhanphat}
                >
                  Phân phát
                </ButtonMaterial>
              </>
            ) : (
              <>
                <ButtonMaterial
                  variant="outlined"
                  className="mr-2"
                  onClick={handleBaocaoThieu}
                >
                  Báo cáo thiếu
                </ButtonMaterial>
                <ButtonMaterial
                  variant="contained"
                  className="ml-2"
                  onClick={handleOpenDialog}
                >
                  Xác nhận đầy đủ
                </ButtonMaterial>
              </>
            )}
          </div>
        </div>
      </div>

      <ModalChitietCongcu open={open} onClose={handleClose} congcu={congcu} />

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Báo cáo thiếu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TableBaocaoThieu rows={phanphat} setCongcuThieu={setCongcuThieu} />
            {/* Error msg */}
            {errMsg && (
              <Alert severity="error" style={{ marginTop: 16 }}>
                {errMsg}
              </Alert>
            )}
            <div className="text-right mt-4">
              {phanphat?.thieu.length ? (
                <ButtonMaterial variant="outlined" onClick={handleClose2}>
                  Thoát
                </ButtonMaterial>
              ) : (
                <>
                  <ButtonMaterial variant="outlined" onClick={handleClose2}>
                    Hủy
                  </ButtonMaterial>
                  <ButtonMaterial
                    variant="contained"
                    style={{ marginLeft: 14 }}
                    onClick={handleXacnhan}
                  >
                    Xác nhận
                  </ButtonMaterial>
                </>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* modal phan phat tiep tuc */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalPhanphat}
        onClose={handleCloseModalPhanphat}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        class="modalPhanphat"
      >
        <Fade in={openModalPhanphat}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Phân phát đến đại lý cấp 2
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ marginTop: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Đại lý 2
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDaily2}
                    label="Daily2"
                    onChange={(e) => {
                      setSelectedDaily2(e.target.value);
                      // setErrMsg("");
                    }}
                  >
                    {/* loc ds dl co tk */}
                    {dsDaily2.map((item) => {
                      if (item.user) {
                        return <MenuItem value={item._id}>{item.ten}</MenuItem>;
                      }
                    })}
                  </Select>
                  {errMsg2 && (
                    <Alert severity="error" className="mt-2">
                      {errMsg2}
                    </Alert>
                  )}
                  <Btns>
                    <Button onClick={handleCloseModalPhanphat}>Hủy</Button>
                    <Button variant="outlined" onClick={handlePhanphat}>
                      Phân phát
                    </Button>
                  </Btns>
                </FormControl>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <DialogMaterial
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Xác nhận đầy đủ?"
        text1="Thoát"
        text2="Đồng ý"
        content="Số lượng công cụ nhận được đầy đủ"
        onClick1={handleCloseDialog}
        onClick2={handleXacnhanDaydu}
      />
    </>
  );
};

const Btns = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const styleInput = {
  width: "100%",
  fontSize: 14,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  marginBottom: 10,
};

const styleBtns = {
  height: 200,
  textAlign: "right",
};

export default PhanphatChitiet;
