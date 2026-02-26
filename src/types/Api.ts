export type HttpMethod = "post" | "patch" | "put" | "delete"

export type CreateBookPayload = {
  title: string
  author: string
  pages: number
  yearPublished: number
  genre: any
  imageURL?: string
}

export type EditBookPayload = {
  title: string
  author: string
  pages: number
  yearPublished: number
  genre: any
  imageURL?: string
}

export type EditCommentPayload = {
  commentId?: string[]
  comments?: string | string[]
}

export type SelectBookPayload = {
  read: boolean
  dateOfMeeting: number
}

export type CreateCommentPayload = {
  commentId?: string[]
  comments?: string | string[]
}
