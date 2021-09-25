import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../../components/Loading";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SanphamChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const { id: sanphamId } = props.match.params;
  // api;
  const [dsloai, setDsloai] = useState([]);
  const [dsnhanhieu, setDsnhanhieu] = useState([]);
  const [sanpham, setSanpham] = useState(null);
  const [loading, setLoading] = useState(false);
  // them nhan hieu
  const [newnhanhieu, setNewnhanhieu] = useState("");
  const [success, setSuccess] = useState(false);
  // dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { loai },
    } = await Axios.get("/api/sanpham/loai");
    setDsloai(loai);
    const {
      data: { nhanhieu },
    } = await Axios.get("/api/sanpham/nhanhieu");
    setDsnhanhieu(nhanhieu);
    const { data } = await Axios.get(`/api/sanpham/single/${sanphamId}`);
    setSanpham(data.sanpham);
    setThuoctinh(
      data.sanpham.thuoctinh.length ? data.sanpham.thuoctinh : thuoctinh
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThuocTinh = () => {
    if (
      thuoctinh.length === 1 &&
      thuoctinh[0].ten === "" &&
      thuoctinh[0].giatri === ""
    ) {
      return [];
    }
    return thuoctinh;
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("sku", sanpham.sku);
    formData.append("ten", sanpham.ten);
    formData.append("mota", sanpham.mota);
    formData.append("giabanle", sanpham.giabanle);
    formData.append("giabanbuon", sanpham.giabanbuon);
    formData.append("hinhanh", sanpham.hinhanh);
    formData.append("nhanhieu", sanpham.nhanhieu);
    formData.append("loai", sanpham.loai || "thucongmynghe");
    formData.append("chophepban", sanpham.chophepban);
    formData.append("apdungthue", sanpham.apdungthue);
    formData.append("cotheban", sanpham.cotheban);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
    const { data } = await Axios.put(
      `/api/sanpham/single/${sanphamId}`,
      formData
    );

    if (data.success) {
      Toastify({
        text: "Thêm sản phẩm thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      props.history.push(`/bophankd/sanpham/chitiet/${sanphamId}`);
    }
  };

  // them nhan hieu moi
  const themNhanHieuMoi = async () => {
    const {
      data: { success },
    } = await Axios.post("/api/sanpham/nhanhieu", { tennhanhieu: newnhanhieu });
    if (success) {
      setNewnhanhieu("");
      setOpen(false);
      Toastify({
        text: "Then nhan hieu thanh cong",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setSuccess(true);
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...thuoctinh];
    list[index][name] = value;
    setThuoctinh(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...thuoctinh];
    list.splice(index, 1);
    setThuoctinh(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setThuoctinh([...thuoctinh, { ten: "", giatri: "" }]);
  };

  // handle inputs change
  const handleChangeTen = (e) => {
    setSanpham({
      ...sanpham,
      ten: e.target.value,
    });
  };
  const handleChangeCotheban = (e) => {
    setSanpham({
      ...sanpham,
      cotheban: e.target.value,
    });
  };
  const handleChangeSku = (e) => {
    setSanpham({
      ...sanpham,
      sku: e.target.value,
    });
  };
  const handleChangeMota = (data) => {
    setSanpham({
      ...sanpham,
      mota: data,
    });
  };
  const handleChangeGianbanle = (e) => {
    setSanpham({
      ...sanpham,
      giabanle: e.target.value,
    });
  };
  const handleChangeGianbanbuon = (e) => {
    setSanpham({
      ...sanpham,
      giabanbuon: e.target.value,
    });
  };
  const handleChangeHinh = (e) => {
    setSanpham({
      ...sanpham,
      hinhanh: e.target.files[0],
    });
  };
  const handleChangeLoai = (e) => {
    setSanpham({
      ...sanpham,
      loai: e.target.value,
    });
  };
  const handleChangeNhanhieu = (e) => {
    setSanpham({
      ...sanpham,
      nhanhieu: e.target.value,
    });
  };
  const handleChangeChophepban = (e) => {
    setSanpham({
      ...sanpham,
      chophepban: !sanpham.chophepban,
    });
  };
  const handleChangeApdungthue = (e) => {
    setSanpham({
      ...sanpham,
      apdungthue: !sanpham.apdungthue,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdThemSP">
        <div className="header">
          <h5
            className="title"
            onClick={() =>
              props.history.push(`/bophankd/sanpham/chitiet/${sanphamId}`)
            }
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang chi tiết sản phẩm</span>
          </h5>
          <div className="btns">
            <button className="btn btn-primary" onClick={submitForm}>
              Cập nhật
            </button>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-lg-8">
              <div className="productInfo">
                <h5>Thong tin chung</h5>
                <div className="productInfoWrapper">
                  <div className="formGroup">
                    <span>Ten san pham</span>
                    <input
                      type="text"
                      placeholder="Nhap ten san pham"
                      value={sanpham?.ten}
                      onChange={handleChangeTen}
                    />
                    {/* <span className="errorMsg">
                      Ten san pham khong duoc de trong
                    </span> */}
                  </div>

                  <div className="formGroup">
                    <span>So luong co the ban</span>
                    <input
                      type="text"
                      placeholder="Nhap ma SKU"
                      style={{ width: "50%" }}
                      value={sanpham?.cotheban}
                      onChange={handleChangeCotheban}
                    />
                  </div>

                  <div className="formGroup">
                    <span>Ma SKU</span>
                    <input
                      type="text"
                      placeholder="Nhap ma SKU"
                      style={{ width: "50%" }}
                      value={sanpham?.sku}
                      onChange={handleChangeSku}
                    />
                  </div>

                  <div className="formGroup">
                    <a
                      class="ckeditorShow"
                      data-toggle="collapse"
                      href="#motaSanpham"
                      role="button"
                      aria-expanded="true"
                      aria-controls="collapseExample"
                    >
                      Mo ta san pham
                    </a>
                    <div class="collapse show" id="motaSanpham">
                      <div className="ckeditor">
                        <CKEditor
                          editor={ClassicEditor}
                          data={sanpham?.mota}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleChangeMota(data);
                          }}
                          onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Gia san pham</h5>
                <div className="productInfoWrapper">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="formGroup">
                        <span>Gian ban le</span>
                        <input
                          type="text"
                          placeholder="Nhap ma SKU"
                          value={sanpham?.giabanle}
                          onChange={handleChangeGianbanle}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="formGroup">
                        <span>Gia ban buon</span>
                        <input
                          type="text"
                          placeholder="Nhap ma SKU"
                          value={sanpham?.giabanbuon}
                          onChange={handleChangeGianbanbuon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Anh san pham</h5>
                <div className="productInfoWrapper">
                  <div className="formGroup">
                    <input
                      type="file"
                      style={{ border: "none" }}
                      onChange={handleChangeHinh}
                    />
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Khoi tao kho hang</h5>
                <div className="productInfoWrapper">
                  <p>content goes here</p>
                </div>
              </div>

              <div className="productInfo">
                <h5>
                  Thuoc tinh
                  <a
                    data-toggle="collapse"
                    href="#themThuocTinh"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <i class="fas fa-plus"></i>
                  </a>
                </h5>

                <div id="themThuocTinh" className="collapse show">
                  <div className="productInfoWrapper">
                    {thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-4">
                            <input
                              type="text"
                              name="ten"
                              value={item.ten}
                              onChange={(e) => handleInputChange(e, key)}
                              placeholder="Ten thuoc tinh"
                            />
                          </div>
                          <div className="col-lg-8">
                            <div className="d-flex align-items-center">
                              <input
                                type="text"
                                name="giatri"
                                value={item.giatri}
                                onChange={(e) => handleInputChange(e, key)}
                                placeholder="Gia tri"
                              />
                              {thuoctinh.length !== 1 && (
                                <button
                                  className="removeElement"
                                  onClick={() => handleRemoveClick(key)}
                                >
                                  <i class="fas fa-times"></i>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="addElementBtn">
                            {thuoctinh.length - 1 === key && (
                              <button onClick={handleAddClick}>
                                <i class="fas fa-plus"></i>
                                <span>Them thuoc tinh khac</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="productInfo">
                <h5>Hinh thuc quan ly</h5>
                <div className="productInfoWrapper">
                  <div className="formGroup">
                    <span>Loai san pham (Mac dinh: Thu cong my nghe)</span>
                    <select value={sanpham?.loai} onChange={handleChangeLoai}>
                      <option></option>
                      {dsloai &&
                        dsloai.map((loai) => (
                          <option value={loai}>
                            {loai === "thucongmynghe"
                              ? "Thủ công mỹ nghệ"
                              : loai === "nongsan"
                              ? "Nông sản"
                              : "Nguyên liệu"}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="formGroup">
                    <span>Nhan hieu</span>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#themNhanHieu"
                      className="themNhanHieu"
                      onClick={handleClickOpen}
                    >
                      <i class="fas fa-plus"></i>
                      <span>Them nhan hiệu</span>
                    </button>
                    <select
                      value={sanpham?.nhanhieu}
                      onChange={handleChangeNhanhieu}
                    >
                      <option></option>
                      {dsnhanhieu &&
                        dsnhanhieu.map((nhanhieu) => (
                          <option value={nhanhieu.tennhanhieu}>
                            {nhanhieu.tennhanhieu}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="formGroup">
                    <span>Tags</span>
                    <textarea rows="3" />
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Cho phep ban</h5>
                <div className="productInfoWrapper">
                  <div className="formGroup">
                    <input
                      type="checkbox"
                      checked={sanpham?.chophepban}
                      onChange={handleChangeChophepban}
                    />
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Ap dung thue</h5>
                <div className="productInfoWrapper">
                  <div className="formGroup">
                    <input
                      type="checkbox"
                      checked={sanpham?.apdungthue}
                      onChange={handleChangeApdungthue}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="btnRight">
            <button className="btn btn-primary" onClick={submitForm}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>

      {/* dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Them nhan hieu</DialogTitle>
        <DialogContent>
          <DialogContentText className="test123"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ten nhan hieu"
            type="email"
            fullWidth
            onChange={(e) => setNewnhanhieu(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huy
          </Button>
          <Button onClick={themNhanHieuMoi} color="primary">
            Them
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SanphamChinhsua;
