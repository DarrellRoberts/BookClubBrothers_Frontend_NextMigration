export const getTime = (): string => {
  const hourNum = parseInt(
    new Date().toString().split(" ")[4].split(":")[0],
    10
  )
  if (hourNum >= 4 && hourNum < 12) {
    return "Good Morning"
  } else if (hourNum >= 12 && hourNum < 17) {
    return "Good Afternoon"
  } else if (hourNum >= 17 && hourNum < 22) {
    return "Good Evening"
  } else if (hourNum >= 22 || hourNum < 4) {
    return "It's quite late,"
  } else {
    return "Howdy"
  }
}
