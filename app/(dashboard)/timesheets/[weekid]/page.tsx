"use client";

import TasksModal from "@/components/timesheets/TasksModal";
import { useEffect, useRef, useState } from "react";
import { Task, WeekData } from "@/types/timesheet";
import { getTasks } from "@/services/tasks.service";

const WEEKLY_LIMIT = 40;
const API_URL = "/api/tasks";

export default function WeeklyTimesheetPage() {
  const [data, setData] = useState<WeekData>({});
  const [weekRange, setWeekRange] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingDay, setEditingDay] = useState<string | null>(null);

  // -------- Fetch weekly data --------
  const loadTasks = async () => {
    const result = await getTasks();
    setData(result.data);
    setWeekRange(result?.weekRange);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  // -------- close menu on outside click --------
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // -------- add/edit task handler via API --------
  const handleSaveTask = async (taskData: {
    project: string;
    typeOfWork: string;
    taskDescription: string;
    hours: number;
  }) => {
    if (!editingDay) return;

    try {
      if (editingTask) {
        // Update existing task
        const res = await fetch(API_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTask.id, ...taskData }),
        });
        const updatedTask = await res.json();

        setData((prev) => ({
          ...prev,
          [editingDay]: prev[editingDay].map((t) =>
            t.id === updatedTask.id ? updatedTask : t,
          ),
        }));
      } else {
        // Add new task
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: editingDay, ...taskData }),
        });
        const newTask = await res.json();

        setData((prev) => ({
          ...prev,
          [editingDay]: [...prev[editingDay], newTask],
        }));
      }

      setModalOpen(false);
      setEditingTask(null);
      setEditingDay(null);
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  const totalHours = Object.values(data)
    .flat()
    .reduce((sum, t) => sum + t.hours, 0);
  const progress = Math.min((totalHours / WEEKLY_LIMIT) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">This week’s timesheet</h1>
          <p className="text-sm text-gray-900">{weekRange}</p>
        </div>

        <div className="flex flex-col items-center gap-1 relative">
          <span className="text-sm font-medium mb-5">
            {totalHours}/{WEEKLY_LIMIT} hrs
          </span>

          <p className="text-xs absolute right-0 bottom-2">100%</p>

          <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= DAYS ================= */}
      <div className="space-y-5">
        {Object.entries(data)?.map(([day, tasks]) => (
          <div key={day} className="flex w-full">
            <div className="w-20">
              <h3 className="text-sm font-medium text-gray-900 mb-3">{day}</h3>
            </div>

            <div className="space-y-2 w-full">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="relative flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 mb-2"
                >
                  <span className="text-sm text-gray-800">{task.project}</span>

                  <div className="flex items-center gap-4 text-sm text-gray-900">
                    <span>{task.hours} hrs</span>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                      {task.project}
                    </span>

                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === task.id ? null : task.id)
                      }
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      ⋯
                    </button>
                  </div>

                  {/* ================= MENU ================= */}
                  {openMenu === task.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-4 top-10 z-20 w-28 rounded-md border border-gray-300 bg-white shadow"
                    >
                      <button
                        onClick={() => {
                          setEditingTask(task);
                          setEditingDay(day);
                          setModalOpen(true);
                          setOpenMenu(null);
                        }}
                        className="block w-full px-3 py-2 text-left rounded-md text-sm hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            // Delete in-memory by updating state only
                            setData((prev) => ({
                              ...prev,
                              [day]: prev[day].filter((t) => t.id !== task.id),
                            }));
                            setOpenMenu(null);
                          } catch (err) {
                            console.error("Failed to delete task", err);
                          }
                        }}
                        className="block w-full px-3 py-2 text-left text-sm rounded-md text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* ================= ADD TASK ================= */}
              <button
                onClick={() => {
                  setEditingDay(day);
                  setEditingTask(null);
                  setModalOpen(true);
                }}
                className="w-full rounded-lg border border-dashed border-gray-300 py-3 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100"
              >
                + Add new task
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <TasksModal
        key={editingTask?.id ?? "new"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingTask || null}
        onSave={handleSaveTask}
      />
    </div>
  );
}
