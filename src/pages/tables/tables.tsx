import { useEffect} from "react";
import useStore from "../../store";
import TableList from "../../components/Tables/TableList";


// Main TablesPage Component
export default function Tables() {
  const { getTablesWithOrders } = useStore();



  useEffect(() => {
    const fetchTables = async () => {
      await getTablesWithOrders();
    };
    fetchTables();
  }, [getTablesWithOrders]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TableList />
      </div>
    </div>
  );
}
