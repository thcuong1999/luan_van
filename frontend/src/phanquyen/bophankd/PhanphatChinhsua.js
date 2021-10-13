import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
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
import BackdropMaterial from "../../components/BackdropMaterial";
import TablePhanphatChinhsua from "./tables/TablePhanphatChinhsua";

const PhanphatChinhsua = (props) => {
  const [dsCongcu, setDsCongcu] = useState([]);
  const { id: phanphatId } = props.match.params;
  //===
  const [phanphat, setPhanphat] = useState(null);
  const [langnghe, setLangnghe] = useState("Chọn làng nghề");
  const [dsLangnghe, SetDsLangnghe] = useState([]);
  const [hodan, setHodan] = useState("Chọn hộ dân");
  const [hodanInfo, setHodanInfo] = useState(null);
  const [dsHodan, setDsHodan] = useState([]);
  const [daily1, setDaily1] = useState(null);
  const [daily2, setDaily2] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleRemoveRow = (id) => {
    setDsCongcu(dsCongcu.filter((item) => item._id !== id));
  };

  const emptyFields = () => {
    if (hodan === "Chọn hộ dân") {
      setErrMsg("Trường này không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleChinhPhanphat = async () => {
    if (!emptyFields()) {
      const payload = {
        items: dsCongcu.map((item) => ({
          congcu: item.congcu._id,
          soluongphanphat: item.soluongphanphat,
        })),
        from: {
          bophankd: phanphat.from.bophankd._id,
        },
        to: {
          daily1: daily1._id,
          daily2: daily2._id,
          hodan: hodanInfo ? hodanInfo._id : phanphat.to.hodan._id,
        },
      };
      // console.log({ payload });
      const data = await apiPhanphat.suaPhanphat(phanphatId, {
        phanphatId,
        payload,
      });
      console.log(data);
      if (data.success) {
        Toastify({
          text: "Cập nhật phân phát thành công",
          backgroundColor: "#0DB473",
          className: "toastifyInfo",
          position: "center",
        }).showToast();
        props.history.push(`/bophankd/phanphat/chitiet/${phanphatId}`);
      }
    }
  };

  const fetchDsLangnghe = async () => {
    const { langnghe } = await apiLangnghe.dsLangnghe();
    // console.log({ langnghe });
    SetDsLangnghe(langnghe);
  };

  const fetchDsHodan = async () => {
    if (langnghe && dsLangnghe.length) {
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
    if (hodan !== "Chọn hộ dân" && dsHodan.length) {
      // lấy hộ dân obj dựa vào hodan state
      const hd = dsHodan.find(
        (item) => item.sdt === hodan.split(",")[2].trim()
      );
      // // lấy đại lý 2 obj dựa vào field daily2 của hd ở trên
      const { daily2 } = await apiDaily2.singleDaily2(hd.daily2);
      setDaily2(daily2);
      // // lấy đại lý 1 obj dựa vào field daily1 của daily2 ở trên
      const { daily1 } = await apiDaily1.singleDaily1(daily2.daily1);
      setDaily1(daily1);
      // // set hodanInfo
      let query = `daidien=${hodan.split(",")[0].trim()}&diachi=${hodan
        .split(",")[1]
        .trim()}&sdt=${hodan.split(",")[2].trim()}`;
      const data = await apiHodan.searchHodan(query);
      setHodanInfo(data.hodan);
    }
  };

  const fetchDataFirstRender = async () => {
    // fetch single phan phat
    const { phanphat } = await apiPhanphat.singlePhanphat(phanphatId);
    // fetch single langnghe
    const { langnghe: singleLN } = await apiLangnghe.singleLangnghe(
      phanphat.to.hodan.langnghe
    );
    // fetch single hodan
    const { hodan: singleHodan } = await apiHodan.singleHodan(
      phanphat.to.hodan._id
    );
    // fetch single daily2
    const { daily2: singleDaily2 } = await apiDaily2.singleDaily2(
      phanphat.to.daily2._id
    );
    // fetch single daily1
    const { daily1: singleDaily1 } = await apiDaily1.singleDaily1(
      phanphat.to.daily1._id
    );
    setDsCongcu(phanphat.items);
    setPhanphat(phanphat);
    setLangnghe(`${singleLN.ten}, ${singleLN.huyen}, ${singleLN.tinh}`);
    setHodan(
      `${singleHodan.daidien}, ${singleHodan.diachi.split(",")[0]}, ${
        singleHodan.sdt
      }`
    );
    setDaily2(singleDaily2);
    setDaily1(singleDaily1);
  };

  useEffect(() => {
    fetchDsLangnghe();
    fetchDsHodan();
    fetchDsDaily();
  }, [langnghe, hodan]);

  useEffect(() => {
    fetchDataFirstRender();
  }, []);

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
                  setDaily2("");
                  setDaily1("");
                  setErrMsg("");
                  // setSelectedDaily1(
                  //   dsLangnghe.find((item) => item.ten === val)
                  // );
                }}
              />
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
                  setErrMsg("");
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
                value={daily2 && `${daily2.ten}, ${daily2.diachi}`}
              />
            </FormGroup>

            <FormGroup>
              <Label>Đại lý cấp 1:</Label>
              <Input
                type="text"
                value={daily1 && `${daily1.ten}, ${daily1.diachi}`}
              />
            </FormGroup>
          </Form>
        </FormWrapper>

        <FilterSection>
          <TitleWrapper>
            <Title>Các công cụ đã chọn</Title>
          </TitleWrapper>

          <TablePhanphatChinhsua
            dsCongcu={dsCongcu}
            phanphat={phanphat}
            handleRemoveRow={handleRemoveRow}
            setDsCongcu={setDsCongcu}
          />
        </FilterSection>

        <ButtonRight>
          <ButtonMaterial variant="contained" onClick={handleChinhPhanphat}>
            Cập nhật
          </ButtonMaterial>
        </ButtonRight>
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

export default PhanphatChinhsua;
