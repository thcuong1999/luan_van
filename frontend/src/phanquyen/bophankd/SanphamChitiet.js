import React, { useEffect, useState } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
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
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import apiSanpham from "../../axios/apiSanpham";

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
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const { id: sanphamId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
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
    const data = await apiBophankd.bophankdXoaSanpham({
      bophankdId: bophankdInfo._id,
      sanphamId,
    });
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

  const fetchSanpham = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data2 = await apiSanpham.singleSanpham(sanphamId);
    setSanpham(data2.sanpham);
    setBophankdInfo(data1.bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
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
              Xóa
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                props.history.push(`/bophankd/sanpham/chinhsua/${sanphamId}`)
              }
            >
              Sửa sản phẩm
            </button>
          </div>
        </div>
        {errMsg ? (
          <div className={classes.root}>
            <Alert severity="error">Không tìm thấy sản phẩm!</Alert>
          </div>
        ) : (
          <div className="content">
            <h4>{sanpham?.ten}</h4>
            <div className="productInfo">
              <h5>Thông tin sản phẩm</h5>
              <div className="productInfoDetails">
                <div className="titles">
                  <p>Mã SKU</p>
                  <p>Tên sản phẩm</p>
                  <p>Loại</p>
                  <p>Nhãn hiệu</p>
                </div>
                <div className="values">
                  <p>: {sanpham?.sku}</p>
                  <p>: {sanpham?.ten}</p>
                  <p>: {sanpham?.loai}</p>
                  <p>: {sanpham?.nhanhieu}</p>
                </div>
                <div className="titles">
                  <p>Giá bán lẻ</p>
                  <p>Giá bán buôn</p>
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
                  <h5>Giá sản phẩm</h5>

                  <div className="productInfoDetails">
                    <div className="titles">
                      <p>Giá bán lẻ</p>
                      <p>Giá bán buôn</p>
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
                  <h5>Thông tin thêm</h5>

                  <div className="productInfoDetails">
                    <div className="d-flex justify-content-between w-100 py-3">
                      <div className="px-3">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={sanpham?.chophepban}
                          disabled
                        />
                        <span>Cho phép bán</span>
                      </div>
                      <div className="px-3">
                        <input
                          type="checkbox"
                          checked={sanpham?.apdungthue}
                          disabled
                        />
                        <span className="ml-2">Áp dụng thuế</span>
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
