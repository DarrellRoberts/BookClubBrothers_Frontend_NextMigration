export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,

  IA_API_URL: "https://openlibrary.org/search.json?title=",
  OL_BOOK_COVER_URL: "https://covers.openlibrary.org/b/id/",
}

// api endpoints
export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_BOOKS = `${API_URL}/books`
export const API_SINGLE_BOOK = `${API_URL}/books/`
export const API_UNREAD_BOOKS = `${API_BOOKS}/unread/all`

export const API_USERS = `${API_URL}/users`
export const API_SINGLE_USER = `${API_USERS}/id/`

export const IA_API_URL = "https://openlibrary.org/search.json?title="
export const OL_BOOK_COVER_URL = "https://covers.openlibrary.org/b/id/"
