import React, { useEffect, useState } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiTiendo from "../../axios/apiTiendo";
import TableBaocao from "./tables/TableBaocao";

const TiendoChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsBaocao, setDsBaocao] = useState([]);
  const [baocao, setBaocao] = useState(null);
  const [singleTiendo, setSingleTiendo] = useState(null);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id: tiendoId } = props.match.params;

  const fetchDsTiendo = async () => {
    setLoading(true);
    const { tiendo } = await apiTiendo.singleTiendo(tiendoId);
    const { dsbaocao } = await apiTiendo.dsBaocao(tiendoId);
    setSingleTiendo(tiendo);
    setDsBaocao(dsbaocao && dsbaocao.baocao ? dsbaocao.baocao : []);
    setLoading(false);
  };

  const handleOpenModal = () => setModalOpen(true);

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsTiendo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách tiến độ"
          titleBack
          onClick={() => props.history.push("/hodan/tiendo")}
        />
        <Content>
          <BtnRight className="d-flex align-items-center justify-content-between">
            <div>
              <h5>{singleTiendo?.ten}</h5>
            </div>
            <ButtonMaterial
              variant="contained"
              onClick={() =>
                props.history.push(
                  `/hodan/tiendo/chitiet/${tiendoId}/baocao/them`
                )
              }
              style={{ marginLeft: 20 }}
            >
              Thêm báo cáo
            </ButtonMaterial>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách báo cáo</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim báo cáo theo tên, công dụng"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableBaocao
                dsBaocao={dsBaocao}
                handleOpenModal={handleOpenModal}
                setBaocao={setBaocao}
                tiendoId={tiendoId}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>
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
  padding: 0 36px;
  font-family: "Poppins", sans-serif;
`;
const BtnRight = styled.div`
  text-align: right;
  padding: 16px 0;
`;
const FilterSection = styled.div`
  background: #fff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;
const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default TiendoChitiet;
