"use client"

import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { setIsRefresh } from "@/store/lib/features/auth/editButtonsSlice"

const useForm = (url: string, reqType: string, customData?: object) => {
  const [loadings, setLoadings] = useState(false)
  const [error, setError] = useState<any>()

  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const token = useAppSelector((state) => state.token.tokenState)
  const formData =
    customData ?? useAppSelector((state) => state.bookFormData.formData)

  const listQueryKeys: string[][] = [
    ["bookData"],
    ["singleUserData"],
    ["userData"],
    ["unreadBookData"],
  ]

  const handleSubmit = async () => {
    try {
      setError(null)
      const response = await fetch(url, {
        method: reqType,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: reqType === "DELETE" ? null : JSON.stringify(formData),
      })
      const data = await response.json()
      queryClient.invalidateQueries({
        queryKey: ["bookData", "singleUserData", "userData", "unreadBookData"],
      })
      if (!response.ok) {
        setError(data)
      }

      if (response.ok) {
        listQueryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: queryKey })
        })
        return
      }
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  const enterLoading = () => {
    setLoadings(true)
    dispatch(setIsRefresh(true))
    setTimeout(() => {
      setLoadings(false)
      dispatch(setIsRefresh(false))
    }, 4000)
  }

  return { handleSubmit, error, enterLoading, loadings, setError }
}

export default useForm
