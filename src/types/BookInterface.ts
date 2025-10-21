export interface Book {
  author: string
  commentInfo?: {
    commentId?: string[]
    comments?: string[] | string
  }
  dateOfMeeting?: string
  actualDateOfMeeting?: string
  reviewImageURL?: string
  genre: any
  imageURL?: string
  pages: number
  read?: boolean
  scoreRatings?: {
    raterId?: string[]
    rating?: number[] | number
  }
  suggestedBy?: string
  title: string
  totalScore?: number
  yearPublished: number
  _id?: string
}

export interface ShortBook {
  shortStories: [
    {
      scoreRatings?: {
        raterId?: string[]
        rating?: number[]
      }
      commentInfo?: {
        commentId?: string[]
        comments?: string[] | string
      }

      parentId: string
      title: string
      author: string
      pages: number
      _id: string
    }
  ]
}
