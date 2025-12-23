import { ConfigProvider } from "antd"
import React from "react"

type Props = {
  children: React.ReactNode
}

export const InputConfigWrapper = ({ children }: Props) => {
  const inputTheme = {
    components: {
      Input: {
        colorText: "black",
      },
      Select: {
        colorText: "black",
        colorBgBase: "black",
        colorBorder: "black",
        colorIcon: "red",
      },
      DatePicker: {
        colorText: "black",
      },
    },
  }
  return <ConfigProvider theme={inputTheme}>{children}</ConfigProvider>
}
