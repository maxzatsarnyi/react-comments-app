// return date in format year-month-day from number value
export function getDate(value: number): string {
  const date = new Date(value);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}-${month + 1}-${day}`;
}
