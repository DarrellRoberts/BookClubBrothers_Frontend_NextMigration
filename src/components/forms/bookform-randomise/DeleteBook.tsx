"use client"

import { ConfigProvider, Popconfirm } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch } from "@/store/lib/hooks"
import { setIsRefresh } from "@/store/lib/features/auth/editButtonsSlice"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  id: string
}

const DeleteBook: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error } = useForm(
    `${config.API_URL}/books/${id}`,
    "DELETE"
  )

  const dispatch = useAppDispatch()

  const confirm = () =>
    new Promise((resolve) => {
      handleSubmit()
      dispatch(setIsRefresh(true))
      setTimeout(() => {
        resolve(null)
        dispatch(setIsRefresh(false))
      }, 3000)
    })

  const popTheme = {
    components: {
      Popconfirm: {
        colorText: "black",
        colorTextHeading: "black",
        colorBg: "black",
      },
    },
  }
  return (
    <ConfigProvider theme={popTheme}>
      <Popconfirm
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={confirm}
      >
        <div>
          <UiButton
            bgColor="darkred"
            hoverBgColor="red"
            textContent="Delete Book"
          />
        </div>
      </Popconfirm>
      {error ? (
        <div className="authorisationMessage">
          <h2>{error}</h2>
        </div>
      ) : null}
    </ConfigProvider>
  )
}

export default DeleteBook
