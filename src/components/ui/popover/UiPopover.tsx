import { ConfigProvider, Popover } from "antd"
import React from "react"

type Props = {
  children: React.ReactNode
  popContent: React.ReactNode
  popTitle: string | React.ReactNode
}

export const UiPopover = ({ children, popTitle, popContent }: Props) => {
  const popoverTheme = {
    components: {
      Popover: {
        colorBgElevated: "#095d09",
        fontFamily: "Gentium Book Plus",
      },
    },
  }
  return (
    <ConfigProvider theme={popoverTheme}>
      <Popover title={popTitle} content={popContent}>
        {children}
      </Popover>
    </ConfigProvider>
  )
}
