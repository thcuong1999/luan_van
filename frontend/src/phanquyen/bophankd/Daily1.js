import React from "react";
import TableDaily1 from "./tables/TableDaily1";
import ButtonMaterial from "../../components/ButtonMaterial";

const Daily1 = (props) => {
  return (
    <div id="bophankdDaily1">
      <div className="header">
        <h5 className="title">Danh sách đại lý cấp 1</h5>
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
            onClick={() => props.history.push("/bophankd/daily1/them")}
          >
            Thêm đại lý
          </ButtonMaterial>
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Tất cả đại lý cấp 1</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tim dai ly" />
            </div>
          </div>
        </div>

        <div className="tableSection">
          <TableDaily1 />
        </div>
      </div>
    </div>
  );
};

export default Daily1;
