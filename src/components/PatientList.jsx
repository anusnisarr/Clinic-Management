import { useState , useEffect } from 'react';
import { getPatient } from '../api/patientService';
import { usePatientColumns , columnFields } from '../constants/patientColumns';
import DataTable from './dataTable';

export default function VisitHistory() {

  const [patientData, setPatentData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const columns = usePatientColumns(patientData.total, paginationModel);

  const fetchData = async ({ page, pageSize }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPatient(page + 1, pageSize, columnFields);
      setPatentData({ rows: data.data, total: data.total });
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
      rows={patientData.rows}
      columns={columns}
      total={patientData.total}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationChange={handlePaginationChange}
      title="Patient List"
    />
  );
}
