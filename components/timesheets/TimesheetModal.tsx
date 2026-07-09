"use client";

import { Timesheet } from "@/types/timesheet";
import { useState, useEffect } from "react";

export default function TimesheetModal({
  open,
  onClose,
  onSave,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    week: number;
    date: string;
    endDate: string;
    status: string;
  }) => void;
  initialData?: Timesheet | null;
}) {
  const [week, setWeek] = useState<number>(0);
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<"week" | "date" | "endDate" | "status", string>>
  >({});

  useEffect(() => {
    queueMicrotask(() => {
      if (initialData) {
        setWeek(initialData.week);
        setDate(initialData.date);
        setEndDate(initialData.endDate);
        setStatus(initialData.status);
      } else {
        setWeek(0);
        setDate("");
        setEndDate("");
        setStatus("");
      }
      setErrors({});
    });
  }, [initialData]);

  if (!open) return null;

  const validate = () => {
    const newErrors: Partial<
      Record<"week" | "date" | "endDate" | "status", string>
    > = {};
    if (!week || week <= 0)
      newErrors.week = "Week number is required and must be greater than 0";
    if (!date) newErrors.date = "Start Date is required";
    if (!endDate) newErrors.endDate = "End Date is required";
    if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return; // Stop if validation fails
    onSave({ week, date, endDate, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">
          {initialData ? "Edit Timesheet" : "Add Timesheet"}
        </h3>

        <div className="space-y-4">
          {/* Week */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Week Number *
            </label>
            <input
              type="number"
              placeholder="Enter week number"
              value={week}
              onChange={(e) => {
                setWeek(Number(e.target.value));
                setErrors((prev) => ({ ...prev, week: "" }));
              }}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                errors.week
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {errors.week && (
              <p className="text-xs text-red-500">{errors.week}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Start Date *
            </label>
            <input
              type="date"
              placeholder="Select start date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: "" }));
              }}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                errors.date
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              End Date *
            </label>
            <input
              type="date"
              placeholder="Select end date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setErrors((prev) => ({ ...prev, endDate: "" }));
              }}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                errors.endDate
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {errors.endDate && (
              <p className="text-xs text-red-500">{errors.endDate}</p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Status *
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setErrors((prev) => ({ ...prev, status: "" }));
                }}
                className={`w-full rounded-md border px-3 py-2 text-sm appearance-none pr-8 focus:outline-none focus:ring-1 ${
                  errors.status
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                }`}
              >
                <option value="">Select Status *</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                <option value="missing">Missing</option>
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
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
