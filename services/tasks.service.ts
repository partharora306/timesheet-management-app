import { Task, TaskModalData, TasksResponse } from "@/types/timesheet";

const API_URL = "/api/tasks";

export async function getTasks(): Promise<TasksResponse> {
  const res = await fetch("/api/tasks");
  return res.json();
}

export async function createTask(
  date: string,
  data: TaskModalData,
): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      title: data.typeOfWork,
      hours: data.hours,
      project: data.project,
      typeOfWork: data.typeOfWork,
      taskDescription: data.taskDescription,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}

export async function updateTask(
  taskId: string,
  data: TaskModalData,
): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: taskId,
      title: data.typeOfWork,
      hours: data.hours,
      project: data.project,
      typeOfWork: data.typeOfWork,
      taskDescription: data.taskDescription,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json();
}
