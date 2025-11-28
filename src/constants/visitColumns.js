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
    { field: "fullName", headerName: "Full Name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 70 },
    { field: "appointmentType", headerName: "Appointment Type", width: 130 },
    { field: "priority", headerName: "Priority", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ], [totalRows, paginationModel]);
};

export const columnFields = [
  "id", "registrationDate", "tokenNo",
  "fullName", "age", "appointmentType", "priority", "status"
];
