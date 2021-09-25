import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Axios from "axios";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";

const CongcuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: congcuId } = props.match.params;

  // api
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});
  const fetchCongcu = async () => {
    setLoading(true);
    const { data } = await Axios.get(`/api/congcu/single/${congcuId}`);
    if (data.success) {
      setCongcu(data.congcu);
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await Axios.delete(`/api/congcu/single/${congcuId}`);
    if (data.success) {
      setOpen(false);
      Toastify({
        text: "Xoa cong cu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/bophankd/congcu");
    }
  };

  useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdChitetcongcu">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/congcu")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách cong cu</span>
          </h5>
          <div className="btns">
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
          </div>
        </div>
        <div className="content">
          <h4>{congcu.ten} </h4>
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText label="Tên công cụ" value={congcu.ten} disabled />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Mô tả công cụ"
                    multiline
                    rows={5}
                    value={congcu.mota}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <span>Hinh anh</span>
                  <img
                    src={
                      congcu.hinhanh
                        ? `/uploads/${congcu.hinhanh}`
                        : img_placeholder
                    }
                    alt="anhcongcu"
                    className={!congcu.hinhanh && "noImage"}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="Công dụng"
                    value={congcu.congdung}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText label="Số lượng" value={congcu.soluong} disabled />
                </div>

                <div className="themThuocTinh">
                  <div className="formGroup">
                    <span>Thuoc tinh</span>
                    {congcu.thuoctinh && !congcu.thuoctinh.length && (
                      <div>---</div>
                    )}
                    {congcu.thuoctinh &&
                      congcu.thuoctinh.map((item) => (
                        <div className="row mt-3">
                          <div className="col-4">
                            <input
                              type="text"
                              placeholder="Nhap so luong"
                              value={item.ten}
                              disabled
                            />
                          </div>
                          <div className="col-8">
                            <input
                              type="text"
                              placeholder="Nhap so luong"
                              value={item.giatri}
                              disabled
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa sản phẩm?"
        text1="Xóa"
        text2="Hủy"
        content=" Bạn chắc xóa vĩnh viễn công cụ này chứ ?"
        onClick1={handleDelete}
        onClick2={handleClose}
      />
    </>
  );
};

export default CongcuChitiet;
