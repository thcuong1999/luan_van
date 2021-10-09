import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputText from "../../components/InputText";
// import img_placeholder from "../assets/images/img_placeholder.png";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Daily2Chitiet = ({ open, onClose, daily2 }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ border: "none" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chi tiết đại lý cấp 2
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Form>
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <InputText label="Tên đại lý" value={daily2.ten} />
                  </FormGroup>

                  <FormGroup>
                    <InputText
                      label="Tài khoản"
                      value={daily2?.user?.taikhoan}
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-6">
                  <FormGroup>
                    <InputText label="E-mail" value={daily2.email} />
                  </FormGroup>

                  <FormGroup>
                    <InputText label="Số điện thoại" value={daily2.sdt} />
                  </FormGroup>

                  <FormGroup>
                    <InputText
                      multiline
                      rows={4}
                      label="Địa chỉ"
                      value={daily2.diachi}
                    />
                  </FormGroup>
                </div>
              </div>
            </Form>
          </Typography>
          <div className="text-right">
            <ButtonMaterial variant="outlined" onClick={onClose}>
              Đóng
            </ButtonMaterial>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const Image = styled.img`
  width: 100px;

  &.noImage {
    opacity: 0.15;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 15px;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
`;

const Form = styled.div`
  background: #fff;
  padding: 36px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

export default Daily2Chitiet;

// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import Button from "@material-ui/core/Button";
// import Loading from "../../components/Loading";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ButtonMaterial from "../../components/ButtonMaterial";
// import InputText from "../../components/InputText";
// import DialogMaterial from "../../components/DialogMaterial";

// const Daily1Chitiet = (props) => {
//   const [daily1, setDaily1] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   const { id: daily1Id } = props.match.params;

//   const fetchDaily1 = async () => {
//     setLoading(true);
//     const { data } = await Axios.get(`/api/daily1/single/${daily1Id}`);
//     if (data.success) {
//       setDaily1(data.daily1);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDaily1();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = async () => {
//     const { data } = await Axios.delete(`/api/daily1/single/${daily1Id}`);
//     setOpen(false);
//     if (data.success) {
//       Toastify({
//         text: "Xoa san pham thanh cong",
//         backgroundColor: "#0DB473",
//         className: "toastifyInfo",
//         position: "center",
//       }).showToast();
//     }
//     setTimeout(() => props.history.push("/bophankd/daily1"), 1000);
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <div id="bophankdThemdaily1">
//         <div className="header">
//           <h5
//             className="title"
//             onClick={() => props.history.push("/bophankd/daily1")}
//           >
//             <i class="fas fa-angle-left"></i>
//             <span>Quay lại trang danh sách dai ly 1</span>
//           </h5>
//           <div className="btns">
//             <ButtonMaterial
//               variant="outlined"
//               startIcon={<DeleteIcon />}
//               onClick={handleClickOpen}
//             >
//               Xóa
//             </ButtonMaterial>

//             <ButtonMaterial
//               variant="contained"
//               onClick={() =>
//                 props.history.push(`/bophankd/daily1/chinhsua/${daily1Id}`)
//               }
//             >
//               Chỉnh sửa
//             </ButtonMaterial>
//           </div>
//         </div>
//         <div className="content bophankdChitietdaily1">
//           <div className="form">
//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="formGroup">
//                   <InputText label="Tên đại lý" value={daily1.ten} disabled />
//                 </div>

//                 <div className="formGroup">
//                   <InputText
//                     label="Tài khoản"
//                     value={daily1.user?.taikhoan}
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="formGroup">
//                   <InputText
//                     label="E-mail"
//                     name="email"
//                     value={daily1.email}
//                     disabled
//                   />
//                 </div>

//                 <div className="formGroup">
//                   <InputText
//                     label="Số điện thoại"
//                     value={daily1.sdt}
//                     disabled
//                   />
//                 </div>

//                 <div className="formGroup">
//                   <InputText
//                     label="Địa chỉ"
//                     value={daily1.diachi}
//                     multiline
//                     rows={5}
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <DialogMaterial
//         open={open}
//         onClose={handleClose}
//         title="Xóa sản phẩm?"
//         content="Bạn chắc xóa vĩnh viễn sản phẩm này chứ ?"
//         onClick1={handleDelete}
//         onClick2={handleClose}
//         text1="Xóa"
//         text2="Hủy"
//       />

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Xóa sản phẩm?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Bạn chắc xóa vĩnh viễn sản phẩm này chứ ?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDelete} color="primary">
//             Xóa
//           </Button>
//           <Button onClick={handleClose} color="primary" autoFocus>
//             Hủy
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Daily1Chitiet;

// import React, { useState, useEffect } from "react";
// import BackdropMaterial from "../../components/BackdropMaterial";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ButtonMaterial from "../../components/ButtonMaterial";
// import InputText from "../../components/InputText";
// import DialogMaterial from "../../components/DialogMaterial";
// import apiDaily2 from "../../axios/apiDaily2";

// const Daily2Chitiet = (props) => {
//   const [daily2, setDaily2] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   const { id: daily2Id } = props.match.params;

//   const fetchDaily2 = async () => {
//     setLoading(true);
//     const data = await apiDaily2.singleDaily2(daily2Id);
//     console.log(data);
//     if (data.success) {
//       setDaily2(data.daily2);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDaily2();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = async () => {
//     const data = await apiDaily2.xoa1Daily2(daily2Id);
//     setOpen(false);
//     if (data.success) {
//       Toastify({
//         text: "Xoa san pham thanh cong",
//         backgroundColor: "#0DB473",
//         className: "toastifyInfo",
//         position: "center",
//       }).showToast();
//     }
//     setTimeout(() => props.history.push("/daily1/daily2"), 1000);
//   };

//   if (loading) {
//     return <BackdropMaterial />;
//   }

//   return (
//     <>
//       <div id="daily2Chitiet">
//         <div className="header">
//           <h5
//             className="title"
//             onClick={() => props.history.push("/daily1/daily2")}
//           >
//             <i class="fas fa-angle-left"></i>
//             <span>Quay lại trang danh sách dai ly 2</span>
//           </h5>
//           <div className="btns">
//             <ButtonMaterial
//               variant="outlined"
//               startIcon={<DeleteIcon />}
//               onClick={handleClickOpen}
//             >
//               Xóa
//             </ButtonMaterial>

//             <ButtonMaterial
//               variant="contained"
//               onClick={() =>
//                 props.history.push(`/daily1/daily2/chinhsua/${daily2Id}`)
//               }
//             >
//               Chỉnh sửa
//             </ButtonMaterial>
//           </div>
//         </div>
//         <div className="content bophankdChitietdaily2">
//           <div className="form">
//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="formGroup">
//                   <InputText label="Tên đại lý" value={daily2.ten} />
//                 </div>

//                 <div className="formGroup">
//                   <InputText label="Tài khoản" value={daily2.user?.taikhoan} />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="formGroup">
//                   <InputText label="E-mail" value={daily2.email} />
//                 </div>

//                 <div className="formGroup">
//                   <InputText label="Số điện thoại" value={daily2.sdt} />
//                 </div>

//                 <div className="formGroup">
//                   <InputText
//                     multiline
//                     rows={5}
//                     label="Địa chỉ"
//                     value={daily2.diachi}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <DialogMaterial
//         open={open}
//         onClose={handleClose}
//         title="Xóa sản phẩm?"
//         content="Bạn chắc xóa vĩnh viễn sản phẩm này chứ ?"
//         onClick1={handleDelete}
//         onClick2={handleClose}
//         text1="Xóa"
//         text2="Hủy"
//       />
//     </>
//   );
// };

// export default Daily2Chitiet;
