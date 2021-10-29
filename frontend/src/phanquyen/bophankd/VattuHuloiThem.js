import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";
import Header from "../../components/Header";
import TableVattuHuloiThem from "./tables/TableVattuHuloiThem";
import apiVattu from "../../axios/apiVattu";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const VattuHuloiThem = (props) => {
  const { state: dsvattu } = props.location;
  const [alert, setAlert] = React.useState(false);
  const [danhsachVattu, setDanhsachVattu] = useState([]);

  const handleRemoveRow = (id) => {
    setDanhsachVattu(danhsachVattu.filter((item) => item._id !== id));
  };

  const handleSubmit = async () => {
    const dsvattuLoi = danhsachVattu.map((item) => ({
      vattu: item._id,
      soluongloi: item.soluongloi,
    }));
    const payload = {
      dsvattuLoi,
    };
    const data = await apiVattu.themVattuLoi(payload);
    if (data.success) {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (dsvattu) {
      setDanhsachVattu(dsvattu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <Header
          title="Quay về trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/bophankd/vattu")}
        />
        <Content>
          <Box>
            <Title>Thêm vật tư lỗi</Title>
            <TableSection>
              <TableVattuHuloiThem
                danhsachVattu={danhsachVattu}
                setDanhsachVattu={setDanhsachVattu}
                handleRemoveRow={handleRemoveRow}
              />
            </TableSection>
            <ButtonRight>
              <ButtonMaterial variant="contained" onClick={handleSubmit}>
                Thêm
              </ButtonMaterial>
            </ButtonRight>
          </Box>
        </Content>
      </Wrapper>

      <SnackbarMaterial
        severity="success"
        message="Thêm thành công"
        open={alert}
        setOpen={setAlert}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Box = styled.div`
  padding: 26px 36px;
  background-color: #fff;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const ButtonRight = styled.div`
  text-align: right;
  margin-top: 26px;
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default VattuHuloiThem;
