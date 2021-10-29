import React from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header";
import TablePhanphatDen from "./tables/TablePhanphatDen";
import apiDaily1 from "../../axios/apiDaily1";

const Phanphat = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["bophankd", "daily2", "hodan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsPhanphat, setDsPhanphat] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsPhanphat = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { dsphanphat } = await apiDaily1.dsPhanphat(daily1._id);
    setDsPhanphat(
      dsphanphat && dsphanphat.length
        ? dsphanphat.map((item) => ({
            ...item,
            bophankd: item.phanphat.from.bophankd.ten,
            daily2: item.phanphat.to.daily2.ten,
            hodan: item.phanphat.to.hodan.daidien,
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
    fetchDsPhanphat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Công cụ phân phát" />
      <Content>
        <FilterSection>
          <TitleWrapper>
            <Title>Danh sách phân phát đến</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim công cụ theo tên, công dụng"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>

          <TableSection>
            <TablePhanphatDen dsPhanphat={search(dsPhanphat)} />
          </TableSection>
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
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
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

export default Phanphat;
