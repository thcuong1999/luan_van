import React, { useEffect, useState } from "react";
import TablePhanphat from "./tables/TablePhanphat";
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

const PhanphatThem = (props) => {
  const [open, setOpen] = React.useState(false);
  const { congcu } = props.location.state;
  const { userInfo } = useSelector((state) => state.user);
  const [daily1, setDaily1] = useState("");
  const [dsDaily1, setDsDaily1] = useState([]);
  const [items, setItems] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [bophankdData, setBophankdData] = useState(null);

  const fetchDsDaily1 = async () => {
    const data = await apiDaily1.dsDaily1();
    setDsDaily1(data.daily1);
    console.log(data);
  };

  const fetchBophankdData = async () => {
    const data = await apiBophankd.singleBophankdBasedUser(userInfo._id);
    setBophankdData(data.bophankd);
    //console.log({ BophankdData: data });
  };

  const deliverablePhatphat = () => {
    let positiveSoluong = congcu.filter((item) => item.soluong > 0);
    let deliveries = positiveSoluong.map((item) => {
      return {
        ...item,
        soluongphanphat: 1,
      };
    });
    return deliveries;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!daily1) {
      return setErrMsg("Vui lòng chọn đại lý");
    } else {
      const dscc = items.map((i) => ({
        congcu: i._id,
        soluongphanphat: i.soluongphanphat,
      }));

      const dl = {
        items: dscc,
        from: {
          bophankd: bophankdData._id,
        },
        to: {
          daily1,
        },
      };
      // console.log(dl);
      const data = await apiPhanphat.themPhanphat(dl);
      if (data.success) {
        handleClose();
        Toastify({
          text: "Phân phát công cụ thành công",
          backgroundColor: "#0DB473",
          className: "toastifyInfo",
          position: "center",
        }).showToast();
        props.history.push(`/bophankd/phanphat`);
      }
    }
  };

  useEffect(() => {
    fetchDsDaily1();
    fetchBophankdData();
  }, []);

  return (
    <>
      <div id="bophankdCongcu">
        <div className="header">
          <h5 className="title">Tiến hành phân phát</h5>
          <div className="user">
            <i class="fas fa-user-circle"></i>
            <span>Hoang Cuong Tran</span>
            <i class="fas fa-angle-down"></i>
          </div>
        </div>
        <div className="content">
          <div className="btnRight">
            <ButtonMaterial
              variant="contained"
              onClick={() => props.history.push("/bophankd/congcu")}
            >
              Xem danh sách công cụ
            </ButtonMaterial>
          </div>

          <div className="filterSection">
            <div className="title">
              <p>Công cụ có thể phân phát</p>
            </div>
            <div className="filterTypes">
              <div className="searchBox">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Tìm công cụ" />
              </div>
            </div>
          </div>

          <div className="tableSection">
            <TablePhanphat rows={deliverablePhatphat()} setItems={setItems} />
          </div>

          <div className="btnRight">
            <ButtonMaterial variant="contained" onClick={handleOpen}>
              Phân phát
            </ButtonMaterial>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        id="modalPhanphat"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Phân phát đến đại lý cấp 1
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ marginTop: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Đại lý 1
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={daily1}
                    label="Daily1"
                    onChange={(e) => {
                      setDaily1(e.target.value);
                      setErrMsg("");
                    }}
                  >
                    {/* loc ds dl co tk */}
                    {dsDaily1.map((item) => {
                      if (item.user) {
                        return <MenuItem value={item._id}>{item.ten}</MenuItem>;
                      }
                    })}
                  </Select>
                  {errMsg && (
                    <Alert severity="error" className="mt-2">
                      {errMsg}
                    </Alert>
                  )}
                  <Box className="btns">
                    <Button onClick={handleClose}>Hủy</Button>
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

export default PhanphatThem;
