import { config } from "@/configs/config"

export const handleLogout = async (token) => {
  try {
    const response = await fetch(`${config.API_URL}/users/logout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)

    const data = await response.json()

    console.log(data)

    if (!response.ok) {
      console.error(data.error)
    }
  } catch (err) {
    console.error(err)
  }
}
