import { Button, Popconfirm } from 'antd';
import { useState, useContext } from 'react';
import { AuthContext } from "../../../../context/authContext";
import { useJwt } from "react-jwt";

interface props {
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
    id: string
}

const DeleteBook:React.FC<props> = ({id, setShowDelete}) => {
    const [error, setError] = useState("")
    
    const { token } = useContext(AuthContext);
    const { decodedToken }: { decodedToken?: { username: string} } = useJwt(token);
    
    const handleSubmit = async () => {
        if (decodedToken?.username === "Darrell") {
        try {
        setError(null);
        const response = await fetch(`https://bookclubbrothers-backend.onrender.com/books/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`}
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.error);
          console.log("something has happened");
        }
    
        if (response.ok) {
          console.log("SUCCESS!!!")
          setShowDelete(true);
        }
    } catch(error) {
        setError(error)
    }
} else {
setError("You need the admin's permission to delete a book. You are not the admin...move along")
}
      };
    
    const confirm = () =>
    new Promise((resolve) => {
    setTimeout(() => {resolve(null); handleSubmit(); }, 3000);
    });

    return (
        <>
    <Popconfirm
      className="deleteProfile" 
      title="WARNING"
      description="Are you sure you want to delete this book?"
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
    >
    <Button 
    className="deleteButton" 
    danger>
    Delete Book
    </Button>
    </Popconfirm>
    {error ? (
    <div className="authorisationMessage">
    <h2>{error}</h2>
    </div>
    ) : null}
        </>
    )
}

export default DeleteBook