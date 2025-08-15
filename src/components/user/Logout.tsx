"use client"

import { Button } from "antd"
import { useState } from "react"
import { useAuth } from "@/hooks/auth-hooks/useAuth"

const Logout: React.FC = () => {
  const [loadings, setLoadings] = useState([])

  const { logout } = useAuth()

  const handleClick = () => {
    setLoadings([true])
    setTimeout(() => {
      localStorage.removeItem("username")
      setLoadings([false])
      logout()
    }, 3000)
  }
  return (
    <>
      <div className="flex items-center">
        <Button
          className="m-5"
          type="primary"
          ghost
          htmlType="submit"
          loading={loadings[0]}
          onClick={handleClick}
        >
          Logout
        </Button>
      </div>
    </>
  )
}

export default Logout
