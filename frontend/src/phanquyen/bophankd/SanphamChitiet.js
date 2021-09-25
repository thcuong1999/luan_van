import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import img_placeholder from "../../assets/images/img_placeholder.png";
import Alert from "@material-ui/lab/Alert";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "95%",
    marginTop: "20px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SanphamChitiet = (props) => {
  const [sanpham, setSanpham] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const { id: sanphamId } = props.match.params;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    props.history.push("/bophankd/sanpham");
  };

  const handleDelete = async () => {
    const { data } = await Axios.delete(`/api/sanpham/single/${sanphamId}`);
    setOpen(false);
    if (data.success) {
      Toastify({
        text: "Xoa san pham thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
    }
    setTimeout(() => props.history.push("/bophankd/sanpham"), 1000);
  };

  const fetchSanpham = async (id) => {
    setLoading(true);
    const { data } = await Axios.get(`/api/sanpham/single/${id}`);
    if (data.success) {
      setSanpham(data.sanpham);
      setLoading(false);
    } else {
      setErrMsg("Khong tim thay san pham");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSanpham(sanphamId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdChiettietSP">
        <div className="header">
          <h5 className="title" onClick={handleRedirect}>
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách sản phẩm</span>
          </h5>
          <div className="btns">
            <button
              className="btn btn-outline-danger"
              onClick={handleClickOpen}
            >
              Xoa
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                props.history.push(`/bophankd/sanpham/chinhsua/${sanphamId}`)
              }
            >
              Sua san pham
            </button>
          </div>
        </div>
        {errMsg ? (
          <div className={classes.root}>
            <Alert severity="error">Khong tim thay san pham!</Alert>
          </div>
        ) : (
          <div className="content">
            <h4>{sanpham?.ten}</h4>
            <div className="productInfo">
              <h5>Thong tin san pham</h5>
              <div className="productInfoDetails">
                <div className="titles">
                  <p>Ma SKU</p>
                  <p>Ten san pham</p>
                  <p>Loai</p>
                  <p>Nhan hieu</p>
                </div>
                <div className="values">
                  <p>: {sanpham?.sku}</p>
                  <p>: {sanpham?.ten}</p>
                  <p>: {sanpham?.loai}</p>
                  <p>: {sanpham?.nhanhieu}</p>
                </div>
                <div className="titles">
                  <p>Gia ban le</p>
                  <p>Gia ban buon</p>
                </div>
                <div className="values">
                  <p>: {sanpham?.giabanle}</p>
                  <p>: {sanpham?.giabanbuon}</p>
                </div>
                <div className="productImg">
                  <img
                    src={
                      sanpham?.hinhanh
                        ? `/uploads/${sanpham?.hinhanh}`
                        : img_placeholder
                    }
                    alt="test"
                    className={!sanpham?.hinhanh && "noImg"}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="productInfo mt-4">
                  <h5>Gia san pham</h5>

                  <div className="productInfoDetails">
                    <div className="titles">
                      <p>Gia ban le</p>
                      <p>Gia ban buon</p>
                    </div>
                    <div className="values">
                      <p>: {sanpham?.giabanle}</p>
                      <p>: {sanpham?.giabanbuon}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="productInfo mt-4">
                  <h5>Thong tin them</h5>

                  <div className="productInfoDetails">
                    <div className="d-flex justify-content-between w-100 py-3">
                      <div className="px-3">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={sanpham?.chophepban}
                          disabled
                        />
                        <span>Cho phep ban</span>
                      </div>
                      <div className="px-3">
                        <input
                          type="checkbox"
                          checked={sanpham?.apdungthue}
                          disabled
                        />
                        <span className="ml-2">Ap dung thue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default SanphamChitiet;
