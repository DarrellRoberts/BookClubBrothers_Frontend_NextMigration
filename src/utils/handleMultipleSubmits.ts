export const handleMultipleSubmits = async (url, value, reqType, token) => {
  try {
    const response = await fetch(url, {
      method: reqType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: reqType === "DELETE" ? null : JSON.stringify(value),
    })
    const data = await response.json()
    if (!response.ok) {
      console.log("something has happened")
      console.log(data)
    }
    if (response.ok) {
      console.log("success")
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
