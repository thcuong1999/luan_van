import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonMaterial from "../../components/ButtonMaterial";
import Header from "../../components/Header";
import TableCongcuHuloiThem from "./tables/TableCongcuHuloiThem";
import apiCongcu from "../../axios/apiCongcu";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const CongcuHuloiThem = (props) => {
  const { state: dscc } = props.location;
  const [danhsachCongcu, setDanhsachCongcu] = useState([]);
  const [alert, setAlert] = React.useState(false);

  const handleRemoveRow = (id) => {
    setDanhsachCongcu(danhsachCongcu.filter((item) => item._id !== id));
  };

  const handleSubmit = async () => {
    const dsccLoi = danhsachCongcu.map((item) => ({
      congcu: item._id,
      soluongloi: item.soluongloi,
    }));
    const payload = {
      dsccLoi,
    };
    const data = await apiCongcu.themCongcuHuloi(payload);
    if (data.success) {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (dscc) {
      setDanhsachCongcu(dscc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <Header
          title="Quay về trang danh sách công cụ"
          titleBack
          onClick={() => props.history.push("/bophankd/congcu")}
        />
        <Content>
          <Box>
            <Title>Thêm công cụ lỗi</Title>
            <TableSection>
              <TableCongcuHuloiThem
                danhsachCongcu={danhsachCongcu}
                setDanhsachCongcu={setDanhsachCongcu}
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

export default CongcuHuloiThem;
