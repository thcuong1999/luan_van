import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Loading from "../../components/Loading";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonMaterial from "../../components/ButtonMaterial";
import InputText from "../../components/InputText";
import DialogMaterial from "../../components/DialogMaterial";

const Daily1Chitiet = (props) => {
  const [daily1, setDaily1] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { id: daily1Id } = props.match.params;

  const fetchDaily1 = async () => {
    setLoading(true);
    const { data } = await Axios.get(`/api/daily1/single/${daily1Id}`);
    if (data.success) {
      setDaily1(data.daily1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await Axios.delete(`/api/daily1/single/${daily1Id}`);
    setOpen(false);
    if (data.success) {
      Toastify({
        text: "Xoa san pham thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    setTimeout(() => props.history.push("/bophankd/daily1"), 1000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdThemdaily1">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/daily1")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách dai ly 1</span>
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
                props.history.push(`/bophankd/daily1/chinhsua/${daily1Id}`)
              }
            >
              Chỉnh sửa
            </ButtonMaterial>
          </div>
        </div>
        <div className="content bophankdChitietdaily1">
          <div className="form">
            <div className="row">
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText label="Tên đại lý" value={daily1.ten} disabled />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Tài khoản"
                    value={daily1.user?.taikhoan}
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="formGroup">
                  <InputText
                    label="E-mail"
                    name="email"
                    value={daily1.email}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Số điện thoại"
                    value={daily1.sdt}
                    disabled
                  />
                </div>

                <div className="formGroup">
                  <InputText
                    label="Địa chỉ"
                    value={daily1.diachi}
                    multiline
                    rows={5}
                    disabled
                  />
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa sản phẩm?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc xóa vĩnh viễn sản phẩm này chứ ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Xóa
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Daily1Chitiet;
