import { useState , useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Paper , Typography , Box } from '@mui/material';
import { getVisits } from '../api/visitApi';


export default function VisitHistory() {

  const [rows ,setRows] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false);


  const columns = [
  { field: 'id', headerName: 'ID', width: 70 ,
  valueGetter: (value, row, column, apiRef) => {
    return apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1;
  }
   },
  { field: 'registrationDate', 
    headerName: 'Registration Date', 
    width: 200 , 
    valueGetter: ( value , row) => {
    const date = new Date(row.registrationDate);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: true,
    });
  }},
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 10,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

  const columnsName = columns.map((elm)=> elm.field)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize , columnsName);
    console.log(isLoading);
    
  }, [paginationModel]);


  function handlePaginationChange(newModel) {
    setPaginationModel(newModel);

  }

  const fetchData = async (page, limit , columnsName) => {
    setIsLoading(true)
    try {
      const data = await getVisits(page + 1, limit , columnsName); // backend pages start at 1
      setRows(data.data);
      setTotalRows(data.total);
    } catch (error) {
      console.error("Failed to fetch visits:", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
  <Paper
    sx={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}
  >

    <Box sx={{ p: 2, flex: "0 0 auto" }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Visit History
      </Typography>
    </Box>

    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden"
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 20 , 50 , 100 ]}
        initialState={{ pagination: { paginationModel } }}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        sx={{
          border: 0,
          height: "100%",
          "& .MuiDataGrid-main": {
            height: "100%"
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "auto"
          }
        }}
      />
    </Box>
  </Paper>
  );
}
