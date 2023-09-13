import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import axios from "../api/axios";
import CustomTable from "../components/customTable/customTable";
import useAuth from "../hooks/useAuth";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    type: "string",
    headerName: "Customer",
    flex: 1,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "created_date",
    type: "string",
    headerName: "Order Date",
    flex: 1,
  },
  {
    field: "order_total",
    type: "string",
    headerName: "Amount",
    flex: 1,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    flex: 1,
  },
];

const AllOrders = () => {
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`list_dealer_orders/${auth}`);
        const processedOrders = await data.map((order: any) => {
          return {
            ...order,
            id: order.order_no,
          };
        });
        setOrdersInfo(processedOrders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <div>
      <div className="page-heading">
        <h1>all orders</h1>
      </div>
      {!loading ? (
        <CustomTable slug="order-details" columns={columns} rows={ordersInfo} />
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AllOrders;
