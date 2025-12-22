import { ConfigProvider, Button } from "antd"
import Link from "next/link"
import React from "react"

type Props = {
  bgColor?: string
  textColor?: string
  hoverBgColor?: string
  type?: "link" | "text" | "default" | "primary" | "dashed"
  textContent: string
  isLink?: boolean
  href?: string
  clickHandler?: () => void
  loading?: boolean
  ghost?: boolean
  htmlType?: "button" | "submit" | "reset"
}

export const UiButton = ({
  bgColor = "#000000",
  textColor = "#EEEEE6",
  hoverBgColor = "#095d09",
  type = "primary",
  textContent,
  isLink = false,
  href,
  clickHandler,
  loading = false,
  ghost = false,
  htmlType,
}: Props) => {
  const buttonType = type === "default" || type === "dashed" ? "primary" : type

  const buttonTheme = {
    components: {
      Button: {
        colorPrimary: bgColor,
        colorText: textColor,

        colorPrimaryHover: hoverBgColor,
        colorBorder: bgColor,
        colorBorderHover: hoverBgColor,

        colorTextLightSolid: textColor,
        colorTextHover: textColor,
      },
    },
  }
  return ghost ? (
    <Button
      ghost
      size="large"
      onClick={clickHandler}
      loading={loading}
      htmlType={htmlType}
    >
      {textContent}
    </Button>
  ) : isLink ? (
    <Link href={href}>
      <ConfigProvider theme={buttonTheme}>
        <Button size="large" type={buttonType}>
          {textContent}
        </Button>
      </ConfigProvider>
    </Link>
  ) : (
    <ConfigProvider theme={buttonTheme}>
      <Button
        size="large"
        type={buttonType}
        onClick={clickHandler}
        loading={loading}
        htmlType={htmlType}
      >
        {textContent}
      </Button>
    </ConfigProvider>
  )
}
