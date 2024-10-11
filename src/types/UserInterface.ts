interface User {
    userInfo: {
        books: {
        booksCommented: string[],
        booksScored: string[],
        comments: string[],
        score: number[],
        },
        favGenre: string[],
        profileURL: string,
        residence: {
            country: string,
            city: string
        },
        },
        username: string,
        _id: string
}

export type { User };
