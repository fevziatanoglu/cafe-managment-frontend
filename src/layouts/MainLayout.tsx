import { Outlet } from "react-router-dom";
import Modal from "../components/Common/Modal";
import useStore from "../store";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "../pages/loading/loading";


export default function MainLayout() {

  const { refreshToken } = useStore();
  const [isLoading, setLoading] = useState<boolean>(true);;

  useEffect(() => {
    const checkAuth = async () => {
      await refreshToken();
      setLoading(false);
    };
    checkAuth();
  }, [refreshToken]);

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Modal />
        </>
      )}
    </>
  );
}

