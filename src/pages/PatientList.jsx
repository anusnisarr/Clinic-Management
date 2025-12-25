import { useState , useEffect , useMemo , useRef } from 'react';
import { getPatient } from "../api/services/patientService";
import { usePatientColumns , columnFields } from '../constants/patientColumns'
import DataTable from '../components/dataTable';

export default function VisitHistory() {

  const [patientData, setPatentData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const requestIdRef = useRef(null);


  const columns = usePatientColumns(patientData.total, paginationModel);

  useEffect(() => {

      fetchData(paginationModel.page, paginationModel.pageSize , search , requestIdRef);

  }, [paginationModel , search]);

  const fetchData = async ( page, pageSize , search ,requestIdRef) => {

    setIsLoading(true);
    setError(null);

    const requestId = Date.now();  
    requestIdRef.current = requestId;

    try {

        const data = await getPatient(search , page + 1, pageSize, columnFields );
        if (requestIdRef.current !== requestId) return;
        setPatentData({ rows: data.data, total: data.total });

    } catch (err) {

        if (requestIdRef.current !== requestId) return;
        setError(err.response?.data?.message || err.message || "Failed to fetch Patient.");
        console.log("Fetch Error:", err);

    } finally {

        if (requestIdRef.current === requestId) setIsLoading(false);

    }
  };
  
  const handlePaginationChange = (newModel) => setPaginationModel(newModel);

  const handleSearchChange = useMemo(() => {
    let timeout;

    return (model) => {
      clearTimeout(timeout);

      setIsLoading(true);

      timeout = setTimeout(() => {
        const text = model.quickFilterValues.join(" ") || "";
        setSearch(text);
      }, 400);
    };
}, []);
  
  return (
    <DataTable
      rows={patientData.rows}
      columns={columns}
      total={patientData.total}
      loading={isLoading}
      error={error}
      paginationModel={paginationModel}
      onPaginationChange={handlePaginationChange}
      onFilterModelChange={handleSearchChange}
      title="Patient List"
    />
  );
}
