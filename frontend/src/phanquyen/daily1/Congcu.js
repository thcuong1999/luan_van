import React from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableCongcu from "./tables/TableCongcu";

const Congcu = (props) => {
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
          <ButtonMaterial
            onClick={() => props.history.push("/daily1/congcu/them")}
            variant="contained"
          >
            Thêm công cụ
          </ButtonMaterial>
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Tất cả công cụ</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tim cong cu" />
            </div>
          </div>
        </div>

        <div className="tableSection">
          <TableCongcu />
        </div>
      </div>
    </div>
  );
};

export default Congcu;
