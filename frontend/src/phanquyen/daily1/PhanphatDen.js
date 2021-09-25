import React, { useEffect, useState } from "react";
import ButtonMaterial from "../../components/ButtonMaterial";
import TablePhanphatDen from "./tables/TablePhanphatDen";
import apiDaily1 from "../../axios/apiDaily1";
import apiPhanphat from "../../axios/apiPhanphat";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";

const PhanphatDen = (props) => {
  const [dsPhanphatDen, setDsPhanphatDen] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDaily1Info = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleBophankdBasedUser(userInfo._id);
    const data = await apiPhanphat.dsPhanphatDenDaily1(daily1._id);
    setDsPhanphatDen(data.phanphat);
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily1Info();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <div id="daily1PhanphatDen">
      <div className="header">
        <h5 className="title">Danh sách phân phát đến</h5>
        <div className="user">
          <i class="fas fa-user-circle"></i>
          <span>Hoang Cuong Tran</span>
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div className="content">
        <div className="btnRight">
          {/* <ButtonMaterial
            variant="contained"
            onClick={() => props.history.push("/daily1/daily2/them")}
          >
            Thêm đại lý
          </ButtonMaterial> */}
        </div>

        <div className="filterSection">
          <div className="title">
            <p>Danh sách phân phát đến</p>
          </div>
          <div className="filterTypes">
            <div className="searchBox">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tim dai ly" />
            </div>
          </div>
        </div>

        <div className="tableSection">
          <TablePhanphatDen dsPhanphatDen={dsPhanphatDen} />
        </div>
      </div>
    </div>
  );
};

export default PhanphatDen;
