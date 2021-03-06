import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import SnackbarMaterial from "../../components/SnackbarMaterial";
import apiSanphamLangnghe from "../../axios/apiSanphamLangnghe";
import apiNhanhieu from "../../axios/apiNhanhieu";

const SanphamChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [giabanle, setGiabanle] = useState("");
  const [giabanbuon, setGiabanbuon] = useState("");
  const [hinhanh, setHinhAnh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [loai, setLoai] = useState("");
  const [nhanhieu, setNhanhieu] = useState("");
  const [dsloai, setDsloai] = useState([]);
  const [dsnhanhieu, setDsnhanhieu] = useState([]);
  const [chophepban, setChophepban] = useState(false);
  const [apdungthue, setApdungthue] = useState(false);
  const [cotheban, setCotheban] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(false);
  const { id: sanphamId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const data1 = await apiSanphamLangnghe.dsSanpham();
    const data2 = await apiNhanhieu.dsNhanhieu();
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    // set data
    setDsloai(data1.sanpham);
    setDsnhanhieu(data2.nhanhieu);
    setThuoctinh(sanpham.thuoctinh.length ? sanpham.thuoctinh : thuoctinh);
    setMa(sanpham.ma);
    setTen(sanpham.ten);
    setMota(sanpham.mota);
    setGiabanle(sanpham.giabanle);
    setGiabanbuon(sanpham.giabanbuon);
    setHinhAnh(sanpham.hinhanh);
    setLoai(sanpham.loai);
    setNhanhieu(sanpham.nhanhieu);
    setChophepban(sanpham.chophepban);
    setApdungthue(sanpham.apdungthue);
    setCotheban(sanpham.cotheban);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    setLoading(false);
    fetchData();
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
      !ma ||
      !ten ||
      !cotheban ||
      !giabanle ||
      !giabanbuon ||
      loai === "Ch???n lo???i s???n ph???m" ||
      nhanhieu === "Ch???n nh??n hi???u"
    ) {
      setErrMsg("Th??ng tin kh??ng ???????c ????? tr???ng");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyFields()) {
      // console.log({ loai });
      const formData = new FormData();
      formData.append("ma", ma);
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("giabanle", giabanle);
      formData.append("giabanbuon", giabanbuon);
      formData.append("hinhanh", hinhanh);
      formData.append("nhanhieu", nhanhieu);
      formData.append("loai", loai);
      formData.append("chophepban", chophepban);
      formData.append("apdungthue", apdungthue);
      formData.append("cotheban", cotheban);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

      const data = await apiSanpham.suaSanpham(sanphamId, formData);
      if (data.success) {
        setAlert(true);
        setErrMsg("");
      }
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
          title="Quay l???i trang danh s??ch s???n ph???m"
          titleBack
          onClick={() => props.history.push("/admin/sanpham")}
          headerRight={<CustomBtn onClick={submitForm}>C???p nh???t</CustomBtn>}
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <h5>Th??ng tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>M?? s???n ph???m:</Label>
                    <Input
                      type="text"
                      placeholder="Nh???p t??n s???n ph???m"
                      value={ma}
                      onChange={(e) => setMa(e.target.value)}
                    />
                    {!ma && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>T??n s???n ph???m:</Label>
                    <Input
                      type="text"
                      placeholder="Nh???p t??n s???n ph???m"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                    />
                    {!ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>S??? l?????ng c?? th??? b??n:</Label>
                    <Input
                      type="text"
                      placeholder="Nh???p s??? l?????ng"
                      style={{ width: "50%" }}
                      value={cotheban}
                      onChange={(e) => setCotheban(e.target.value)}
                    />
                    {!cotheban && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>M?? t??? s???n ph???m:</Label>
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
                  <h5>Gi?? s???n ph???m</h5>
                </BoxTitle>
                <BoxContent>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Gi?? b???n l???:</Label>
                        <Input
                          type="text"
                          placeholder="Nh???p gi??"
                          value={giabanle}
                          onChange={(e) => setGiabanle(e.target.value)}
                        />
                        {!giabanle && <ErrMsg>{errMsg}</ErrMsg>}
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Gi?? b???n bu??n:</Label>
                        <Input
                          type="text"
                          placeholder="Nh???p gi??"
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
                  <h5>???nh s???n ph???m</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Ch???n ???nh:</Label>
                    <input
                      type="file"
                      style={{ border: "none" }}
                      onChange={(e) => {
                        setHinhAnh(e.target.files[0]);
                        setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {imgToDisplay && (
                      <Image src={imgToDisplay} alt="chosenImage" />
                    )}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thu???c t??nh</h5>
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
                              placeholder="T??n thu???c t??nh"
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
                              placeholder="Gi?? tr???"
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
                              <span>Th??m thu???c t??nh kh??c</span>
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
                  <h5>H??nh th???c qu???n l??</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Lo???i s???n ph???m:</Label>
                    <DropdownCustom
                      data={dsloai.map((item) => item.ten)}
                      dropdownStyles={{ width: "100%" }}
                      selected={loai}
                      onClick={(val) => setLoai(val)}
                    />
                    {loai === "Ch???n lo???i s???n ph???m" && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Nh??n hi???u:</Label>
                    <DropdownCustom
                      data={dsnhanhieu.map((item) => item.ten)}
                      dropdownStyles={{ width: "100%" }}
                      selected={nhanhieu}
                      onClick={(val) => setNhanhieu(val)}
                    />
                    {nhanhieu === "Ch???n nh??n hi???u" && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Cho ph??p b??n</h5>
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
                  <h5>??p d???ng thu???</h5>
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

              {/* 
              <Box>
                <BoxTitle>
                  <h5>Th??m v??o kho h??ng</h5>
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

      <SnackbarMaterial
        severity="success"
        message="C???p nh???t th??nh c??ng"
        open={alert}
        setOpen={setAlert}
      />
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
  font-family: "Poppins", sans-serif;
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
const Image = styled.img`
  width: 150px;
  display: block;
  margin-top: 16px;
`;
const CustomBtn = styled.button`
  border: none;
  background-color: #1976d2;
  padding: 6px 36px;
  color: #fff;
  border-radius: 3px;
  font-weight: 500;
  text-transform: uppercase;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  &:hover {
    background-color: #20309e;
  }
`;

export default SanphamChinhsua;
