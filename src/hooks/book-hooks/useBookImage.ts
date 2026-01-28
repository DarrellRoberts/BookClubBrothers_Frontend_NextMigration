import { config } from "@/configs/config"

const useBookImage = () => {
  const fetchCoverId = async (title: string) => {
    try {
      const response = await fetch(`${config.IA_API_URL}${title}`)
      if (!response.ok) return
      const data = await response.json()
      const filteredData = data?.docs.filter(
        (book) => book.cover_i !== undefined,
      )
      const bookCoverUrl = `${config.OL_BOOK_COVER_URL}${filteredData[0].cover_i}-L.jpg`
      return bookCoverUrl
    } catch (err) {
      console.error(err)
    }
  }
  return fetchCoverId
}

export default useBookImage
