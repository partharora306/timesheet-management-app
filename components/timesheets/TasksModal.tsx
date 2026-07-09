"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import { TaskModalData } from "@/types/timesheet";

export default function TasksModal({
  open,
  onClose,
  onSave,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: TaskModalData) => void;
  initialData?: Partial<TaskModalData> | null;
}) {
  const emptyForm = {
    project: "",
    typeOfWork: "",
    taskDescription: "",
    hours: 0,
  };

  const [form, setForm] = useState<TaskModalData>(() =>
    initialData
      ? {
          project: initialData.project ?? "",
          typeOfWork: initialData.typeOfWork ?? "",
          taskDescription: initialData.taskDescription ?? "",
          hours: initialData.hours ?? 0,
        }
      : emptyForm,
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskModalData, string>>
  >({});

  if (!open) return null;

  const update = <K extends keyof TaskModalData>(key: K, value: TaskModalData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof TaskModalData, string>> = {};
    if (!form.project) newErrors.project = "Project is required";
    if (!form.typeOfWork) newErrors.typeOfWork = "Type of Work is required";
    if (!form.taskDescription)
      newErrors.taskDescription = "Task Description is required";
    if (form.hours <= 0) newErrors.hours = "Hours must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEntry = () => {
    if (!validate()) return; // Stop if validation fails
    onSave(form);
    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-11/12 md:w-full max-w-lg rounded-lg bg-white p-4 space-y-6 border border-gray-300">
        <div className="w-full flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-xl font-semibold">Add new Entry</h3>
          <MdClose
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-600"
          />
        </div>

        <div className="space-y-3 flex flex-col items-start">
          {/* Project */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Project *
            </label>
            <div className="relative mt-1 w-80">
              <select
                value={form.project}
                onChange={(e) => update("project", e.target.value)}
                className={`w-full rounded-md border px-3 py-2 text-sm appearance-none pr-8 focus:outline-none focus:ring-1 ${
                  errors.project
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                }`}
              >
                <option value="">Select Project *</option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
                <option value="Project C">Project C</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {errors.project && (
              <p className="text-xs text-red-500">{errors.project}</p>
            )}
          </div>

          {/* Type of Work */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Type of Work *
            </label>
            <div className="relative mt-1 w-80">
              <select
                value={form.typeOfWork}
                onChange={(e) => update("typeOfWork", e.target.value)}
                className={`w-full rounded-md border px-3 py-2 text-sm appearance-none pr-8 focus:outline-none focus:ring-1 ${
                  errors.typeOfWork
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                }`}
              >
                <option value="">Type of Work *</option>
                <option value="Bug Fixes">Bug Fixes</option>
                <option value="Feature Development">Feature Development</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.typeOfWork && (
              <p className="text-xs text-red-500">{errors.typeOfWork}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Task Description *
            </label>
            <div className="space-y-1 mt-1 w-92">
              <textarea
                value={form.taskDescription}
                onChange={(e) => update("taskDescription", e.target.value)}
                className={`w-full rounded-md border px-3 py-3 text-sm min-h-30 resize-none ${
                  errors.taskDescription
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Task Description"
              />
              <p className="text-xs text-gray-500">a note for extra info</p>
            </div>
            {errors.taskDescription && (
              <p className="text-xs text-red-500">{errors.taskDescription}</p>
            )}
          </div>

          {/* Hours */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700">
              Select Project *
            </label>
            <div className="flex items-center mt-1 justify-center">
              <button
                className="rounded-l-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => update("hours", Math.max(0, form.hours - 1))}
              >
                −
              </button>
              <span className="w-16 text-center text-sm font-medium border-t border-b border-gray-300 py-2">
                {form.hours}
              </span>
              <button
                onClick={() => update("hours", form.hours + 1)}
                className="rounded-r-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
              >
                +
              </button>
            </div>
            {errors.hours && (
              <p className="text-xs text-red-500 mt-1">{errors.hours}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-2 border-t border-gray-200 pt-4">
          <button
            onClick={handleAddEntry}
            className="w-1/2 rounded-md bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add Entry
          </button>
          <button
            onClick={onClose}
            className="w-1/2 rounded-md border border-gray-300 px-5 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
