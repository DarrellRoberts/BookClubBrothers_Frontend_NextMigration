"use client"

import { Button } from "antd"
import { useState } from "react"

const Logout3D: React.FC = () => {
  const [loadings, setLoadings] = useState([])

  const handleClick = () => {
    setLoadings([true])
    setTimeout(() => {
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      setLoadings([false])
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

export default Logout3D
