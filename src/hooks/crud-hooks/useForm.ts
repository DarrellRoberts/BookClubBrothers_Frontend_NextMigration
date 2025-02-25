"use client";

import { useAppSelector } from "@/store/lib/hooks";
import { useState } from "react";

const useForm = (url: string, reqType: string, customData?: object) => {
  const [loadings, setLoadings] = useState(false);
  const [error, setError] = useState("");

  const token = useAppSelector((state) => state.token.tokenState);
  const formData =
    customData ?? useAppSelector((state) => state.bookFormData.formData);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(url, {
        method: reqType,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: reqType === "DELETE" ? null : JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        console.log(token);
        setError(data);
        console.log("something has happened");
      }

      if (response.ok) {
        console.log("success");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const enterLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      document.location.reload();
    }, 4000);
  };

  return { handleSubmit, error, enterLoading, loadings };
};

export default useForm;
