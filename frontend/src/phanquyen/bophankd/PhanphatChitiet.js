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
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";
import TableBaocaoThieu from "./tables/TableBaocaoThieu";
import { useSelector } from "react-redux";
// icons
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
// modal
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import apiBophankd from "../../axios/apiBophankd";

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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { id: phanphatId } = props.match.params;

  // api
  const [loading, setLoading] = useState(false);
  const [phanphat, setPhanphat] = useState(null);

  const fetchSinglePhanphat = async () => {
    setLoading(true);
    const data = await apiPhanphat.singlePhanphat(phanphatId);
    if (data.success) {
      setPhanphat(data.phanphat);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaoPhanphatMoi = async () => {
    const ccthieu = phanphat?.thieu.map((item) => ({
      congcu: item?.congcu._id,
      soluongphanphat: item.soluongthieu,
    }));
    const dl = {
      oldPhanphatId: phanphatId,
      items: ccthieu,
      from: {
        bophankd: phanphat?.from.bophankd._id,
      },
      to: {
        daily1: phanphat?.to.daily1._id,
      },
      redo: true,
    };
    // console.log(dl);
    const data = await apiPhanphat.themPhanphat(dl);
    // console.log(data);
    if (data.success) {
      handleClose();
      Toastify({
        text: "Phân phát công cụ thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/bophankd/phanphat`);
    }
  };

  // const handleDelete = async () => {
  //   const { data } = await Axios.delete(`/api/congcu/single/${congcuId}`);
  //   if (data.success) {
  //     setOpen(false);
  //     Toastify({
  //       text: "Xoa cong cu thanh cong",
  //       backgroundColor: "#0DB473",
  //       className: "toastifyInfo",
  //       position: "center",
  //     }).showToast();
  //     props.history.push("/bophankd/congcu");
  //   }
  // };

  useEffect(() => {
    fetchSinglePhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <div id="bophankdPhanphatChitiet">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/phanphat")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách phân phát</span>
          </h5>
          {/* <div className="btns">
            <ButtonMaterial
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Xóa
            </ButtonMaterial>
            <ButtonMaterial
              variant="contained"
              onClick={() =>
                props.history.push(`/bophankd/congcu/chinhsua/${congcuId}`)
              }
            >
              Chỉnh sửa công cụ
            </ButtonMaterial>
          </div> */}
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
              <TablePhanphatChitiet rows={phanphat} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
              <div className="section">
                <h6>Tiến trình cấp phát</h6>
                <div className="row">
                  <div className="col-lg-5">
                    <p>Trạng thái</p>
                    <p>Báo cáo bên đại lý 1</p>
                    <p>Hoàn thành phân phát</p>
                  </div>
                  <div className="col-lg-7">
                    <p>
                      {phanphat?.trangthai === "choxn"
                        ? ": Chờ xác nhận"
                        : ": Đã xác nhận"}
                    </p>
                    <p>
                      {phanphat?.trangthai === "choxn" ? (
                        ": Đang chờ"
                      ) : phanphat?.trangthai === "daxn" &&
                        phanphat?.thieu.length ? (
                        <span style={thieuCongcu} onClick={handleOpen}>
                          : Thiếu công cụ
                        </span>
                      ) : (
                        ": Đã nhận đầy đủ"
                      )}
                    </p>
                    <p>{phanphat?.hoanthanh ? <CheckIcon /> : <ClearIcon />}</p>
                  </div>
                </div>
              </div>
            </div>
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
            Báo cáo thiếu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TableBaocaoThieu rows={phanphat} />
            <div className="text-right mt-4">
              {phanphat?.thieu.length ? (
                phanphat?.hoanthanh ? (
                  <ButtonMaterial variant="outlined" onClick={handleClose}>
                    Thoát
                  </ButtonMaterial>
                ) : (
                  <>
                    <ButtonMaterial variant="outlined" onClick={handleClose}>
                      Hủy
                    </ButtonMaterial>
                    <ButtonMaterial
                      variant="contained"
                      style={{ marginLeft: 16 }}
                      onClick={handleOpenDialog}
                    >
                      Tạo phân phát mới
                    </ButtonMaterial>
                  </>
                )
              ) : (
                <>
                  <ButtonMaterial variant="outlined" onClick={handleClose}>
                    Hủy
                  </ButtonMaterial>
                  <ButtonMaterial
                    variant="contained"
                    style={{ marginLeft: 14 }}
                    // onClick={handleXacnhan}
                  >
                    Xác nhận
                  </ButtonMaterial>
                </>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>

      <DialogMaterial
        open={dialogOpen}
        onClose={handleCloseDialog}
        title="Tạo phân phát mới?"
        text1="Hủy"
        text2="Tạo"
        content="Phân phát lại các công cụ còn thiếu."
        onClick1={handleCloseDialog}
        onClick2={handleTaoPhanphatMoi}
      />
    </>
  );
};

const thieuCongcu = {
  color: "blue",
  cursor: "pointer",
};

export default PhanphatChitiet;
