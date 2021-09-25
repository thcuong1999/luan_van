import React from "react";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const GsvDashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    //
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <div>
      <h1>Giam sat vung dashboard</h1>
      <button onClick={handleLogout}>Dang xuat</button>
    </div>
  );
};

export default GsvDashboard;
