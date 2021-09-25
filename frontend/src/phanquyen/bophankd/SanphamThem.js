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
import Checkbox from "@material-ui/core/Checkbox";

const SanphamThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [sku, setSku] = useState("");
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [giabanle, setGiabanle] = useState(0);
  const [giabanbuon, setGiabanbuon] = useState(0);
  const [hinhanh, setHinhAnh] = useState(null);
  const [loai, setLoai] = useState("");
  const [nhanhieu, setNhanhieu] = useState("");
  const [tags, setTags] = useState([]);
  const [chophepban, setChophepban] = useState(false);
  const [apdungthue, setApdungthue] = useState(false);
  const [cotheban, setCotheban] = useState(0);
  // additional state
  const [luuvaokho, setLuuvaokho] = useState(false);
  // api
  const [dsloai, setDsloai] = useState([]);
  const [dsnhanhieu, setDsnhanhieu] = useState([]);
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

  const fetchDanhsach = async () => {
    setLoading(true);
    const {
      data: { loai },
    } = await Axios.get("/api/sanpham/loai");
    setDsloai(loai);
    const {
      data: { nhanhieu },
    } = await Axios.get("/api/sanpham/nhanhieu");
    setDsnhanhieu(nhanhieu);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    setLoading(false);
    fetchDanhsach();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
    // console.log({
    //   sku,
    //   ten,
    //   mota,
    //   giabanle,
    //   giabanbuon,
    //   hinhanh,
    //   loai,
    //   nhanhieu,
    //   tags,
    //   chophepban,
    //   apdungthue,
    //   cotheban,
    //   thuoctinh,
    // });
    console.log(luuvaokho);
    const formData = new FormData();
    formData.append("sku", sku);
    formData.append("ten", ten);
    formData.append("mota", mota);
    formData.append("giabanle", giabanle);
    formData.append("giabanbuon", giabanbuon);
    formData.append("hinhanh", hinhanh);
    formData.append("nhanhieu", nhanhieu);
    formData.append("loai", loai || "thucongmynghe");
    formData.append("chophepban", chophepban);
    formData.append("apdungthue", apdungthue);
    formData.append("cotheban", cotheban);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
    formData.append("luuvaokho", luuvaokho);

    const { data } = await Axios.post("/api/sanpham/them", formData);
    if (data.success) {
      Toastify({
        text: "Thêm sản phẩm thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setSku("");
      setTen("");
      setMota("");
      setGiabanle(0);
      setGiabanbuon(0);
      setHinhAnh(null);
      setNhanhieu("");
      setChophepban(false);
      setApdungthue(false);
      setCotheban(0);
      setThuoctinh([{ ten: "", giatri: "" }]);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div id="bophankdThemSP">
        <div className="header">
          <h5
            className="title"
            onClick={() => props.history.push("/bophankd/sanpham")}
          >
            <i class="fas fa-angle-left"></i>
            <span>Quay lại trang danh sách sản phẩm</span>
          </h5>
          <div className="btns">
            <button className="btn btn-primary" onClick={submitForm}>
              Luu
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
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
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
                      value={cotheban}
                      onChange={(e) => setCotheban(e.target.value)}
                    />
                  </div>

                  <div className="formGroup">
                    <span>Ma SKU</span>
                    <input
                      type="text"
                      placeholder="Nhap ma SKU"
                      style={{ width: "50%" }}
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </div>

                  <div className="formGroup">
                    <a
                      class="ckeditorShow"
                      data-toggle="collapse"
                      href="#motaSanpham"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Mo ta san pham
                    </a>
                    <div class="collapse show" id="motaSanpham">
                      <div className="ckeditor">
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setMota(data);
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
                          value={giabanle}
                          onChange={(e) => setGiabanle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="formGroup">
                        <span>Gia ban buon</span>
                        <input
                          type="text"
                          placeholder="Nhap ma SKU"
                          value={giabanbuon}
                          onChange={(e) => setGiabanbuon(e.target.value)}
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
                      onChange={(e) => setHinhAnh(e.target.files[0])}
                    />
                  </div>
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
                    <select
                      value={loai}
                      onChange={(e) => setLoai(e.target.value)}
                    >
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
                      value={nhanhieu}
                      onChange={(e) => setNhanhieu(e.target.value)}
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
                    <textarea
                      rows="3"
                      onChange={(e) => setTags([...tags, e.target.value])}
                    />
                  </div>
                </div>
              </div>

              <div className="productInfo">
                <h5>Cho phep ban</h5>
                <div className="productInfoWrapper">
                  <Checkbox
                    onChange={() => setChophepban(!chophepban)}
                    checked={chophepban}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
              </div>

              <div className="productInfo">
                <h5>Ap dung thue</h5>
                <div className="productInfoWrapper">
                  <Checkbox
                    onChange={() => setApdungthue(!apdungthue)}
                    checked={apdungthue}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
              </div>

              <div className="productInfo">
                <h5>Them vao kho hang</h5>
                <div className="productInfoWrapper">
                  <Checkbox
                    onChange={(e) => setLuuvaokho(!luuvaokho)}
                    checked={luuvaokho}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="btnRight">
            <button className="btn btn-primary ml-3" onClick={submitForm}>
              Luu
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
        <DialogTitle id="form-dialog-title">Thêm nhãn hiệu</DialogTitle>
        <DialogContent>
          <DialogContentText className="test123"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tennhanhieu"
            label="Tên nhãn hiệu"
            type="email"
            fullWidth
            onChange={(e) => setNewnhanhieu(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={themNhanHieuMoi} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SanphamThem;
