import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Button, Form, Input } from "antd";

interface props {
  id: string;
  inCity: string;
  inCountry: string;
}

const EditCityAndCountry: React.FC<props> = ({ id, inCity, inCountry}) => {
  const [country, setCountry] = useState(inCountry);  
  const [city, setCity] = useState(inCity);
  const [error, setError] = useState("");
  const [loadings, setLoadings] = useState([]);
  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userInfo: { residence: { country, city }},
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
        {/* Country */}
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              message: "Please write your country",
            },
          ]}
        >
          <Input
              type="text"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
            value={country}
          />
        </Form.Item>

        {/* City */}
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              message: "Please write your city",
            },
          ]}
        >
          <Input
              type="text"
            onChange={(e) => setCity(e.target.value)}
            defaultValue={city}
            value={city}
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

export default EditCityAndCountry;
