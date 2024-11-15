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
        badges: {
            allBooks: boolean,
            loneWolf: number,
            mostBooks: boolean,
            fiveComments: boolean,
            firstBook: boolean,
            punctual: number
        }
        },
        username: string,
        _id: string,
        lastLoggedIn: string
}

export type { User };
