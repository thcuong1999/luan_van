import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import DropdownCustom from "../../components/DropdownCustom";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiLangnghe from "../../axios/apiLangnghe";
import TableTheodoiBaocao from "./tables/TableTheodoiBaocao";

const TheodoiBaocao = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState([
    "daidien",
    "sdt",
    "cmnd",
    "namsinh",
    "nghe",
    "langnghe",
  ]);
  const [loading, setLoading] = React.useState(false);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [langnghe, setLangnghe] = useState("Chọn làng nghề");
  const [dsHodan, setDsHodan] = useState([]);

  const handleClick = async (val) => {
    setLangnghe(val);
    let langngheId = dsLangnghe.find((item) => item.ten === val)?._id;
    const { hodan } = await apiLangnghe.dsHodan(langngheId);
    setDsHodan(hodan);
  };

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    setDsLangnghe(
      langnghe.map((item) => ({
        ...item,
        langnghe: item.langnghe?.ten,
      }))
    );
    setLoading(false);
  };

  const search = (dsBaocao) => {
    return (
      dsBaocao &&
      dsBaocao.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langnghe]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Theo dõi báo cáo" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hộ dân</Title>
            </TitleWrapper>

            <DropdownsWrapper>
              <div className="row">
                <div className="col-lg-4">
                  <DropdownCustom
                    dropdownStyles={{ width: "100%" }}
                    selected={langnghe}
                    data={dsLangnghe.map((item) => item.ten)}
                    onClick={(val) => handleClick(val)}
                    // label="Chọn làng nghề"
                  />
                </div>
              </div>
            </DropdownsWrapper>
            <FilterWrapper>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </FilterWrapper>
          </FilterSection>

          <TableSection>
            <TableTheodoiBaocao dsHodan={search(dsHodan)} />
          </TableSection>
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
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const FilterSection = styled.div`
  background: #ffff;
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
const DropdownsWrapper = styled.div`
  padding: 16px;
`;
const FilterWrapper = styled.div`
  padding-top: 0;
  padding-bottom: 14px;
  padding-left: 17px;
  padding-right: 17px;
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

export default TheodoiBaocao;
