import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
  return (
    <div></div>
  );
};

export default Logout;
