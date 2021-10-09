import React, { useEffect, useState } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableCongcu from "./tables/TableCongcu";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";

const Congcu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  // console.log(dsCongcu);

  const fetchData = async () => {
    setLoading(true);
    const data1 = await apiDaily1.singleBophankdBasedUser(userInfo._id);
    const data2 = await apiDaily1.dsCongcu(data1.daily1._id);
    // console.log(data2);
    setDsCongcu(
      data2.items.map((item) => ({
        ...item,
        ten: item.congcu.ten,
        congdung: item.congcu.congdung,
      }))
    );
    setLoading(false);
  };

  const search = (dsDaily2) => {
    return dsDaily2.filter((item) =>
      searchColumns.some(
        (col) =>
          item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <div id="daily1Congcu">
      <div className="header">
        <h5 className="title">Danh sách công cụ</h5>
        <div className="user">
          <i className="fas fa-user-circle"></i>
          <span>Hoàng Cương Trần</span>
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
      <div className="content">
        <div className="btnRight">
          {/* <ButtonMaterial
            onClick={() => props.history.push("/daily1/congcu/them")}
            variant="contained"
          >
            Thêm công cụ
          </ButtonMaterial> */}
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Tất cả công cụ</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tim công cụ theo tên, công dụng"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tableSection">
          <TableCongcu dsCongcu={search(dsCongcu)} />
        </div>
      </div>
    </div>
  );
};

export default Congcu;
