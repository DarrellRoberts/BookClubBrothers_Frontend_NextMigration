"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const useForm = (url: string, form: object, reqType: string) => {
  const [formData, setFormData] = useState(form);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  console.log(formData);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(url, {
        method: reqType,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log("something has happened");
      }

      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return { handleSubmit, error, formData, setFormData };
};

export default useForm;
