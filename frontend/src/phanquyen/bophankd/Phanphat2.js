import React from "react";
import apiPhanphat from "../../axios/apiPhanphat";
import BackdropMaterial from "../../components/BackdropMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import styled from "styled-components";
import Header from "../../components/Header";
import TablePhanphatDanhsach2 from "./tables/TablePhanphatDanhsach2";

const Phanphat2 = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["daidien", "daily1", "daily2"]);
  const [loading, setLoading] = React.useState(false);
  const [dsPhanphat, setDsPhanphat] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchCongcu = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { dsphanphat } = await apiPhanphat.dsVattuPhanphat(bophankd._id);
    setDsPhanphat(
      dsphanphat
        ? dsphanphat.map((item) => ({
            ...item,
            daidien: item.phanphat.to.hodan.daidien,
            daily1: item.phanphat.to.daily1.ten,
            daily2: item.phanphat.to.daily2.ten,
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsPhanphat) => {
    return (
      dsPhanphat &&
      dsPhanphat.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Vật tư vật tư" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/bophankd/vattu")}
          >
            Thêm phân phát
          </ButtonMaterial>
        </BtnRight>
        <FilterSection>
          <TitleWrapper>
            <Title>Tất cả phiên phân phát</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim vật tư theo tên, công dụng"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TablePhanphatDanhsach2 dsPhanphat={search(dsPhanphat)} />
        </FilterSection>
      </Content>
    </Wrapper>
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

export default Phanphat2;
