import { useAppSelector } from "@/store/lib/hooks"
import { useEffect, useState } from "react"

export const useDecodedJwt = () => {
  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState(null)
  const [profileURL, setProfileURL] = useState("")
  const token = useAppSelector((state) => state.token.tokenState)

  useEffect(() => {
    if (!token) {
      setUsername("")
      setUserId(null)
      setProfileURL("")
      return
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      setUsername(payload.username)
      setUserId(payload._id)
      setProfileURL(payload.profileURL)
    } catch (error) {
      console.error("Error decoding token")
    }
  }, [token])

  return { username, userId, profileURL }
}
