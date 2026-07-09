"use client";

import { Timesheet } from "@/types/timesheet";
import TimesheetStatusBadge from "./TimesheetStatusBadge";

export default function TimesheetTable({
  data,
  onEdit,
}: {
  data: Timesheet[];
  onEdit: (item: Timesheet) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3">Week #</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">{item.week}</td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3">
                <TimesheetStatusBadge status={item.status} />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(item)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-500"
              >
                No timesheets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}