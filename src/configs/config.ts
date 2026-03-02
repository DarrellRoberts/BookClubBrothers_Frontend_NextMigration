export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,

  IA_API_URL: "https://openlibrary.org/search.json?title=",
  OL_BOOK_COVER_URL: "https://covers.openlibrary.org/b/id/",
}

// api endpoints
export const API_URL = process.env.NEXT_PUBLIC_API_URL

// Books
// GET
export const API_BOOKS = `${API_URL}/books`
export const API_SINGLE_BOOK = `${API_URL}/books/`
export const API_UNREAD_BOOKS = `${API_BOOKS}/unread/all`
// POST
export const API_CREATE_UNREAD = `${API_BOOKS}/unread/create`
export const API_CREATE_COMMENT = `${API_BOOKS}/comment/`
export const API_CREATE_RATING = `${API_BOOKS}/rating/`
// DELETE
export const API_BOOK_DELETE = `${API_URL}/books/`
// PUT
export const API_SELECT_BOOK = `${API_BOOKS}/`
export const API_EDIT_BOOK = `${API_BOOKS}/`
export const API_EDIT_COMMENT = `${API_BOOKS}/comment/edit/`
export const API_EDIT_RATING = `${API_BOOKS}/rating/edit/`

// Users
// GET
export const API_USERS = `${API_URL}/users`
export const API_SINGLE_USER = `${API_USERS}/id/`
// PUT
export const API_EDIT_USER = `${API_USERS}/`
export const API_EDIT_USERNAME = `${API_USERS}/username/`

export const IA_API_URL = "https://openlibrary.org/search.json?title="
export const OL_BOOK_COVER_URL = "https://covers.openlibrary.org/b/id/"

// Public Images
export const UNKNOWN_IMAGE = "/Profile.unknown-profile-image.jpg"
export const F_WORM_IMAGE = "/book-library/book-card-cert-fresh.webp"
export const R_WORM_IMAGE = "/book-library/book-card-cert-rotten.webp"
