import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import DeleteIcon from "@mui/icons-material/Delete";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import apiCongcu from "../../axios/apiCongcu";

const CongcuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: congcuId } = props.match.params;

  // api
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});
  const fetchCongcu = async () => {
    setLoading(true);
    const data = await apiCongcu.singleCongcu(congcuId);
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
    const data = await apiCongcu.xoa1Congcu(congcuId);
    if (data.success) {
      setOpen(false);
      Toastify({
        text: "Xoa cong cu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push("/daily1/congcu");
    }
  };

  useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <div id="daily1Congcuchitiet">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/daily1/congcu")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách công cụ</span>
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
                props.history.push(`/daily1/congcu/chinhsua/${congcuId}`)
              }
            >
              Chỉnh sửa công cụ
            </ButtonMaterial>
          </div>
        </div>
        <div className="content">
          <h4>{congcu.ten}</h4>
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText label="Tên công cụ" value={congcu.ten} disabled />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Mô tả"
                    multiline
                    rows={5}
                    value={congcu.mota}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <span>Hình ảnh</span>
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

                <div className="productInfo">
                  <div className="formGroup">
                    <span>Thuộc tính</span>
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
                              className="p-2"
                              disabled
                            />
                          </div>
                          <div className="col-8">
                            <input
                              type="text"
                              placeholder="Nhap so luong"
                              value={item.giatri}
                              className="p-2"
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
        title="Xóa công cụ?"
        content="Bạn chắc xóa vĩnh viễn công cụ này chứ ?"
        onClick1={handleDelete}
        onClick2={handleClose}
        text1="Xóa"
        text2="Hủy"
      />
    </>
  );
};

export default CongcuChitiet;
