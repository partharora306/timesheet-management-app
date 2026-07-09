export type TimesheetStatus = "incomplete" | "completed" | "missing";

export interface Timesheet {
  id: string;
  week: number;
  date: string;
  endDate: string;
  status: TimesheetStatus;
}

export type Task = {
  id: string;
  title: string;
  hours: number;
  project: string;
  typeOfWork?: string;
  taskDescription?: string;
};

export type TaskModalData = {
  project: string;
  typeOfWork: string;
  taskDescription: string;
  hours: number;
};

export type WeekData = Record<string, Task[]>;

export type TasksResponse = {
  weekRange: string;
  weeklyLimit: number;
  data: WeekData;
};