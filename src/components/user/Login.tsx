"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import { UiButton } from "../ui/button/UiButton"
import { UiModal } from "../ui/modal/UiModal"

const Login: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState(
    <LoginForm setLoginOpen={setLoginOpen} />
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
    setModalText(<LoginForm setLoginOpen={setLoginOpen} />)
  }
  const handleCancel = () => {
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
