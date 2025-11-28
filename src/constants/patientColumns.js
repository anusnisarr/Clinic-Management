import { useMemo } from "react";

export const usePatientColumns = (totalRows, paginationModel) => {
  return useMemo(() => [
  { field: '_id', headerName: 'ID', width: 70 ,
    valueGetter: (value, row, column, apiRef) => {
      return totalRows - apiRef.current.getRowIndexRelativeToVisibleRows(value) - (paginationModel.page * paginationModel.pageSize);
    }
  },
  { field: 'createdAt', 
    headerName: 'Creation Date', 
    width: 200 , 
    valueGetter: ( value , row) => {
    const date = new Date(row.createdAt);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: true,
    });
  }},
  { field: 'fullName', headerName: 'Full Name', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 10 },
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'emergencyContact', headerName: 'Emergency Contact', width: 200 },
  { field: 'emergencyPhone', headerName: 'Emergency Phone', width: 200 },
  ], [totalRows, paginationModel]);
};

export const columnFields = [
  "_id", "createdAt", "phone",
  "fullName", "age", "address", "emergencyContact", "emergencyPhone"
];
