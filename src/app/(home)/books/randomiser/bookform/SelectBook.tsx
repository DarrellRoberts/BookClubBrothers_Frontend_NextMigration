/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import { useState, useContext, Dispatch } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useJwt } from "react-jwt";
import { ACTIONS } from "../actions";

interface props {
  bookId: string;
  dispatch: Dispatch<unknown>;
}

const SelectBook: React.FC<props> = ({ bookId, dispatch }) => {
  const [loadings, setLoadings] = useState([]);

  const read = true;

  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);

  const handleSubmit = async () => {
    if (decodedToken?.username === "Darrell") {
      try {
        dispatch({ type: ACTIONS.SETERROR, payload: null });
        const response = await fetch(
          `https://bookclubbrothers-backend.onrender.com/books/${bookId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              read,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          dispatch({ type: ACTIONS.SETERROR, payload: data.error });
          console.log("something has happened");
        }

        if (response.ok) {
          console.log("SUCCESS!!!");
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SETERROR, payload: error });
      }
    } else {
      dispatch({
        type: ACTIONS.SETERROR,
        payload:
          "You need the admin's permission to select a book. You are not the admin...move along",
      });
    }
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        document.location.reload();
        return newLoadings;
      });
    }, 4000);
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Button
          loading={loadings[0]}
          onClick={() => enterLoading(0)}
          htmlType="submit"
        >
          Select
        </Button>
      </Form>
    </>
  );
};

export default SelectBook;
