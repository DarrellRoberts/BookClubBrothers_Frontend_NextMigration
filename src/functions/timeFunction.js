import { getDate } from "./dateFunction";

const dateTimeString = getDate();

function getTime() {
const [datePart, timePart] = dateTimeString.split(", ");
const date = datePart;
date;
const time = timePart;
const [hourPart, minPart] = time.split(": ");
const min = minPart;
min;
const hour = hourPart;
const hourNum = parseInt(hour, 10);
if (hourNum > 4 && hourNum < 12) {
  return "Good Morning"
} else if (hourNum > 12 && hourNum < 17) {
  return "Good Afternoon"
} else if (hourNum > 17 && hourNum < 22) {
  return "Good Evening"
} else if (hourNum > 22 || hourNum < 4){
  return "It's quite late,"
} else {
  return "Howdy"
}
}

export { getTime }