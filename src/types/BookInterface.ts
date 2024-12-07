interface Book {
  author: string;
  commentInfo: {
    commentId: string[];
    comments: string[];
  };
  dateOfMeeting: string;
  actualDateOfMeeting: string;
  reviewImageURL?: string;
  genre: string[];
  imageURL?: string;
  pages: number;
  read: boolean;
  scoreRatings: {
    raterId: string[];
    rating: number[];
  };
  suggestedBy?: string;
  title: string;
  totalScore: number;
  yearPublished: number;
  _id: string;
}

export type { Book };
