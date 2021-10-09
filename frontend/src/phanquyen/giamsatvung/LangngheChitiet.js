import React, { useEffect, useState } from "react";
import "toastify-js/src/toastify.css";
import styled from "styled-components";
import Header from "../../components/Header";
import apiHodan from "../../axios/apiHodan";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableHodan from "./tables/TableHodan";

const LangngheChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [langnghe, setLangnghe] = useState(null);
  const [dsHodan, setDsHodan] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { id: langngheId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const data1 = await apiLangnghe.singleLangnghe(langngheId);
    const { hodan } = await apiHodan.dsHodanThuoc1Langnghe(langngheId);
    //console.log({ data2 });
    setLangnghe(data1.langnghe);
    setDsHodan(
      hodan && hodan.length
        ? hodan.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
            langnghe: item.langnghe ? item.langnghe.ten : "",
          }))
        : []
    );
    setLoading(false);
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchData();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
      />
      <Content>
        <FormWrapper>
          <Form>
            <FormTitle>Chi tiết làng nghề</FormTitle>
            <FormGroup>
              <Label>Tên làng:</Label>
              <Input type="text" defaultValue={langnghe?.ten} />
            </FormGroup>

            <FormGroup>
              <Label>Tỉnh:</Label>
              <Input type="text" defaultValue={langnghe?.tinh} />
            </FormGroup>

            <FormGroup>
              <Label>Huyện:</Label>
              <Input type="text" defaultValue={langnghe?.huyen} />
            </FormGroup>

            <FormGroup>
              <Label>Sản phẩm chính:</Label>
              <Input
                type="text"
                defaultValue={
                  langnghe?.sanphamchinh === "thucongmynghe"
                    ? "Thủ công mỹ nghệ"
                    : langnghe?.sanphamchinh === "nongsan"
                    ? "Nông sản"
                    : "Nguyên liệu"
                }
              />
            </FormGroup>
          </Form>
        </FormWrapper>

        <FilterSection>
          <TitleWrapper>
            <Title>Tất cả hộ dân</Title>
          </TitleWrapper>
          <Filter>
            <SearchBox>
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TableHodan dsHodan={dsHodan} setRowsRemoved={setRowsRemoved} />
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
  padding: 20px 36px;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 36px 20px 16px 36px;
  width: 100%;
`;

const Form = styled.div`
  width: 570px;
  margin: auto;
  padding: 0 26px;
`;

const FormTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrMsg = styled.span`
  font-size: 15px;
  color: red !important;
  margin-top: 3px;
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

export default LangngheChitiet;
