"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { UiButton } from "../ui/button/UiButton"

const Logout: React.FC = () => {
  const [loadings, setLoadings] = useState(false)

  const { logout } = useAuth()

  const handleClick = () => {
    setLoadings(true)
    setTimeout(() => {
      setLoadings(false)
      logout()
    }, 1000)
  }
  return (
    <div className="flex items-center m-5">
      <UiButton
        ghost
        clickHandler={handleClick}
        loading={loadings}
        textContent={"Logout"}
        htmlType="submit"
      />
    </div>
  )
}

export default Logout
