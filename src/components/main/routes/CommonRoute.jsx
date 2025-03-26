import { Outlet, Navigate } from "react-router-dom";

export default function CommonRoute() {
  const userid = localStorage.getItem("token") == null ? true : false;
  return <>{userid ? <Outlet /> : <Navigate to="/" />};</>;
}
