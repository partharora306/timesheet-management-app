import { NextResponse } from "next/server";
import { Task, WeekData } from "@/types/timesheet";

const WEEK_RANGE = "21 – 26 January, 2024";
const WEEKLY_LIMIT = 40;

// In-memory mock data (mutable)
const weeklydata: WeekData = {
  "Jan 21": [
    { id: "1", title: "Homepage Development", hours: 4, project: "Project A" },
    { id: "2", title: "Homepage Development", hours: 2, project: "Project B" },
  ],
  "Jan 22": [
    { id: "3", title: "Homepage Development", hours: 2, project: "Project A" },
    { id: "4", title: "Homepage Development", hours: 4, project: "Project B" },
    { id: "5", title: "Homepage Development", hours: 4, project: "Project C" },
  ],
  "Jan 23": [
    { id: "6", title: "Homepage Development", hours: 4, project: "Project A" },
    { id: "7", title: "Homepage Development", hours: 4, project: "Project B" },
    { id: "8", title: "Homepage Development", hours: 4, project: "Project C" },
  ],
  "Jan 24": [
    { id: "9", title: "Homepage Development", hours: 1, project: "Project A" },
    { id: "10", title: "Homepage Development", hours: 1, project: "Project B" },
    { id: "11", title: "Homepage Development", hours: 2, project: "Project C" },
  ],
  "Jan 25": [],
};

// ================= GET =================
export async function GET() {
  return NextResponse.json({
    weekRange: WEEK_RANGE,
    weeklyLimit: WEEKLY_LIMIT,
    data: weeklydata,
  });
}

// ================= POST =================
export async function POST(req: Request) {
  const body = await req.json();

  const { date, title, hours, project, typeOfWork, taskDescription } = body;

  if (!weeklydata[date]) {
    return NextResponse.json(
      { error: "Invalid date" },
      { status: 400 },
    );
  }

  const newEntry: Task = {
    id: Date.now().toString(),
    title,
    hours,
    project,
    typeOfWork,
    taskDescription,
  };

  weeklydata[date].push(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}

// ================= PUT =================
export async function PUT(req: Request) {
  const body = await req.json();

  for (const date in weeklydata) {
    const taskIndex = weeklydata[date].findIndex(
      (task) => task.id === body.id,
    );

    if (taskIndex !== -1) {
      weeklydata[date][taskIndex] = {
        ...weeklydata[date][taskIndex],
        ...body,
      };

      return NextResponse.json(weeklydata[date][taskIndex]);
    }
  }

  return NextResponse.json(
    { error: "Task not found" },
    { status: 404 },
  );
}