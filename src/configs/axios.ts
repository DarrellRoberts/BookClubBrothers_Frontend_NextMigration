import axios from "axios"
import Cookies from "js-cookie"

axios.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? Cookies.get("token") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axios
