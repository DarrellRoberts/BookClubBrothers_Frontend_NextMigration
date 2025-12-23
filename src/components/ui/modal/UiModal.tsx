import { ConfigProvider, Modal } from "antd"
import React from "react"

type Props = {
  title: string
  open: boolean
  handleOk?: () => void
  handleCancel?: () => void
  confirmLoading?: boolean
  children: React.ReactNode
  bgColor?: string
  textColor?: string
}

export const UiModal = ({
  title,
  open,
  handleOk,
  handleCancel,
  confirmLoading,
  children,
  bgColor = "#095d09",
  textColor = "#EEEEE6",
}: Props) => {
  const modalTheme = {
    components: {
      Modal: {
        contentBg: bgColor,
        colorText: textColor,
      },
    },
  }
  return (
    <ConfigProvider theme={modalTheme}>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={null}
      >
        {children}
      </Modal>
    </ConfigProvider>
  )
}
