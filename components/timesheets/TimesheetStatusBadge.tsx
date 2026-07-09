import { TimesheetStatus } from "@/types/timesheet";

const statusStyles: Record<TimesheetStatus, string> = {
  completed: "bg-green-100 text-green-700",
  incomplete: "bg-yellow-100 text-yellow-700",
  missing: "bg-red-100 text-red-700",
};

export default function TimesheetStatusBadge({
  status,
}: {
  status: TimesheetStatus;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}