import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import apiLangnghe from "../../axios/apiLangnghe";
import ButtonMaterial from "../../components/ButtonMaterial";
import DropdownCustom from "../../components/DropdownCustom";
import Header from "../../components/Header";
import TablePhanphatDi from "./tables/TablePhanphatDi";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import apiHodan from "../../axios/apiHodan";
import apiPhanphat from "../../axios/apiPhanphat";
import SnackbarMaterial from "../../components/SnackbarMaterial";

const PhanphatThem = (props) => {
  const { state: dsCongcu } = props.location;
  const [alert, setAlert] = React.useState(false);
  const [danhsachCongcu, setDanhsachCongcu] = useState(dsCongcu);
  const { userInfo } = useSelector((state) => state.user);
  const [langnghe, setLangnghe] = useState("Chọn làng nghề");
  const [dsLangnghe, SetDsLangnghe] = useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const [hodan, setHodan] = useState("Chọn hộ dân");
  const [hodanInfo, setHodanInfo] = useState(null);
  const [dsHodan, setDsHodan] = useState([]);
  const [daily1, setDaily1] = useState(null);
  const [daily2, setDaily2] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleRemoveRow = (id) => {
    setDanhsachCongcu(danhsachCongcu.filter((item) => item._id !== id));
  };

  const emptyFields = () => {
    if (langnghe === "Chọn làng nghề" || hodan === "Chọn hộ dân") {
      setErrMsg("Trường này không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleThemPhanphat = async () => {
    if (!emptyFields()) {
      const payload = {
        items: danhsachCongcu.map((item) => ({
          congcu: item._id,
          soluongphanphat: item.soluongphanphat,
        })),
        from: {
          bophankd: bophankdInfo._id,
        },
        to: {
          daily1: daily1._id,
          daily2: daily2._id,
          hodan: hodanInfo._id,
        },
      };
      // console.log({ payload });
      const data = await apiPhanphat.themPhanphat({ payload });
      // console.log(data);
      if (data.success) {
        setAlert(true);
        setErrMsg("");
      }
    }
  };

  const fetchDsLangnghe = async () => {
    const { langnghe } = await apiLangnghe.dsLangnghe();
    // console.log({ langnghe });
    SetDsLangnghe(langnghe);
  };

  const fetchDsHodan = async () => {
    if (langnghe !== "Chọn làng nghề") {
      const langngheId = dsLangnghe.find(
        (item) => item.ten === langnghe.split(",")[0]
      )._id;
      const { hodan } = await apiLangnghe.dsHodan(langngheId);
      // console.log({ hodan });
      // chỉ lấy hộ dân có field: daily2
      setDsHodan(hodan.filter((item) => item.daily2));
    }
  };

  const fetchDsDaily = async () => {
    if (hodan !== "Chọn hộ dân") {
      // lấy hộ dân obj dựa vào hodan state
      const hd = dsHodan.find(
        (item) => item.sdt === hodan.split(",")[2].trim()
      );
      // lấy đại lý 2 obj dựa vào field daily2 của hd ở trên
      const { daily2 } = await apiDaily2.singleDaily2(hd.daily2);
      console.log({ daily2 });
      setDaily2(daily2);
      // lấy đại lý 1 obj dựa vào field daily1 của daily2 ở trên
      const { daily1 } = await apiDaily1.singleDaily1(daily2.daily1);
      console.log({ daily1 });
      setDaily1(daily1);
      // set hodanInfo
      let query = `daidien=${hodan.split(",")[0].trim()}&diachi=${hodan
        .split(",")[1]
        .trim()}&sdt=${hodan.split(",")[2].trim()}`;
      const data = await apiHodan.searchHodan(query);
      setHodanInfo(data.hodan);
    }
  };

  const fetchBophankdInfo = async () => {
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    setBophankdInfo(bophankd);
  };

  useEffect(() => {
    if (dsCongcu) {
      setDanhsachCongcu(dsCongcu);
    }
    fetchDsLangnghe();
    fetchDsHodan();
    fetchDsDaily();
    fetchBophankdInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langnghe, hodan]);

  return (
    <>
      <Wrapper>
        <Header
          title="Quay về trang danh sách phân phát"
          titleBack
          onClick={() => props.history.push("/bophankd/phanphat")}
        />
        <Content>
          <FormWrapper>
            <Form>
              <FormTitle>Tiến hành phân phát</FormTitle>
              <FormGroup>
                <Label>Làng nghề:</Label>
                <DropdownCustom
                  dropdownStyles={{ width: "100%", marginBottom: 16 }}
                  data={dsLangnghe.map(
                    (item) => `${item.ten}, ${item.tinh}, ${item.huyen}`
                  )}
                  selected={langnghe}
                  onClick={(val) => {
                    setLangnghe(val);
                    setHodan("Chọn hộ dân");
                    setDaily2(null);
                    setDaily1(null);
                    setErrMsg("");
                    // setSelectedDaily1(
                    //   dsLangnghe.find((item) => item.ten === val)
                    // );
                  }}
                />
                {langnghe === "Chọn làng nghề" && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Hộ dân:</Label>
                <DropdownCustom
                  dropdownStyles={{ width: "100%", marginBottom: 16 }}
                  data={dsHodan.map(
                    (item) =>
                      `${item.daidien},  ${item.diachi.split(",")[0]}, ${
                        item.sdt
                      }`
                  )}
                  selected={hodan}
                  onClick={(val) => {
                    setHodan(val);
                    // setErrMsg("");
                    // setSelectedDaily1(
                    //   dsLangnghe.find((item) => item.ten === val)
                    // );
                  }}
                />
                {hodan === "Chọn hộ dân" && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Đại lý cấp 2:</Label>
                <Input
                  type="text"
                  value={daily2 ? `${daily2.ten}, ${daily2.diachi}` : ""}
                />
              </FormGroup>

              <FormGroup>
                <Label>Đại lý cấp 1:</Label>
                <Input
                  type="text"
                  value={daily1 ? `${daily1.ten}, ${daily1.diachi}` : ""}
                />
              </FormGroup>
            </Form>
          </FormWrapper>

          <FilterSection>
            <TitleWrapper>
              <Title>Các công cụ đã chọn</Title>
            </TitleWrapper>

            <TableSection>
              <TablePhanphatDi
                danhsachCongcu={danhsachCongcu}
                setDanhsachCongcu={setDanhsachCongcu}
                handleRemoveRow={handleRemoveRow}
              />
            </TableSection>
          </FilterSection>

          <ButtonRight>
            <ButtonMaterial variant="contained" onClick={handleThemPhanphat}>
              Phân phát đi
            </ButtonMaterial>
          </ButtonRight>
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
  padding: 20px 36px;
  font-family: "Poppins", sans-serif;
`;
const FormWrapper = styled.div`
  background: #fff;
  padding: 36px 20px 16px 36px;
  width: 100%;
`;
const Form = styled.div`
  width: 600px;
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
  margin-top: -10px;
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
  margin-top: 20px;
  background: #fff;
  padding: 20px;
`;
const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
`;

export default PhanphatThem;
