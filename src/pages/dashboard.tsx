import { useEffect, useState } from "react";
import { GiCargoShip, GiCardPickup, GiReceiveMoney } from "react-icons/gi";
import { BiDetail, BiCartAlt } from "react-icons/bi";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import "./index.scss";

interface DashboardInfo {
  shipping_orders: number;
  picking_orders: number;
  total_sales: string;
}

const Dashboard = () => {
  // const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>({
  //   shipping_orders: 0,
  //   picking_orders: 0,
  //   total_sales: "0",
  // });

  // const { auth } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`dashboard_summary/${auth.user}`);
  //       setDashboardInfo(data);
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [auth]);

  return (
    <div className="py-5 grid gap-5">
      <div className="home">
        <div className="box box1">sds</div>
      </div>
    </div>
  );
};

export default Dashboard;
