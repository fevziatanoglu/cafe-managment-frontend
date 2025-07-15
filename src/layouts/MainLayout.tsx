import { Outlet } from "react-router-dom";
import Modal from "../components/Common/Modal";
import useStore from "../store";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


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
        <div>Loading...</div>
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

