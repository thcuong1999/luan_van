import React, { useEffect, useState } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiHodan from "../../axios/apiHodan";
import TableTiendo from "./tables/TableTiendo";
import apiTiendo from "../../axios/apiTiendo";
import TableChitietBaocao from "./tables/TableChitietBaocao";
import ModalChitietBaocao from "../../components/ModalChitietBaocao";

const Nguyenlieu = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsTiendo, setDsTiendo] = useState(null);
  const [singleHodan, setSingleHodan] = useState(null);
  const [selectedTiendo, setSelectedTiendo] = useState(null);
  const [singleBaocao, setSingleBaocao] = useState(false);
  const [dsBaocao, setDsBaocao] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { id: hodanId } = props.match.params;

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchSingleBaocao = async (selectedBaocao) => {
    if (selectedBaocao) {
      const { baocao } = await apiTiendo.singleBaocao(
        selectedTiendo,
        selectedBaocao
      );
      setSingleBaocao(baocao);
      handleOpenModal();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    // fetch ds tien do thuoc ho dan
    const { dstiendo } = await apiTiendo.dsTiendo(hodan._id);
    setDsTiendo(dstiendo);
    setSingleHodan(hodan);
    setLoading(false);
  };

  const fetchDsBaocao = async () => {
    if (selectedTiendo) {
      const { dsbaocao } = await apiTiendo.dsBaocao(selectedTiendo);
      // console.log(data);
      setDsBaocao(dsbaocao.baocao);
    } else {
      setDsBaocao([]);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDsBaocao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTiendo]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header
          title="Quay lại danh sách theo dõi báo cáo"
          titleBack
          onClick={() => props.history.push("/bophankd/theodoibaocao")}
        />
        <Content>
          <TitleInfo>{`${singleHodan?.daidien}, ${singleHodan?.diachi}, ${singleHodan?.sdt}`}</TitleInfo>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách tiến độ</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim tiến độ theo tên, công dụng"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableTiendo
                dsTiendo={dsTiendo}
                setSelectedTiendo={setSelectedTiendo}
              />
            </TableSection>
          </FilterSection>

          {selectedTiendo && (
            <FilterSection style={{ marginTop: 36 }}>
              <TitleWrapper>
                <Title>Danh sách báo cáo</Title>
              </TitleWrapper>
              <Filter>
                <SearchBox>
                  <i class="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Tim tiến độ theo tên, công dụng"
                    // value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                  />
                </SearchBox>
              </Filter>

              <TableSection>
                <TableChitietBaocao
                  dsBaocao={dsBaocao}
                  fetchSingleBaocao={fetchSingleBaocao}
                />
              </TableSection>
            </FilterSection>
          )}
        </Content>
      </Wrapper>

      <ModalChitietBaocao
        open={modalOpen}
        onClose={handleCloseModal}
        baocao={singleBaocao}
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
`;
const FilterSection = styled.div`
  background: #fff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  font-family: "Poppins", sans-serif;
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
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;
const TitleInfo = styled.h6`
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default Nguyenlieu;
