"use client"

import { useState } from "react"
import LoginForm3D from "./LoginForm3D"
import { UiButton } from "../ui/button/UiButton"
import { UiModal } from "../ui/modal/UiModal"

const Login: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState(
    <LoginForm3D setLoginOpen={setLoginOpen} />
  )

  const showModal = () => {
    setLoginOpen(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setLoginOpen(false)
      setConfirmLoading(false)
    }, 1000)
    setModalText(<LoginForm3D setLoginOpen={setLoginOpen} />)
  }
  const handleCancel = () => {
    console.log("Clicked cancel button")
    setLoginOpen(false)
  }
  return (
    <>
      <div className="flex items-center m-5">
        <UiButton ghost clickHandler={showModal} textContent={"Login"} />
      </div>
      <UiModal
        title={"Login"}
        open={loginOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <div>{modalText}</div>
      </UiModal>
    </>
  )
}

export default Login
