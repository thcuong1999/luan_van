import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";

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

const ModalTienhanhPhanphat = ({
  open,
  onClose,
  hodanInfo,
  handleTienhanhPhanphat,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ border: "none" }}>
          <Typography id="modal-modal-title" variant="h6" component="span">
            Tiến hành phân phát
          </Typography>
          <Typography id="modal-modal-description">
            <Form>
              <FormGroup>
                <Label>Hộ dân đích:</Label>
                <Input
                  type="text"
                  value={`${hodanInfo?.daidien}, ${hodanInfo?.diachi}`}
                  readOnly
                />
              </FormGroup>
            </Form>
          </Typography>
          <div className="text-right">
            <ButtonMaterial variant="outlined" onClick={onClose}>
              Đóng
            </ButtonMaterial>
            <ButtonMaterial
              variant="contained"
              style={{ marginLeft: 16 }}
              onClick={handleTienhanhPhanphat}
            >
              Phân phát
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

export default ModalTienhanhPhanphat;
