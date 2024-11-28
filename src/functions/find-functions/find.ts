export const findUser = (id, userData) => {
  const user = userData?.find((user) => user._id === id);
  return user ? user.username : "user not found";
};

export const findUserByUsername = (username, userData) => {
  const user = userData?.find((user) => user.username === username);
  return user ? user : "user not found";
};

export const findBook = (id, bookData) => {
  const book = bookData?.find((book) => book._id === id);
  return book ? book.title : "book not found";
};

export const findDateOfMeeting = (title, bookData) => {
  const book = bookData?.find((book) => book.title === title);
  return book ? book.dateOfMeeting : "book not found";
};
