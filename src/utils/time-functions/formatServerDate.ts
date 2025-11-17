export const formatServerDate = (serverString: string): string | null => {
  if (serverString && typeof serverString === "string") {
    const date = new Date(serverString)
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${formattedDate}, ${formattedTime}`
  } else {
    return null
  }
}
