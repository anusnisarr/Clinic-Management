// In your parent component (e.g., PatientManagement.jsx)

import { useState, useEffect } from "react";
import CustomDataTable from "../components/customDataTable";
import { Chip, Typography } from "@mui/material";
import { getVisits } from "../api/visitService";

export default function PatientManagement() {
  const [visitData, setVisitData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 });
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);  

  // Your existing fetchData function
  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize, search);
  }, [paginationModel, search]);

  const fetchData = async (page, pageSize, search) => {
    setIsLoading(true);
    try {
      const data = await getVisits(search, page + 1, pageSize);
      setVisitData({ rows: data.data, total: data.total });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(visitData.rows);
  

  // Define columns with custom rendering
  const columns = [
    {
      field: "tokenNo",
      headerName: "Token",
      width: 120,
      renderCell: (params) => {
        console.log(params.tokenNo); // check here
        return <Chip label={params.tokenNo || "N/A"} />;
      }
    },
    {
      field: "fullName",
      headerName: "Patient Name",
      width: 180,
      renderCell: (params) => (
        <Typography fontWeight={600}>{params.fullName}</Typography>
      )
    },
    { field: "age", headerName: "Age", width: 80 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "appointmentType", headerName: "Type", width: 130 },
    { field: "registrationTime", headerName: "Registration", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 50,
      renderCell: (params) => {
        const colors = {
          waiting: "warning",
          "in-progress": "info",
          completed: "success",
          hold: "default"
        };
        return <Chip label={params.status} color={colors[params.status]} size="small" />;
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      width: "250px",
      align: "center",
      renderCell: (row) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Marking ${row.name} as done`);
            }}
            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
          >
            Done
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Putting ${row.name} on hold`);
            }}
            className="px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors"
          >
            Hold
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRow(row);
            }}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
          >
            Details
          </button>
        </div>
      )
    }
  ];

  // Handler functions
  const handleStatusUpdate = (patientId, newStatus, rowData) => {
    console.log('Update status:', patientId, newStatus);
    
    // Socket emit
    socket.emit("status-updated", {
      patientId: patientId,
      newStatus: newStatus
    });

    // Update local state
    setVisitData(prev => ({
      ...prev,
      rows: prev.rows.map(row => 
        row.id === patientId ? { ...row, status: newStatus } : row
      )
    }));
  };

  const handleSaveVisit = async (patientId, visitData) => {
    try {
      await axios.patch(
        `${env.VITE_BASE_PATH}/patient/updateMedicalHistory/${patientId}`,
        visitData
      );
      // Refresh data
      fetchData(paginationModel.page, paginationModel.pageSize, search);
      alert("Visit saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save visit");
    }
  };

  const handleViewDetails = (rowData) => {
    console.log('View details for:', rowData);
  };

  const handleSearchChange = (model) => {
    const text = model.quickFilterValues?.join(" ") || "";
    setSearch(text);
  };

  return (
    <CustomDataTable
      // Your existing props
      rows={visitData.rows}
      columns={columns}
      total={visitData.total}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationChange={setPaginationModel}
      onFilterModelChange={handleSearchChange}
      title="Visit History"
      
      // New props for buttons and dialog
      showActionButtons={true}
      onStatusUpdate={handleStatusUpdate}
      onSaveVisit={handleSaveVisit}
      onViewDetails={handleViewDetails}
      
      
      // Optional: Customize buttons
      actionButtonsConfig={{
        showDone: true,
        showHold: true,
        showDetails: true,
      }}
      
      // Optional: Customize dialog
      detailsDialogConfig={{
        showPatientInfo: true,
        showMedicalHistory: true,
        enableVisitForm: true,
      }}
    />
  );
}