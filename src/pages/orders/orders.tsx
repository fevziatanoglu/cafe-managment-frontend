import { useEffect } from "react";
import useStore from "../../store";
import { OrderHeader } from "../../components/Orders/OrderHeader";
import OrderList from "../../components/Orders/OrderList";

export default function Orders() {
  const { getOrdersFetch, getTablesFetch, getProductsFetch } = useStore();

  useEffect(() => {
    getOrdersFetch();
    getTablesFetch();
    getProductsFetch();
  }, [getOrdersFetch, getTablesFetch, getProductsFetch]);

  return (
    <>
      <OrderHeader />
      <OrderList />
    </>
  );
}
