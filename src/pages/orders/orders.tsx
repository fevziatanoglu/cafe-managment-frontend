import { useEffect } from "react";
import useStore from "../../store";
import { OrderHeader } from "../../components/Orders/OrderHeader";
import OrderList from "../../components/Orders/OrderList";

export default function Orders() {
  const { getOrdersFetch } = useStore();

  useEffect(() => {
    getOrdersFetch();
  }, [getOrdersFetch]);

  return (
    <>
      <OrderHeader />
      <OrderList />
    </>
  );
}
