import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
 

// Main Reusable Table Component
const CustomDataTable = ({
  rows = [],
  columns = [],
  onRowClick = null,
  searchable = true,
  searchPlaceholder = "Search...",
  pagination = true,
  pageSize = 10,
  rowsPerPageOptions = [5, 10, 20, 50],
  emptyMessage = "No data available",
  emptyIcon = null,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  hoverEffect = true
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  // Filter rows based on search
  const filteredRows = searchable
    ? rows.filter((row) => {
        const searchLower = searchQuery.toLowerCase();
        return columns.some((col) => {
          const value = row[col.field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      })
    : rows;

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / currentPageSize);
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = startIndex + currentPageSize;
  const paginatedRows = pagination
    ? filteredRows.slice(startIndex, endIndex)
    : filteredRows;

  // Reset to first page when search changes
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setCurrentPageSize(newSize);
    setCurrentPage(1);
  };

  // Render cell content
  const renderCell = (row, column) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }
    return row[column.field];
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`bg-gray-50 border-b border-gray-200 ${headerClassName}`}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.headerClassName || ""
                  }`}
                  style={{
                    width: column.width || "auto",
                    textAlign: column.align || "left"
                  }}
                >
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
                    <p className="text-lg">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`${
                    hoverEffect ? "hover:bg-gray-50 transition-colors" : ""
                  } ${onRowClick ? "cursor-pointer" : ""} ${
                    rowClassName || ""
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.field}
                      className={`px-6 py-4 ${
                        column.cellClassName || cellClassName || ""
                      }`}
                      style={{
                        textAlign: column.align || "left",
                        whiteSpace: column.wrap ? "normal" : "nowrap"
                      }}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && filteredRows.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={currentPageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {startIndex + 1}-{Math.min(endIndex, filteredRows.length)} of{" "}
              {filteredRows.length}
            </span>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataTable