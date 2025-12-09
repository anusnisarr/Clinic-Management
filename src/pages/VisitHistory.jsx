import { useState, useEffect , useRef, useMemo} from "react";
import { getVisits } from "../api/visitService";
import { useVisitColumns, columnFields } from "../constants/visitColumns";
import DataTable from '../components/dataTable';

export default function VisitHistory() {

  const [visitData, setVisitData] = useState({ rows: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 });
  const [search, setSearch] = useState("");
  const requestIdRef = useRef(null);

  const columns = useVisitColumns(visitData.total, paginationModel);

  const fetchData = async ( page, pageSize , search ,requestIdRef) => {

    setIsLoading(true);
    setError(null);

    const requestId = Date.now();  
    requestIdRef.current = requestId;

    try {

        const data = await getVisits(search , page + 1, pageSize, columnFields );
        if (requestIdRef.current !== requestId) return;
        setVisitData({ rows: data.data, total: data.total });

    } catch (err) {

        if (requestIdRef.current !== requestId) return;
        setError(err.response?.data?.message || err.message || "Failed to fetch visit history.");
        console.log("Fetch Error:", err);

    } finally {

        if (requestIdRef.current === requestId) setIsLoading(false);

    }
  };

  useEffect(() => {

    fetchData(paginationModel.page , paginationModel.pageSize , search , requestIdRef);

  }, [paginationModel , search]);

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
      onFilterModelChange={handleSearchChange}
      title="Visit History"
    />
  );
}
