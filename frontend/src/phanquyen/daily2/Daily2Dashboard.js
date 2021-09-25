import React from "react";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const Daily2Dashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    //
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <div>
      <h1>Dai ly 2 dashboard</h1>
      <button onClick={handleLogout}>Dang xuat</button>
    </div>
  );
};

export default Daily2Dashboard;
