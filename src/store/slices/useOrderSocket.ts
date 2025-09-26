import { useEffect } from "react";
import useStore from "..";
import { socket } from "../../api/socket";

export function useOrderSocket(adminId:string | undefined) {
  const { addOrder, updateOrder, removeOrder } = useStore(); 

  useEffect(() => {
    if(adminId) {
      socket.emit("join", `admin:${adminId}`);
    }

    socket.on("orderCreated", addOrder);
    socket.on("orderUpdated", updateOrder);
    socket.on("orderDeleted", removeOrder);

    return () => {
      socket.off("orderCreated", addOrder);
      socket.off("orderUpdated", updateOrder);
      socket.off("orderDeleted", removeOrder);
    };
  }, [adminId , addOrder, updateOrder, removeOrder]);
}
