import { User } from "@/types/UserInterface";

const getUserData = async (): Promise<User[]> => {
  try {
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/users`
    );
    const user = await data.json();
    return user;
  } catch (err) {
    console.log(err);
  }
};

const userPromise = getUserData();
export const userData = await userPromise;