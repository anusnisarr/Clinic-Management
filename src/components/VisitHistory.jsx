import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import { getVisits } from "../api/visitService";
import { useVisitColumns, columnFields } from "../constants/visitColumns";

export default function VisitHistory() {
  // Combined state for rows and total
  const [visitData, setVisitData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [error, setError] = useState(null);

  const columns = useVisitColumns(visitData.total, paginationModel);

  // Fetch data
  const fetchData = async ({ page, pageSize }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getVisits(page + 1, pageSize, columnFields);
      setVisitData({ rows: data.data, total: data.total });
    } catch (err) {
      setError("Failed to fetch visit history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(paginationModel);
  }, [paginationModel]);

  const handlePaginationChange = (newModel) => setPaginationModel(newModel);

  return (
    <Paper
      sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Box sx={{ p: 2, flex: "0 0 auto" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Visit History
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {error ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )  : (
          <DataGrid
            rows={visitData.rows}
            getRowId={(row) => row.id}
            columns={columns}
            columnVisibilityModel={{ firstName: false, lastName: false }}
            loading={isLoading}
            pageSizeOptions={[10, 20, 50, 100]}
            pagination
            paginationMode="server"
            rowCount={visitData.total}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            sx={{
              border: 0,
              height: "100%",
              "& .MuiDataGrid-main": { height: "100%" },
              "& .MuiDataGrid-virtualScroller": { overflowY: "auto" }
            }}
          />
        )}
      </Box>
    </Paper>
  );
}
