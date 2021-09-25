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
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";
import { useSelector } from "react-redux";
// modal
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// icon
import CheckIcon from "@mui/icons-material/Check";

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
  const { id: phanphatId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  // api
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);
  const [congcu, setCongcu] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const data = await apiPhanphat.singlePhanphat(phanphatId);
    if (data.success) {
      setPhanphat(data.phanphat);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchDaily1Info = async () => {
    const data = await apiDaily1.singleBophankdBasedUser(userInfo._id);
    setDaily1Info(data.daily1);
  };

  const handleClose = () => setOpen(false);

  const handleClickOpen = async (congcuId) => {
    const data = await apiCongcu.singleCongcu(congcuId);
    setCongcu(data.congcu);
    setOpen(true);
  };

  const handleXacnhanDaydu = async () => {
    const congcu = phanphat.items.map((item) => ({
      congcu: item.congcu._id,
      soluongphanphat: item.soluongphanphat,
    }));
    const dl = {
      phanphatId,
      items: congcu,
      receiveVaitro: userInfo.vaitro,
      receiveId: daily1Info._id,
    };
    console.log(dl);
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

  useEffect(() => {
    fetchSinglePhanphat();
    fetchDaily1Info();
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
              <ButtonMaterial variant="outlined">
                <span>Đã xác nhận đầy đủ</span>
                <CheckIcon />
              </ButtonMaterial>
            ) : phanphat?.trangthai === "daxn" && phanphat?.thieu.length ? (
              <ButtonMaterial variant="outlined">
                <span>Đã báo cáo thiếu</span>
                <CheckIcon />
              </ButtonMaterial>
            ) : (
              <>
                <ButtonMaterial variant="outlined" className="mr-2">
                  Báo cáo thiếu
                </ButtonMaterial>
                <ButtonMaterial
                  variant="contained"
                  className="ml-2"
                  onClick={handleXacnhanDaydu}
                >
                  Xác nhận đầy đủ
                </ButtonMaterial>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {congcu?.ten}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputText label="Tên" value={congcu?.ten} disabled />
                </div>

                <div className="mb-4">
                  <InputText
                    multiline
                    rows={4}
                    label="Mô tả"
                    value={congcu?.mota}
                    disabled
                  />
                </div>

                <img
                  src={
                    congcu?.hinhanh
                      ? `/uploads/${congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!congcu?.hinhanh && "noImage"}
                />
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputText
                    label="Công dụng"
                    value={congcu?.congdung}
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <h6>Thuộc tính</h6>
                  <div className="row">
                    <div className="col-5 pr-0">
                      <input
                        type="text"
                        value="chieu cao"
                        disabled
                        style={styleInput}
                      />
                    </div>
                    <div className="col-7">
                      <input
                        type="text"
                        value="9m"
                        disabled
                        style={styleInput}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-5 pr-0">
                      <input
                        type="text"
                        value="chieu cao"
                        disabled
                        style={styleInput}
                      />
                    </div>
                    <div className="col-7">
                      <input
                        type="text"
                        value="9m"
                        disabled
                        style={styleInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa sản phẩm?"
        text1="Xóa"
        text2="Hủy"
        content=" Bạn chắc xóa vĩnh viễn công cụ này chứ ?"
        onClick1={handleDelete}
        onClick2={handleClose}
      /> */}
    </>
  );
};

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
