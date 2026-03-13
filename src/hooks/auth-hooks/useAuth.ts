import {
  removeToken,
  setTokenState,
} from "@/store/lib/features/auth/tokenSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { useEffect } from "react"
import { useJwt } from "react-jwt"
import { type Jwt } from "@/types/Jwt"
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

  const decodedToken = useJwt<Jwt>(token)

  const logout = (): void => {
    Cookies.remove("token", { path: "/" })
    dispatch(removeToken())
    dispatch(setTokenState(null))
    router.refresh()
  }

  const handleExpired = (): void => {
    if (!token) return
    if (decodedToken.decodedToken === null) return
    if (!decodedToken.isExpired) return
    logout()
  }

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    if (!cookieToken) return
    dispatch(setTokenState(cookieToken))
    handleExpired()
  }, [token, dispatch, handleExpired])

  return { login, logout, handleExpired, ...decodedToken }
}
