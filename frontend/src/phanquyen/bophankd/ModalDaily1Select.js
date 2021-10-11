import React, { useEffect, useState } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// api
import apiDaily1 from "../../axios/apiDaily1";
import apiPhanphat from "../../axios/apiPhanphat";
import apiBophankd from "../../axios/apiBophankd";
// modal
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
// alert
import Alert from "@mui/material/Alert";
import DropdownCustom from "../../components/DropdownCustom";
import { darkScrollbar } from "@mui/material";
import apiLangnghe from "../../axios/apiLangnghe";
import styled from "styled-components";
import apiDaily2 from "../../axios/apiDaily2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalDaily1Select = ({
  open,
  onClose,
  setDaily1Send,
  setHodanSend,
  handleSubmitPhanphat,
}) => {
  const [langnghe, setLangnghe] = useState("Chọn làng nghề");
  const [dsLangnghe, SetDsLangnghe] = useState([]);
  const [hodan, setHodan] = useState("Chọn hộ dân");
  const [dsHodan, setDsHodan] = useState([]);
  const [daily1, setDaily1] = useState(null);

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    if (daily1 === "Chọn đại lý cấp 1") {
      return setErrMsg("Vui lòng chọn đại lý");
    }
    console.log({ daily1, hodan });
    handleSubmitPhanphat();
  };

  const fetchDsLangnghe = async () => {
    const { langnghe } = await apiLangnghe.dsLangnghe();
    // console.log({ langnghe });
    SetDsLangnghe(langnghe);
  };

  const fetchDsHodan = async () => {
    if (langnghe !== "Chọn làng nghề") {
      const langngheId = dsLangnghe.find(
        (item) => item.ten === langnghe.split(",")[0]
      )._id;
      const { hodan } = await apiLangnghe.dsHodan(langngheId);
      // console.log({ hodan });
      // chỉ lấy hộ dân có field: daily2
      setDsHodan(hodan.filter((item) => item.daily2));
    }
  };

  const fetchDsDaily1 = async () => {
    if (hodan !== "Chọn hộ dân") {
      // lấy hộ dân obj dựa vào hodan state
      const hd = dsHodan.find(
        (item) => item.sdt === hodan.split(",")[2].trim()
      );
      // lấy đại lý 2 obj dựa vào field daily2 của hd ở trên
      const { daily2 } = await apiDaily2.singleDaily2(hd.daily2);
      // lấy đại lý 1 obj dựa vào field daily1 của daily2 ở trên
      const { daily1 } = await apiDaily1.singleDaily1(daily2.daily1);
      setDaily1(daily1);
    }
  };

  useEffect(() => {
    fetchDsLangnghe();
    fetchDsHodan();
    fetchDsDaily1();
  }, [langnghe, hodan]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        class="modalPhanphat"
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Phân phát đến đại lý cấp 1
            </Typography> */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ marginTop: 2 }}>
                <FormControl fullWidth>
                  <Title>Làng nghề</Title>
                  <DropdownCustom
                    dropdownStyles={{ width: "100%", marginBottom: 16 }}
                    data={dsLangnghe.map(
                      (item) => `${item.ten}, ${item.tinh}, ${item.huyen}`
                    )}
                    selected={langnghe}
                    onClick={(val) => {
                      setLangnghe(val);
                      setErrMsg("");
                      setHodan("Chọn hộ dân");
                      setDaily1("");
                      // setSelectedDaily1(
                      //   dsLangnghe.find((item) => item.ten === val)
                      // );
                    }}
                  />
                  {errMsg && (
                    <Alert severity="error" className="mt-2">
                      {errMsg}
                    </Alert>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <Title>Hộ dân</Title>
                  <DropdownCustom
                    dropdownStyles={{ width: "100%", marginBottom: 16 }}
                    data={dsHodan.map(
                      (item) =>
                        `${item.daidien},  ${item.diachi.split(",")[0]}, ${
                          item.sdt
                        }`
                    )}
                    selected={hodan}
                    onClick={(val) => {
                      setHodan(val);
                      setErrMsg("");
                      // setSelectedDaily1(
                      //   dsLangnghe.find((item) => item.ten === val)
                      // );
                    }}
                  />
                  {errMsg && (
                    <Alert severity="error" className="mt-2">
                      {errMsg}
                    </Alert>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <Title>Đại lý 1</Title>
                  <Input
                    type="text"
                    value={daily1 ? `${daily1.ten}, ${daily1.diachi}` : ""}
                  />
                  {errMsg && (
                    <Alert severity="error" className="mt-2">
                      {errMsg}
                    </Alert>
                  )}
                  <Box className="text-right mt-4">
                    <Button onClick={onClose}>Hủy</Button>
                    <Button variant="outlined" onClick={handleSubmit}>
                      Phân phát
                    </Button>
                  </Box>
                </FormControl>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const Title = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #333;
  margin: 10px 0;
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

export default ModalDaily1Select;
