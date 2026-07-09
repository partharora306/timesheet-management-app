"use client";

import { useEffect, useState } from "react";
import { Timesheet } from "@/types/timesheet";
import {
  getTimesheets,
  createTimesheet,
  updateTimesheet,
} from "@/services/timesheets.service";
import TimesheetModal from "@/components/timesheets/TimesheetModal";
import { formatDateRange } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type SortConfig = {
  key: "week" | "date" | "status";
  direction: "asc" | "desc";
};

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Timesheet | null>(null);

  const [filterDate, setFilterDate] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const loadTimesheets = async () => {
    setLoading(true);
    const data = await getTimesheets();
    setTimesheets(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTimesheets();
  }, []);

  const handleSave = async (data: { week: number; date: string }) => {
    if (editing) {
      await updateTimesheet({ ...editing, ...data });
    } else {
      await createTimesheet(data);
    }
    await loadTimesheets();
  };

  // ---------------- Filters ----------------
  const monthMap: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const filtered = timesheets.filter((t) => {
    const statusMatch =
      filterStatus === "all" || t.status.toLowerCase() === filterStatus;

    let dateMatch = true;
    if (filterDate !== "all") {
      const start = new Date(t.date);
      const end = new Date(t.endDate);

      const monthIndex = monthMap[filterDate];
      if (monthIndex !== undefined) {
        dateMatch =
          start.getMonth() === monthIndex || end.getMonth() === monthIndex;
      }
    }

    return statusMatch && dateMatch;
  });

  // ---------------- Sorting ----------------
  if (sortConfig) {
    filtered.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (sortConfig.key === "week") {
        aValue = a.week;
        bValue = b.week;
      } else if (sortConfig.key === "date") {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else if (sortConfig.key === "status") {
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    incomplete: "bg-yellow-100 text-yellow-800",
    missing: "bg-pink-100 text-pink-800",
  };

  const handleActionClick = (t: Timesheet) => {
    setEditing(t.status.toLowerCase() === "missing" ? null : t);
    if (t.status.toLowerCase() === "completed") {
      router.push(`/timesheets/${t.week}`);
    } else {
      setModalOpen(true);
    }
  };

  const handleSort = (key: "week" | "date" | "status") => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: "week" | "date" | "status") => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />;
    }

    return sortConfig.direction === "asc" ? (
      <FaArrowUp className="inline ml-1 w-3 h-3" />
    ) : (
      <FaArrowDown className="inline ml-1 w-3 h-3" />
    );
  };

  return (
    <div className="space-y-6 mt-10 p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Timesheets</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="rounded border border-gray-300 px-3 py-1 text-sm cursor-pointer"
        >
          <option value="all">Date Range</option>
          {Object.keys(monthMap).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border border-gray-300 px-3 py-1 text-sm cursor-pointer"
        >
          <option value="all">Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading timesheets...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("week")}
                >
                  WEEK # {renderSortIcon("week")}
                </th>
                <th
                  className="px-6 py-3 text-left font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  DATE {renderSortIcon("date")}
                </th>
                <th
                  className="px-6 py-3 text-left font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  STATUS {renderSortIcon("status")}
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.map((t) => (
                <tr key={t.week}>
                  <td className="px-6 py-4">{t.week}</td>
                  <td className="px-6 py-4">
                    {formatDateRange(t.date, t.endDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold uppercase ${statusColors[t.status.toLowerCase()]}`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleActionClick(t)}
                  >
                    {t.status.toLowerCase() === "completed"
                      ? "View"
                      : t.status.toLowerCase() === "incomplete"
                        ? "Update"
                        : "Create"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <select
          value={pageSize}
          className="rounded border border-gray-300 px-3 py-1 cursor-pointer"
          onChange={() => {}}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
        </select>

        <div className="flex gap-1 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 cursor-pointer hover:shadow-sm"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-2 py-1 rounded border border-gray-300 ${
                page === i + 1 ? "bg-white rounded-lg text-gray-700" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 cursor-pointer hover:shadow-sm"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <TimesheetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
}
