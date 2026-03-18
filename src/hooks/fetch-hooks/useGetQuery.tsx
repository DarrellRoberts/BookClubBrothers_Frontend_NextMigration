import { useNotification } from "@/context/NotificationProvider"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { TIME_MILLISECONDS } from "../timeVars"

const fetchData = async <T,>(apiPath: string, params: Params) => {
  const response = await axios.get(apiPath, { params })
  return response.data
}

type ApiResponse<T> = T

interface Params {
  id?: string
  title?: string
  username?: string
  limit?: number
}

interface UseGetQuery {
  apiPath: string
  queryKey: string[]
  params?: Params
  staleTime?: number
  enabled?: boolean
}

export const useGetQuery = <T,>({
  queryKey,
  apiPath,
  params = {},
  staleTime = TIME_MILLISECONDS.FIVE_MINUTES,
  enabled,
}: UseGetQuery) => {
  const { data, isLoading, isError, error } = useQuery<ApiResponse<T>, Error>({
    queryKey: [...queryKey, params],
    queryFn: () => fetchData<T>(apiPath, params),
    staleTime,
    enabled,
  })

  const toast = useNotification()

  useEffect(() => {
    if (isError) {
      let errorMessage = "Error occurred when fetching data"

      if (error && axios.isAxiosError(error)) {
        const errorData = error.response?.data
        errorMessage = errorData?.message || errorData
      } else if (error) {
        // Fallback for non-Axios errors
        errorMessage = error.message
      }
      const toastObject = {
        title: errorMessage,
        description: "Refresh and if problem persists, let me know",
      }

      toast("error", toastObject)
    }
  }, [isError, error])

  return { data, isLoading, error, isError }
}
