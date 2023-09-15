import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "../api/axios";
import CustomTable from "../components/customTable/customTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  // {
  //   field: "img",
  //   headerName: "Image",
  //   flex: 1,
  //   renderCell: params => {
  //     return <img src={params.row.media[0].url || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    filterable: true,
    flex: 1,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    filterable: true,
    flex: 1,
    renderCell: params => {
      return params.row.price[0].amount;
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    type: "boolean",
  },
];

const ProductsList = () => {
  // const [productsInfo, setProductsInfo] = useState([]);
  // const { auth } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get("products");
  //       setProductsInfo(data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [auth]);

  return (
    <div className="">
      <div className="page-heading">
        <h1>Products</h1>
      </div>

      {/* <CustomTable
        slug="product-details"
        columns={columns}
        rows={productsInfo}
      /> */}
    </div>
  );
};

export default ProductsList;
