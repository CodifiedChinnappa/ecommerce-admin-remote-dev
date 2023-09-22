import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import "./customTable.scss";
import { Link } from "react-router-dom";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const CustomTable = ({ columns, rows, slug }: Props) => {


  // const handleDelete = (id: number) => {
  //   //delete the item
  //   // mutation.mutate(id)
  // };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "More",
    width: 200,
    renderCell: params => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            {/* <VisibilityIcon/> */}
          </Link>
          {/* <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div> */}
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
         <Box sx={{ height: 450, width: '100%' }}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </Box>
    </div>
  );
};

export default CustomTable;
