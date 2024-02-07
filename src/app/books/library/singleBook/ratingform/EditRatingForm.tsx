import { useState, useContext } from "react"
import { AuthContext } from "../../../../context/authContext";
import { 
    Button, 
    Form, 
    Input, 
} from 'antd';

interface props {
    id: string,
    initialRating: number
}

const EditRatingForm:React.FC<props> = ({id, initialRating}) => {

const [rating, setRating] = useState(initialRating)
const [error, setError] = useState("")
const [loadings, setLoadings] = useState([])

const { token } = useContext(AuthContext);
const handleSubmit = async () => {
    try {
        setError(null);
        const response = await fetch(`https://bookclubbrothers-backend.onrender.com/books/rating/edit/${id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
          body: JSON.stringify({                 
            rating}),
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
            console.log("something has happened");
          }
      
          if (response.ok) {
            console.log("SUCCESS!!!")
          }
    } catch (error) {
        setError(error)
        console.log(error)
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
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
  >

{/* rating */}
    <Form.Item
      label="Rating"
      name="rating"
      rules= {[
        {
          required: true,
          message: "Please rate the book with a score between 0 to 10",
        },
      ]}
    >
      <Input
      defaultValue={rating ? rating : 0}
      onChange={(e) => setRating(Number(e.target.value))}
      />
      </Form.Item>

{/* Submission */}
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button 
      type="primary"
      ghost
      className="loginButtons"
      loading={loadings[0]} 
      onClick={() => enterLoading(0)} 
      htmlType="submit">
        Submit
      </Button>
      {error ? <h4 className="errorH">{error}</h4> : null}
    </Form.Item>
      </Form>
        </>
    )
}

export default EditRatingForm