import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputText from "../../components/InputText";
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
