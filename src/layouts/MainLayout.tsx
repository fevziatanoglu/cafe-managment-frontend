import { Outlet } from "react-router-dom";
import Modal from "../components/Common/Modal";




export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Modal />
    </>
  );
}
