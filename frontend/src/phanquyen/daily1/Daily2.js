import React from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import TableDaily2 from "./tables/TableDaily2";

const Daily2 = (props) => {
  return (
    <div id="bophankdDaily1">
      <div className="header">
        <h5 className="title">Danh sách đại lý cấp 2</h5>
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
            onClick={() => props.history.push("/daily1/daily2/them")}
          >
            Thêm đại lý
          </ButtonMaterial>
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Tất cả đại lý cấp 2</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tim dai ly" />
            </div>
          </div>
        </div>

        <div className="tableSection">
          <TableDaily2 />
          {/* <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Ten dai ly</th>
                <th>So dien thoai</th>
                <th>Email</th>
                <th>Tai khoan</th>
              </tr>
            </thead>
            <tbody>
              {dsDaily2.map((daily1) => (
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link to={`/daily1/daily2/chitiet/${daily1._id}`}>
                      {daily1.ten}
                    </Link>
                  </td>
                  <td>{daily1.sdt}</td>
                  <td>{daily1.email}</td>
                  <td>{daily1.user?.taikhoan}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Daily2;
