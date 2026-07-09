import { Timesheet } from "@/types/timesheet";

export async function getTimesheets(): Promise<Timesheet[]> {
  const res = await fetch("/api/timesheets");
  return res.json();
}

export async function createTimesheet(data: { week: number; date: string }) {
  const res = await fetch("/api/timesheets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateTimesheet(data: Timesheet) {
  const res = await fetch("/api/timesheets", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
