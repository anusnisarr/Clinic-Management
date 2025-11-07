import React, { useMemo, useState } from "react";

// Professional Visit History Table component
// - TailwindCSS classes used for styling
// - Props: data (array of visits), defaultPageSize
// - Exports CSV, supports search, status filter and pagination

export default function VisitHistoryTable({ data = sampleData(), defaultPageSize = 8 }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((r) => (statusFilter === "all" ? true : r.status === statusFilter))
      .filter((r) => {
        if (!q) return true;
        return (
          r.visitor.toLowerCase().includes(q) ||
          r.purpose.toLowerCase().includes(q) ||
          r.notes.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data, query, statusFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  function downloadCSV() {
    const headers = ["Date", "Visitor", "Purpose", "Duration", "Notes", "Status"].join(",");
    const rows = filtered.map((r) => [
      new Date(r.date).toLocaleString(),
      escapeCsv(r.visitor),
      escapeCsv(r.purpose),
      r.duration,
      escapeCsv(r.notes),
      r.status,
    ].join(","));

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visit-history-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function escapeCsv(text) {
    if (text == null) return "";
    return `"${String(text).replace(/"/g, '""')}"`;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by visitor, purpose or notes..."
            className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 border rounded-md text-sm bg-white"
          >
            <option value="all">All status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border hover:bg-gray-50"
            title="Export visible rows to CSV"
          >
            Export CSV
          </button>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Rows</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="px-2 py-1 border rounded-md text-sm bg-white"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No visits found.</td>
              </tr>
            ) : (
              pageData.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{new Date(r.date).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.visitor}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.purpose}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.duration}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{r.notes}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length} results</div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 text-sm border rounded-md"
            disabled={page <= 1}
          >
            Prev
          </button>
          <div className="text-sm px-2">{page} / {pages}</div>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="px-3 py-1 text-sm border rounded-md"
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    completed: "bg-green-100 text-green-800",
    ongoing: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const cls = map[status] || "bg-gray-100 text-gray-800";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status}</span>
  );
}

function sampleData() {
  // Example data for demo — replace with real prop `data` when using
  return [
    {
      id: "1",
      date: new Date().toISOString(),
      visitor: "Aimal Khan",
      purpose: "Vendor meeting / contract renewal",
      duration: "35m",
      notes: "Discussed pricing tiers and SLA updates.",
      status: "completed",
    },
    {
      id: "2",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      visitor: "Shaan Ahmed",
      purpose: "Product demo",
      duration: "50m",
      notes: "Requested follow-up with engineering on feature X.",
      status: "ongoing",
    },
    {
      id: "3",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      visitor: "Nadia B.",
      purpose: "Interview",
      duration: "20m",
      notes: "Candidate for frontend role — strong React skills.",
      status: "completed",
    },
    {
      id: "4",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      visitor: "External Auditor",
      purpose: "Compliance check",
      duration: "1h 10m",
      notes: "Requested additional documents.",
      status: "cancelled",
    },
  ];
}
