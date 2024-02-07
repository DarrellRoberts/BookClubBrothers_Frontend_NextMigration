import { Button, Form } from 'antd';
import { useState, useContext } from 'react';
import { AuthContext } from "../../../../context/authContext";
import { useJwt } from "react-jwt";

interface props {
    bookId: string
}

const SelectBook:React.FC<props> = ({ bookId }) => {
    const [loadings, setLoadings] = useState([])
    const [error, setError] = useState("")
    
    const read = true;
    
    const { token } = useContext(AuthContext);
    const { decodedToken }: { decodedToken?: { username: string} } = useJwt(token);
    
    const handleSubmit = async () => {
        if (decodedToken?.username === "Darrell") {
        try {
        setError(null);
        const response = await fetch(`https://bookclubbrothers-backend.onrender.com/books/${bookId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
          body: JSON.stringify({                 
            read }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.error);
          console.log("something has happened");
        }
    
        if (response.ok) {
          console.log("SUCCESS!!!")
        }
    } catch(error) {
        setError(error)
    }
} else {
setError("You need the admin's permission to select a book. You are not the admin...move along")
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
    <Form
    onFinish={handleSubmit}
    >
    <Button
    loading={loadings[0]} 
    onClick={() => enterLoading(0)} 
    htmlType="submit"
    >
    Select
    </Button>
    {(<h2>{error}</h2>)}
    </Form>
        </>
    )
}

export default SelectBook