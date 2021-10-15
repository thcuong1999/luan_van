import React from "react";
import TableSanpham from "./tables/TableSanpham";
import ButtonMaterial from "../../components/ButtonMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import styled from "styled-components";
import { arrOfLinks } from "./links";

const Sanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "sdt"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const [khohang, setKhohang] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [bophankdInfo, setBophankdInfo] = React.useState(null);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const data1 = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data2 = await apiBophankd.bophankdDSSanpham(data1.bophankd._id);
    //console.log({ data1 });
    setBophankdInfo(data1.bophankd);
    setDsSanpham(data2.sanpham.sanpham);
    setKhohang(
      data2.sanpham.khohang && data2.sanpham.khohang.items
        ? data2.sanpham.khohang.items
        : []
    );
    setLoading(false);
  };

  React.useEffect(() => {
    setRowsRemoved(false);
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Danh sách sản phẩm" arrOfLinks={arrOfLinks} />
        <Content>
          <BtnRight>
            <ButtonMaterial
              variant="contained"
              onClick={() => props.history.push("/bophankd/sanpham/them")}
            >
              Thêm sản phẩm
            </ButtonMaterial>
          </BtnRight>
          <FilterSection>
            <TitleWrapper>
              <Title>Tất cả sản phẩm</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm theo tên, loại, nhãn hiệu"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSanpham
              dsSanpham={dsSanpham}
              khohang={khohang}
              setRowsRemoved={setRowsRemoved}
              bophankdId={bophankdInfo?._id}
            />
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

export default Sanpham;
