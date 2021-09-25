import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";
import apiDaily2 from "../../axios/apiDaily2";

const Daily2Chitiet = (props) => {
  const [daily2, setDaily2] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { id: daily2Id } = props.match.params;

  const fetchDaily2 = async () => {
    setLoading(true);
    const data = await apiDaily2.singleDaily2(daily2Id);
    console.log(data);
    if (data.success) {
      setDaily2(data.daily2);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const data = await apiDaily2.xoa1Daily2(daily2Id);
    setOpen(false);
    if (data.success) {
      Toastify({
        text: "Xoa san pham thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    setTimeout(() => props.history.push("/daily1/daily2"), 1000);
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <div id="daily2Chitiet">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/daily1/daily2")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách dai ly 2</span>
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
                props.history.push(`/daily1/daily2/chinhsua/${daily2Id}`)
              }
            >
              Chỉnh sửa
            </ButtonMaterial>
          </div>
        </div>
        <div className="content bophankdChitietdaily2">
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText label="Tên đại lý" value={daily2.ten} disabled />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Tài khoản"
                    value={daily2.user?.taikhoan}
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText label="E-mail" value={daily2.email} disabled />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    value={daily2.sdt}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText label="Địa chỉ" value={daily2.diachi} disabled />
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
        content="Bạn chắc xóa vĩnh viễn sản phẩm này chứ ?"
        onClick1={handleDelete}
        onClick2={handleClose}
        text1="Xóa"
        text2="Hủy"
      />
    </>
  );
};

export default Daily2Chitiet;
