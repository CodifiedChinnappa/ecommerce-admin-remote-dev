import { GridColDef } from "@mui/x-data-grid";
import CustomTable from "../../../components/customTable/customTable";
import { useGetProductsQuery } from "../../../features/catalog/catalogApiSlice";
import Loader from "../../../components/common/loader";

const columns: GridColDef[] = [
  { field: "order_id", headerName: "ID", flex: 1 },
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
    field: "status",
    type: "string",
    headerName: "Status",
    flex: 1,
  },
];

const ProductsList = () => {
  const { data: productsList, isLoading } = useGetProductsQuery({});

  return (
    <div>
      {!isLoading ? (
        <CustomTable
          slug="order-details"
          columns={columns}
          rows={productsList.results}
        />
      ) : (
        <Loader title={"loading"} />
      )}
    </div>
  );
};

export default ProductsList;
