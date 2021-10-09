import React, { useState, useEffect } from "react";
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
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import DropdownCustom from "../../components/DropdownCustom";

const SanphamThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [sku, setSku] = useState("");
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [giabanle, setGiabanle] = useState("");
  const [giabanbuon, setGiabanbuon] = useState("");
  const [hinhanh, setHinhAnh] = useState(null);
  const [loai, setLoai] = useState("Chọn loại sản phẩm");
  const [nhanhieu, setNhanhieu] = useState("Chọn nhãn hiệu");
  const [chophepban, setChophepban] = useState(false);
  const [apdungthue, setApdungthue] = useState(false);
  const [cotheban, setCotheban] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const [bophankdInfo, setBophankdInfo] = useState(null);
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
  // err
  const [errMsg, setErrMsg] = React.useState(false);

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
    setDsloai(
      loai.map((item) =>
        item === "thucongmynghe"
          ? "Thủ công mỹ nghệ"
          : item === "nongsan"
          ? "Nông sản"
          : "Nguyên liệu"
      )
    );
    const {
      data: { nhanhieu },
    } = await Axios.get("/api/sanpham/nhanhieu");
    console.log({ nhanhieu });
    setDsnhanhieu(nhanhieu.map((item) => item.tennhanhieu));
    setLoading(false);
  };

  const fetchBophankdInfo = async () => {
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(data.bophankd);
  };

  useEffect(() => {
    setSuccess(false);
    setLoading(false);
    fetchDanhsach();
    fetchBophankdInfo();
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

  const emptyFields = () => {
    if (
      !ten ||
      !cotheban ||
      !giabanle ||
      !giabanbuon ||
      loai === "Chọn loại sản phẩm" ||
      nhanhieu === "Chọn nhãn hiệu"
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyFields()) {
      const formData = new FormData();
      formData.append("sku", sku);
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("giabanle", giabanle);
      formData.append("giabanbuon", giabanbuon);
      formData.append("hinhanh", hinhanh);
      formData.append("nhanhieu", nhanhieu);
      formData.append(
        "loai",
        loai === "Thủ công mỹ nghệ"
          ? "thucongmynghe"
          : loai === "Nông sản"
          ? "nongsan"
          : "nguyenlieu"
      );
      formData.append("chophepban", chophepban);
      formData.append("apdungthue", apdungthue);
      formData.append("cotheban", cotheban);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
      formData.append("luuvaokho", luuvaokho);
      formData.append("bophankdId", bophankdInfo._id);

      const data = await apiSanpham.themSanpham(formData);
      console.log({ return: data });
      if (data.success) {
        Toastify({
          text: "Thêm sản phẩm thành công",
          backgroundColor: "#0DB473",
          className: "toastifyInfo",
          position: "center",
        }).showToast();
        resetFields();
      }
    }
  };

  // reset fields
  const resetFields = () => {
    setSku("");
    setTen("");
    setMota("");
    setGiabanle("");
    setGiabanbuon("");
    setHinhAnh(null);
    setNhanhieu("Chọn nhãn hiệu");
    setLoai("Chọn loại sản phẩm");
    setChophepban(false);
    setApdungthue(false);
    setCotheban("");
    setThuoctinh([{ ten: "", giatri: "" }]);
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
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/bophankd/sanpham")}
          headerRight={
            <Button variant="contained" onClick={submitForm}>
              Thêm
            </Button>
          }
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <h5>Thông tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                    />
                    {!ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Số lượng có thể bán:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập số lượng"
                      style={{ width: "50%" }}
                      value={cotheban}
                      onChange={(e) => setCotheban(e.target.value)}
                    />
                    {!cotheban && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea
                      value={mota}
                      onChange={(e) => setMota(e.target.value)}
                      rows="5"
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Giá sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Giá bản lẻ:</Label>
                        <Input
                          type="text"
                          placeholder="Nhập giá"
                          value={giabanle}
                          onChange={(e) => setGiabanle(e.target.value)}
                        />
                        {!giabanle && <ErrMsg>{errMsg}</ErrMsg>}
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Giá bản buôn:</Label>
                        <Input
                          type="text"
                          placeholder="Nhập giá"
                          value={giabanbuon}
                          onChange={(e) => setGiabanbuon(e.target.value)}
                        />
                        {!giabanbuon && <ErrMsg>{errMsg}</ErrMsg>}
                      </FormGroup>
                    </div>
                  </div>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Ảnh sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Chọn ảnh:</Label>
                    <input
                      type="file"
                      style={{ border: "none" }}
                      onChange={(e) => setHinhAnh(e.target.files[0])}
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thuộc tính</h5>
                </BoxTitle>
                <BoxContent>
                  {thuoctinh.map((item, key) => {
                    return (
                      <div className="row">
                        <div className="col-lg-4">
                          <FormGroup style={{ marginBottom: 10 }}>
                            <Input
                              type="text"
                              name="ten"
                              value={item.ten}
                              onChange={(e) => handleInputChange(e, key)}
                              placeholder="Tên thuộc tính"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-lg-8">
                          <div className="d-flex align-items-center">
                            <Input
                              type="text"
                              name="giatri"
                              value={item.giatri}
                              onChange={(e) => handleInputChange(e, key)}
                              placeholder="Giá trị"
                            />
                            {thuoctinh.length !== 1 && (
                              <CrossButton
                                onClick={() => handleRemoveClick(key)}
                              >
                                <i class="fas fa-times"></i>
                              </CrossButton>
                            )}
                          </div>
                        </div>

                        <div className="addElementBtn">
                          {thuoctinh.length - 1 === key && (
                            <PlusButton onClick={handleAddClick}>
                              <i class="fas fa-plus"></i>
                              <span>Thêm thuộc tính khác</span>
                            </PlusButton>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </BoxContent>
              </Box>
            </div>

            <div className="col-lg-4">
              <Box>
                <BoxTitle>
                  <h5>Hình thức quản lý</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Loại sản phẩm:</Label>
                    <DropdownCustom
                      data={dsloai}
                      dropdownStyles={{ width: "100%" }}
                      selected={loai}
                      onClick={(val) => setLoai(val)}
                    />
                    {loai === "Chọn loại sản phẩm" && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Nhãn hiệu:</Label>
                    <DropdownCustom
                      data={dsnhanhieu}
                      dropdownStyles={{ width: "100%" }}
                      selected={nhanhieu}
                      onClick={(val) => setNhanhieu(val)}
                    />
                    <SmallLabel onClick={handleClickOpen}>
                      Thêm nhãn hiệu
                    </SmallLabel>
                    {nhanhieu === "Chọn nhãn hiệu" && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Cho phép bán</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    onChange={() => setChophepban(!chophepban)}
                    checked={chophepban}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Áp dụng thuế</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    onChange={() => setApdungthue(!apdungthue)}
                    checked={apdungthue}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thêm vào kho hàng</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    onChange={(e) => setLuuvaokho(!luuvaokho)}
                    checked={luuvaokho}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </BoxContent>
              </Box>
            </div>
          </div>
        </Content>
      </Container>

      {/* dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm nhãn hiệu</DialogTitle>
        <DialogContent style={{ minWidth: 600 }}>
          <DialogContentText></DialogContentText>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 20px 36px;
`;

const Box = styled.div`
  background: #fff;
  margin-bottom: 20px;
`;

const BoxTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  h5 {
    font-size: 16px;
    display: inline-block;
    padding: 20px;
    margin-bottom: 0;
  }
`;

const BoxContent = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 26px;
`;

const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;

const SmallLabel = styled.span`
  font-size: 15px;
  color: blue;
  display: block;
  margin-top: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;

const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;

const PlusButton = styled.button`
  margin-left: 20px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 25px;
    height: 25px;
    line-height: 20px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
  }
  &:active {
    outline: none;
  }
`;

const ErrMsg = styled.span`
  display: block;
  font-size: 15px;
  color: red;
`;

export default SanphamThem;
