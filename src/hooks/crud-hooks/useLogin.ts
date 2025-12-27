import { type SetStateAction, useState } from "react"
import { config } from "@/configs/config"

type Props = {
  username: string
  password: string
  setLoginOpen: React.Dispatch<SetStateAction<boolean>>
}

export const useLogin = ({ username, password, setLoginOpen }: Props) => {
  const [error, setError] = useState(null)

  const loginUser = async (): Promise<any> => {
    try {
      setError(null)
      const response = await fetch(`${config.API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      }
      return data
    } catch (err) {
      setError(err)
      console.log(error)
    }
  }
  return { loginUser, error }
}
