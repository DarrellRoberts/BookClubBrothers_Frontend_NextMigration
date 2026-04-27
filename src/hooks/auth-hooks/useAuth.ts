import {
  removeToken,
  setTokenState,
} from "@/store/lib/features/auth/tokenSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const token = useAppSelector((state) => state.token.tokenState)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const login = (newToken: string, username: string) => {
    Cookies.set("username", username, { expires: 1, path: "/" })
    Cookies.set("token", newToken, { expires: 1, path: "/" })
    dispatch(setTokenState(newToken))
    router.refresh()
  }

  const logout = (): void => {
    if (!token) return
    Cookies.remove("token", { path: "/" })
    dispatch(removeToken())
    dispatch(setTokenState(null))
  }

  const isAuth = (): void => {
    const cookieToken = Cookies.get("token")
    if (!cookieToken && !token) return

    if (cookieToken && !token) {
      dispatch(setTokenState(cookieToken))
      return
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const expiryTime = payload.exp * 1000 // convert to ms
      const currentTime = Date.now()

      if (currentTime >= expiryTime) {
        logout()
      }
    } catch (e) {
      console.error("Invalid token format")
      logout()
    }
  }

  return {
    login,
    logout,
    isAuth,
  }
}
