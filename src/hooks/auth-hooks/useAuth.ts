import {
  removeToken,
  setTokenState,
} from "@/store/lib/features/auth/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { type Jwt } from "@/types/Jwt";

export const useAuth = () => {
  const token = useAppSelector((state) => state.token.tokenState);
  const dispatch = useAppDispatch();

  const login = (newToken: string) => {
    dispatch(setTokenState(newToken));
    localStorage.setItem("token", newToken);
  };

  const decodedToken = useJwt<Jwt>(token);

  const logout = (): void => {
    dispatch(removeToken());
    dispatch(setTokenState(null));
    localStorage.removeItem("token");
  };

  const handleExpired = (): void => {
    if (!token) return;
    if (decodedToken.decodedToken === null) return;
    if (!decodedToken.isExpired) return;
    logout();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;
    dispatch(setTokenState(storedToken));
    handleExpired();
  });

  return { login, logout, handleExpired, ...decodedToken };
};
