// src/constants/visitColumns.js
import { useMemo } from "react";

export const useVisitColumns = (totalRows, paginationModel) => {
  return useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      valueGetter: (params, row, column, apiRef) => {
        return totalRows - apiRef.current.getRowIndexRelativeToVisibleRows(params) - (paginationModel.page * paginationModel.pageSize);
      }
    },
    {
      field: "registrationDate",
      headerName: "Registration Date",
      width: 200,
      valueGetter: (params, row) => {
        const date = new Date(row.registrationDate);
        return date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: true,
        });
      }
    },
    { field: "tokenNo", headerName: "Token No", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "age", headerName: "Age", type: "number", width: 70 },
    { field: "appointmentType", headerName: "Appointment Type", width: 130 },
    { field: "priority", headerName: "Priority", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ], [totalRows, paginationModel]);
};

export const columnFields = [
  "id", "registrationDate", "tokenNo", "firstName", "lastName",
  "fullName", "age", "appointmentType", "priority", "status"
];
