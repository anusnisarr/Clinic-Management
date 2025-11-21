import { useState, useEffect } from "react";
import { getVisits } from "../api/visitService";
import { useVisitColumns, columnFields } from "../constants/visitColumns";
import DataTable from './dataTable';

export default function VisitHistory() {

  const [visitData, setVisitData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const columns = useVisitColumns(visitData.total, paginationModel);

  const fetchData = async ({ page, pageSize }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getVisits(page + 1, pageSize, columnFields);
      setVisitData({ rows: data.data, total: data.total });
    } catch (err) {
      setError("Failed to fetch visit history." , err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(paginationModel);
  }, [paginationModel]);

  const handlePaginationChange = (newModel) => setPaginationModel(newModel);

  return (
    <DataTable 
      rows={visitData.rows}
      columns={columns}
      total={visitData.total}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationChange={handlePaginationChange}
      title="Visit History"
    />
  );
}
