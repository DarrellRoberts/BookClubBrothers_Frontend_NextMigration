import { config } from "@/configs/config"
import { useEffect, useState } from "react"

const useBookImage = (title: string) => {
  const [fetchData, setFetchData] = useState()
  const [coverUrl, setCoverUrl] = useState<string>("")

  const fetchCoverId = async () => {
    try {
      const response = await fetch(`${config.IA_API_URL}${title}`)
      if (!response.ok) return
      const data = await response.json()
      const filteredData = data?.docs.filter(
        (book) => book.cover_i !== undefined,
      )
      setFetchData(filteredData)
      const bookCoverUrl = `${config.OL_BOOK_COVER_URL}${filteredData[0].cover_i}-M.jpg`
      setCoverUrl(bookCoverUrl)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchCoverId()
  }, [title])
  return { coverUrl, fetchData }
}

export default useBookImage
