import { useNotification } from "@/context/NotificationProvider"
import { HttpMethod } from "@/types/Api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import axios from "@/configs/axios"

type DataMutationOptions<TResponse, TData> = {
  method?: HttpMethod
  toastObject: ToastObject
  onSuccessCallback: (data: TResponse) => void
  queryKeyToInvalidate?: (string | number)[]
} & (
  | {
      apiPath: string
      mutationFn?: never
    }
  | {
      mutationFn: (data: TData) => Promise<TResponse>
      apiPath?: never
    }
)

const mutateData = async <TData, TResponse>(
  apiPath: string,
  method: HttpMethod,
  data: TData,
): Promise<TResponse> => {
  const token = Cookies.get("token")

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
  if (method === "delete") {
    const response = await axios.delete(apiPath, config)
    return response.data
  }
  const response = await axios[method](apiPath, data, config)
  return response.data
}

/**
 * @param TData The type of the payload sent to the API
 * @param TResponse The type of the data expected in the API response
 * @param TError The type of the error object
 */

export const useMutationQuery = <
  TData,
  TResponse,
  TError = AxiosError<{
    error: string
    message?: string
  }>,
>({
  apiPath,
  method = "post",
  toastObject,
  onSuccessCallback,
  queryKeyToInvalidate,
  mutationFn,
}: DataMutationOptions<TResponse, TData>) => {
  const toast = useNotification()
  const queryClient = useQueryClient()

  return useMutation<TResponse, TError, TData>({
    mutationFn: (data: TData) => {
      if (mutationFn) {
        return mutationFn(data)
      }
      return mutateData(apiPath, method, data)
    },

    onSuccess: (responseData) => {
      toast("success", toastObject)

      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
      }

      if (onSuccessCallback) {
        onSuccessCallback(responseData)
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error)
      }
      toast("error", toastObject)
    },
  })
}

export default useMutationQuery
