import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiPhanphat from "../../axios/apiPhanphat";
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";

const PhanphatChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdPhanphatChitiet">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/congcu")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách phân phát</span>
          </h5>
          <div className="btns">
            {/* <ButtonMaterial
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
            </ButtonMaterial> */}
          </div>
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
        </div>
      </div>

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

export default PhanphatChitiet;
