// use date string as argument
const dateFormatter = (dateValue) => {
  const dateString = dateValue?.split("T")[0];
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthsOfYear[date.getMonth()];
  const dayName = daysOfWeek[date.getDay()];
  const year = date.getUTCFullYear();
  const day = date.getUTCDate().toString().padStart(2, "0");
  const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
  return formattedDate;
};

export { dateFormatter };
