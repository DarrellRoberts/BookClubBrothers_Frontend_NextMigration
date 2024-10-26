export const findUser = (id, userData) => {
  const user = userData.find((user) => user._id === id);
  return user ? user.username : "user not found";
};
