import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
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
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import { Checkbox } from "@mui/material";

const SanphamChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const { id: sanphamId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [loai, setLoai] = useState("Chọn loại sản phẩm");
  const [nhanhieu, setNhanhieu] = useState("Chọn nhãn hiệu");
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
    setDsloai(
      loai.map((item) =>
        item === "nongsan"
          ? "Nông sản"
          : item === "nguyenlieu"
          ? "Nguyên liệu"
          : "Thủ công mỹ nghệ"
      )
    );
    const {
      data: { nhanhieu },
    } = await Axios.get("/api/sanpham/nhanhieu");
    setDsnhanhieu(nhanhieu.map((item) => item.tennhanhieu));
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    setSanpham(sanpham);
    setLoai(
      sanpham.loai === "nongsan"
        ? "Nông sản"
        : sanpham.loai === "nguyenlieu"
        ? "Nguyên liệu"
        : "Thủ công mỹ nghệ"
    );
    setNhanhieu(sanpham.nhanhieu);
    setBophankdInfo(data1.bophankd);
    setThuoctinh(sanpham.thuoctinh.length ? sanpham.thuoctinh : thuoctinh);
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
    formData.append("nhanhieu", nhanhieu);
    formData.append(
      "loai",
      loai === "Nông sản"
        ? "nongsan"
        : loai === "Nguyên liệu"
        ? "nguyenlieu"
        : "thucongmynghe"
    );
    formData.append("chophepban", sanpham.chophepban);
    formData.append("apdungthue", sanpham.apdungthue);
    formData.append("cotheban", sanpham.cotheban);
    formData.append("bophankdId", bophankdInfo._id);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

    const { data } = await Axios.put(
      `/api/sanpham/single/${sanphamId}`,
      formData
    );

    if (data.success) {
      Toastify({
        text: "Chỉnh sửa sản phẩm thành công",
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

  const handleSanphamChange = (e) => {
    setSanpham({
      ...sanpham,
      [e.target.name]: e.target.value,
    });
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
              Cập nhật
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
                      name="ten"
                      value={sanpham?.ten}
                      onChange={handleSanphamChange}
                    />
                    {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
                  </FormGroup>

                  <FormGroup>
                    <Label>Số lượng có thể bán:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập số lượng"
                      style={{ width: "50%" }}
                      name="cotheban"
                      value={sanpham?.cotheban}
                      onChange={handleSanphamChange}
                    />
                    {/* {!cotheban && <ErrMsg>{errMsg}</ErrMsg>} */}
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea
                      name="mota"
                      value={sanpham?.mota}
                      onChange={handleSanphamChange}
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
                          name="giabanle"
                          value={sanpham?.giabanle}
                          onChange={handleSanphamChange}
                        />
                        {/* {!giabanle && <ErrMsg>{errMsg}</ErrMsg>} */}
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Giá bản buôn:</Label>
                        <Input
                          type="text"
                          placeholder="Nhập giá"
                          name="giabanbuon"
                          value={sanpham?.giabanbuon}
                          onChange={handleSanphamChange}
                        />
                        {/* {!giabanbuon && <ErrMsg>{errMsg}</ErrMsg>} */}
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
                      onChange={(e) =>
                        setSanpham({
                          ...sanpham,
                          hinhanh: e.target.files[0],
                        })
                      }
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thuộc tính</h5>
                </BoxTitle>
                <BoxContent>
                  <div id="themThuocTinh" className="collapse show">
                    <div className="productInfoWrapper">
                      {thuoctinh.map((item, key) => {
                        return (
                          <div className="row">
                            <div className="col-lg-4">
                              <FormGroup>
                                <Input
                                  type="text"
                                  name="ten"
                                  value={item.ten}
                                  onChange={(e) => handleInputChange(e, key)}
                                  placeholder="Ten thuoc tinh"
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
                                  placeholder="Gia tri"
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
                    </div>
                  </div>
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
                    {/* {loai === "Chọn loại sản phẩm" && <ErrMsg>{errMsg}</ErrMsg>} */}
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
                      Them nhan hieu
                    </SmallLabel>
                    {/* {nhanhieu === "Chọn nhãn hiệu" && <ErrMsg>{errMsg}</ErrMsg>} */}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Cho phép bán</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    checked={sanpham?.chophepban}
                    onChange={(e) =>
                      setSanpham({
                        ...sanpham,
                        chophepban: !sanpham.chophepban,
                      })
                    }
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
                    checked={sanpham?.apdungthue}
                    onChange={(e) =>
                      setSanpham({
                        ...sanpham,
                        apdungthue: !sanpham.apdungthue,
                      })
                    }
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </BoxContent>
              </Box>

              {/* <Box>
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
              </Box> */}
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
`;

const ErrMsg = styled.span`
  display: block;
  font-size: 15px;
  color: red;
`;

export default SanphamChinhsua;
