import React from "react";
import TableCongcu from "./tables/TableCongcu";
import ButtonMaterial from "../../components/ButtonMaterial";

const Congcu = (props) => {
  return (
    <div id="bophankdCongcu">
      <div className="header">
        <h5 className="title">Danh sách công cụ</h5>
        <div className="user">
          <i class="fas fa-user-circle"></i>
          <span>Hoang Cuong Tran</span>
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div className="content">
        <div className="btnRight">
          <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/bophankd/congcu/them")}
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
              <input type="text" placeholder="Tìm công cụ" />
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
