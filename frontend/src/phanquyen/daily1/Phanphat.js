import React from "react";
import apiPhanphat from "../../axios/apiPhanphat";
import BackdropMaterial from "../../components/BackdropMaterial";
import ButtonMaterial from "../../components/ButtonMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import styled from "styled-components";
import Header from "../../components/Header";
import TablePhanphatDen from "./tables/TablePhanphatDen";
import apiDaily1 from "../../axios/apiDaily1";

const Phanphat = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [dsPhanphat, setDsPhanphat] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsPhanphat = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { dsphanphat } = await apiDaily1.dsPhanphat(daily1._id);
    setDsPhanphat(dsphanphat);
    setLoading(false);
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
      <Header title="Danh sách công cụ" />
      <Content>
        <BtnRight>
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/bophankd/congcu")}
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
                placeholder="Tim công cụ theo tên, công dụng"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
              />
            </SearchBox>
          </Filter>
          <TablePhanphatDen dsPhanphat={dsPhanphat} />
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

export default Phanphat;

// import React, { useEffect, useState } from "react";
// import ButtonMaterial from "../../components/ButtonMaterial";
// import TablePhanphatDen from "./tables/TablePhanphatDen";
// import apiDaily1 from "../../axios/apiDaily1";
// import apiPhanphat from "../../axios/apiPhanphat";
// import { useSelector } from "react-redux";
// import BackdropMaterial from "../../components/BackdropMaterial";

// const Phanphat = (props) => {
//   const [query, setQuery] = useState("");
//   const [searchColumns] = useState(["trangthaiQuery"]);
//   const [dsPhanphatDen, setDsPhanphatDen] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { userInfo } = useSelector((state) => state.user);

//   const fetchDaily1Info = async () => {
//     setLoading(true);
//     const { daily1 } = await apiDaily1.singleBophankdBasedUser(userInfo._id);
//     const data = await apiPhanphat.dsPhanphatDenDaily1(daily1._id);
//     setDsPhanphatDen(
//       data.phanphat.map((item) => ({
//         ...item,
//         trangthaiQuery:
//           item.trangthai === "daxn" ? "Da xac nhan" : "Cho xac nhan",
//       }))
//     );
//     setLoading(false);
//   };

//   console.log(dsPhanphatDen);

//   const search = (dsDaily2) => {
//     return dsDaily2.filter((item) =>
//       searchColumns.some(
//         (col) =>
//           item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
//       )
//     );
//   };

//   useEffect(() => {
//     fetchDaily1Info();
//   }, []);

//   if (loading) {
//     return <BackdropMaterial />;
//   }

//   return (
//     <div id="daily1PhanphatDen">
//       <div className="header">
//         <h5 className="title">Danh sách phân phát đến</h5>
//         <div className="user">
//           <i class="fas fa-user-circle"></i>
//           <span>Hoang Cuong Tran</span>
//           <i class="fas fa-angle-down"></i>
//         </div>
//       </div>
//       <div className="content">
//         <div className="btnRight">
//           {/* <ButtonMaterial
//             variant="contained"
//             onClick={() => props.history.push("/daily1/daily2/them")}
//           >
//             Thêm đại lý
//           </ButtonMaterial> */}
//         </div>

//         <div className="filterSection">
//           <div className="title">
//             <p>Danh sách phân phát đến</p>
//           </div>
//           <div className="filterTypes">
//             <div className="searchBox">
//               <i class="fas fa-search"></i>
//               <input
//                 type="text"
//                 placeholder="Tìm phân phát theo trạng thái"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="tableSection">
//           <TablePhanphatDen dsPhanphatDen={search(dsPhanphatDen)} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Phanphat;
