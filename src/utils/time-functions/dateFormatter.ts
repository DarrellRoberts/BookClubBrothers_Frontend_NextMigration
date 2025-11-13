export const dateFormatter = (dateValue: string): string => {
  if (typeof dateValue !== "string") return "Invalid date value"
  const newDate = String(new Date(dateValue)).split("00:")[0].trim()
  const newDateFormat = `${newDate.split(" ")[0]} ${newDate.split(" ")[2]} ${
    newDate.split(" ")[1]
  } ${newDate.split(" ")[3]}`

  return newDateFormat
}
