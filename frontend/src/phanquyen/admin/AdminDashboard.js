import React from "react";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const AdminDashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    //
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <div>
      <h1>Admin dashboard 123</h1>
      <button onClick={handleLogout} className="btn btn-primary">
        Dang xuat
      </button>
    </div>
  );
};

export default AdminDashboard;
