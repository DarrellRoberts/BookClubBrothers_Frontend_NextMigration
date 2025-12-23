"use client"

import { useState } from "react"
import { UiButton } from "../ui/button/UiButton"

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
      <div className="flex items-center m-5">
        <UiButton
          ghost
          clickHandler={handleClick}
          loading={loadings[0]}
          textContent={"Logout"}
          htmlType="submit"
        />
      </div>
    </>
  )
}

export default Logout3D
