import { NextResponse } from "next/server";
import { Timesheet } from "@/types/timesheet";

let timesheets: Timesheet[] = [
  {
    id: "1",
    week: 1,
    date: "2024-01-01",
    endDate: "2024-01-05",
    status: "completed",
  },
  {
    id: "2",
    week: 2,
    date: "2024-01-08",
    endDate: "2024-01-12",
    status: "incomplete",
  },
  {
    id: "3",
    week: 3,
    date: "2024-01-15",
    endDate: "2024-01-19",
    status: "missing",
  },
];

export async function GET() {
  return NextResponse.json(timesheets);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newEntry: Timesheet = {
    id: Date.now().toString(),
    week: body.week,
    date: body.date,
    endDate: body.endDate,
    status: body.status || "incomplete",
  };

  timesheets.unshift(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();

  timesheets = timesheets.map((item) =>
    item.id === body.id ? { ...item, ...body } : item
  );

  return NextResponse.json({ success: true });
}