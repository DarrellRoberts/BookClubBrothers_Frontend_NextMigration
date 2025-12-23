import { ConfigProvider, Input } from "antd"
import React from "react"

type Props<T> = {
  handleChange: (e: any) => void
  defaultValue?: T
  value: T
  type: string
}
export const UiInput = ({
  handleChange,
  defaultValue,
  value,
  type,
}: Props<string | number>) => {
  const inputTheme = {
    components: {
      Input: {
        colorText: "black",
      },
    },
  }
  return (
    <ConfigProvider theme={inputTheme}>
      <Input
        type={type}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
      />
    </ConfigProvider>
  )
}
