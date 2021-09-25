import React from "react";
import TableKhohang from "./tables/TableKhohang";
import ButtonMaterial from "../../components/ButtonMaterial";

const Khohang = (props) => {
  return (
    <div id="bophankdKhohang">
      <div className="header">
        <h5 className="title">Quan ly kho</h5>
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
            onClick={() => props.history.push("/bophankd/sanpham")}
          >
            Danh sách sản phẩm
          </ButtonMaterial>
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Tất cả sản phẩm</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tìm sản phẩm" />
            </div>

            {/* <div className="dropdowns">
              <div className="dropdown">
                <span className="dropdownTitle">
                  <span>loai san pham</span>
                  <i class="fas fa-caret-down"></i>
                </span>
                <div className="dropdownContent">
                  <ul>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="dropdown">
                <span className="dropdownTitle">
                  <span>loai san pham</span>
                  <i class="fas fa-caret-down"></i>
                </span>
                <div className="dropdownContent">
                  <ul>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="dropdown">
                <span className="dropdownTitle">
                  <span>loai san pham</span>
                  <i class="fas fa-caret-down"></i>
                </span>
                <div className="dropdownContent">
                  <ul>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                    <li>
                      <span>Nong san</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="tableSection">
          <TableKhohang />
        </div>
      </div>
    </div>
  );
};

export default Khohang;
