export function formatDateRange(start: string | Date, end: string | Date) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const month = startDate.toLocaleString("default", { month: "long" });
  const year = startDate.getFullYear();

  // If start and end are in the same month & year
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDay} - ${endDay} ${month}, ${year}`;
  }

  // If month or year is different
  const endMonth = endDate.toLocaleString("default", { month: "long" });
  const endYear = endDate.getFullYear();
  return `${startDay} ${month}, ${year} - ${endDay} ${endMonth}, ${endYear}`;
}