"use client"

import React, { createContext, useContext, useMemo } from "react"
import { notification } from "antd"
import { NotificationInstance } from "antd/es/notification/interface"

type NotificationType = "success" | "info" | "warning" | "error"

const NotificationContext = createContext<NotificationInstance | null>(null)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [api, contextHolder] = notification.useNotification()

  const value = useMemo(() => api, [api])

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    )
  }

  const toast = (type: NotificationType, toastObject) => {
    const isError = type === "error"

    context[type]({
      title: isError ? toastObject.error.title : toastObject.success.title,
      description: isError
        ? toastObject.error.description
        : toastObject.success.description,
      style: {
        background: isError ? "#B01419" : "var(--tertiaryColor)",
        fontWeight: 600,
        color: "#fff",
      },
    })
  }
  return toast
}
