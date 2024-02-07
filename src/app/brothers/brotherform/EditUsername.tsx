import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Button, Form, Input } from "antd";

interface props {
  id: string;
  inUsername: string;
}

const EditUsername: React.FC<props> = ({ id, inUsername }) => {
  const [username, setUsername] = useState(inUsername);
  const [error, setError] = useState("");
  const [loadings, setLoadings] = useState([]);
  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users/username/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log("something has happened");
      }

      if (response.ok) {
        console.log("SUCCESS!!!");
      }
    } catch (error) {
      setError(error);
      console.log(error);
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
        {/* Username */}
        <Form.Item
          // label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please write your username",
            },
          ]}
        >
          <Input
              type="text"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
            value={username}
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
            className="loginButtons"
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
            htmlType="submit"
          >
            Submit
          </Button>
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUsername;
