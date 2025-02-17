export const getTime = () => {
  const time = new Date().toString().split(" ")[4];
  const hours = time.split(":")[0];
  const hourNum = parseInt(hours, 10);
  if (hourNum > 4 && hourNum < 12) {
    return "Good Morning";
  } else if (hourNum > 12 && hourNum < 17) {
    return "Good Afternoon";
  } else if (hourNum > 17 && hourNum < 22) {
    return "Good Evening";
  } else if (hourNum > 22 || hourNum < 4) {
    return "It's quite late,";
  } else {
    return "Howdy";
  }
};