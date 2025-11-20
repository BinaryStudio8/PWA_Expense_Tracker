import { MONTHS } from "@/types";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatTimestamp(date: Date): string {
  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  const day = pad(date.getDate());
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${pad(hour12)}:${minutes} ${period}, ${day} ${month} ${year}`;
}
