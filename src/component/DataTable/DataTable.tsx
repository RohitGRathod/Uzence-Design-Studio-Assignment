import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Row selection
  const handleSelect = (index: number) => {
    if (!selectable) return;
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
    if (onRowSelect) {
      onRowSelect(Array.from(updated).map((i) => sortedData[i]));
    }
  };

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSortConfig((prev) => ({
      key: col.dataIndex,
      direction:
        prev.key === col.dataIndex && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <table className="w-full border border-gray-300 rounded-md overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className={`p-2 text-left font-medium cursor-${
                col.sortable ? "pointer" : "default"
              }`}
              onClick={() => toggleSort(col)}
            >
              {col.title}
              {sortConfig.key === col.dataIndex &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className={`border-t ${
              selectedRows.has(idx) ? "bg-blue-50" : ""
            }`}
          >
            {selectable && (
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.has(idx)}
                  onChange={() => handleSelect(idx)}
                  aria-label="Select row"
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
