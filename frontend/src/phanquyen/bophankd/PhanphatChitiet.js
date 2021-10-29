import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiLangnghe from "../../axios/apiLangnghe";
import ButtonMaterial from "../../components/ButtonMaterial";
import Header from "../../components/Header";
import apiPhanphat from "../../axios/apiPhanphat";
import BackdropMaterial from "../../components/BackdropMaterial";
import TablePhanphatChitiet from "./tables/TablePhanphatChitiet";

const PhanphatChitiet = (props) => {
  const [phanphat, setPhanphat] = useState(null);
  const [langnghe, setLangnghe] = useState(null);
  const [hodan, setHodan] = useState(null);
  const [daily1, setDaily1] = useState(null);
  const [daily2, setDaily2] = useState(null);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id: phanphatId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { phanphat } = await apiPhanphat.singlePhanphat(phanphatId);
    console.log({ phanphat });
    // fetch lang nghe dua vao hodanId
    const { langnghe } = await apiLangnghe.singleLangnghe(
      phanphat.to.hodan.langnghe
    );
    setPhanphat(phanphat);
    setLangnghe(langnghe);
    setDaily1(phanphat.to.daily1);
    setDaily2(phanphat.to.daily2);
    setHodan(phanphat.to.hodan);
    setDsCongcu(phanphat.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header
        title="Quay về trang danh sách phân phát"
        titleBack
        onClick={() => props.history.push("/bophankd/phanphat")}
      />
      <Content>
        <FormWrapper>
          <Form>
            <FormTitle>Chi tiết phân phát</FormTitle>
            <FormGroup>
              <Label>Làng nghề:</Label>
              <Input
                type="text"
                value={`${langnghe?.ten}, ${langnghe?.tinh}, ${langnghe?.huyen}`}
              />
            </FormGroup>

            <FormGroup>
              <Label>Hộ dân:</Label>
              <Input
                type="text"
                value={`${hodan?.daidien}, ${hodan?.diachi.split(",")[0]}, ${
                  hodan?.sdt
                }`}
              />
            </FormGroup>

            <FormGroup>
              <Label>Đại lý cấp 2:</Label>
              <Input type="text" value={`${daily2?.ten}, ${daily2?.diachi}`} />
            </FormGroup>

            <FormGroup>
              <Label>Đại lý cấp 1:</Label>
              <Input type="text" value={`${daily1?.ten}, ${daily1?.diachi}`} />
            </FormGroup>
          </Form>
        </FormWrapper>

        <FilterSection>
          <TitleWrapper>
            <Title>Các công cụ đã phân phát</Title>
          </TitleWrapper>

          <TablePhanphatChitiet dsCongcu={dsCongcu} phanphat={phanphat} />
        </FilterSection>

        <StatusSection>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <div className="row mt-4">
                <div className="col-lg-5 text-right">
                  <p style={{ fontWeight: "500" }}>Trạng thái:</p>
                  <p style={{ fontWeight: "500" }}>Báo cáo:</p>
                  <p style={{ fontWeight: "500" }}>Hoàn thành phân phát:</p>
                </div>
                <div className="col-lg-7 text-right">
                  <p>
                    {phanphat?.trangthai === "choxn"
                      ? "Đang chờ xác nhận"
                      : "Đã xác nhận"}
                  </p>
                  <p>
                    {phanphat?.baocao === "daydu"
                      ? "Đầy đủ"
                      : phanphat?.baocao === "thieu"
                      ? "Thiếu"
                      : "Đang chờ"}
                  </p>
                  <p>
                    {phanphat?.hoanthanh === "daydu"
                      ? "Hoàn thành"
                      : "Chưa hoàn thành"}
                  </p>
                </div>
              </div>
              {phanphat?.trangthai.daily1 === "choxn" && (
                <ButtonRight>
                  <ButtonMaterial
                    variant="contained"
                    onClick={() =>
                      props.history.push(
                        `/bophankd/phanphat/chinhsua/${phanphatId}`
                      )
                    }
                  >
                    Có thể chỉnh sửa
                  </ButtonMaterial>
                </ButtonRight>
              )}
            </div>
          </div>
        </StatusSection>
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
  font-family: "Poppins", sans-serif;
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
  margin-bottom: 20px;
`;
const ButtonRight = styled.div`
  text-align: right;
  margin-top: 12px;
`;
const StatusSection = styled.div`
  background-color: #fff;
  margin-top: 16px;
  padding: 20px;
`;

export default PhanphatChitiet;
