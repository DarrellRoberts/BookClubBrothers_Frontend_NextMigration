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
  actualDateOfMeeting?: string
  dateOfMeeting?: string
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

export type CreateRatingPayload = {
  raterId?: string[]
  rating?: number | number[]
}

export type EditRatingPayload = {
  raterId?: string[]
  rating?: number | number[]
}

export type EditUserPayload = {
  userInfo: {
    favGenre?: string[]
    residence?: {
      city: string
      country: string
    }
  }
}

export type EditUsernamePayload = {
  username: string
}
