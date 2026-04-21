import { ConfigProvider } from "antd"
import React from "react"

type Props = {
  children: React.ReactNode
  labelColor?: string
}

export const InputConfigWrapper = ({
  children,
  labelColor = "#FFFFFF",
}: Props) => {
  const inputTheme = {
    components: {
      InputNumber: {
        colorText: "black",
      },
      Input: {
        colorText: "black",
      },
      Form: {
        labelColor: labelColor,
      },
      Select: {
        colorText: "black",
        colorHoverText: "red",
        colorIcon: "red",
        optionActiveBg: "#cecece",
        colorTextPlaceholder: "#919191",
        colorIconHover: "#000000",
      },
      DatePicker: {
        colorText: "white",
        colorBgElevated: "#095d09",
        activeBorderColor: "black",
        colorBgContainer: "black",
        cellHoverBg: "black",
      },
    },
  }
  return <ConfigProvider theme={inputTheme}>{children}</ConfigProvider>
}
