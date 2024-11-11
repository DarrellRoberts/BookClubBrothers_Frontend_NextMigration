// use date string as argument
const dateFormatter = (dateValue) => {
  const newDate = String(new Date(dateValue)).split("00:")[0].trim();
  const newDateFormat = `${newDate.split(" ")[0]} ${newDate.split(" ")[2]} ${
    newDate.split(" ")[1]
  } ${newDate.split(" ")[3]}`;

  return newDateFormat;
};

export { dateFormatter };
