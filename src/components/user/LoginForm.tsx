import { Button, Form, Input } from 'antd';
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext.tsx";

interface Login {
  setLoginOpen: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const LoginForm: React.FC<Login> = ({setLoginOpen}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState([]);
  const { login, token } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
    setError(null);
    const response = await fetch("https://bookclubbrothers-backend.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoadings([false]);
    }

    if (response.ok) {
      setTimeout(() => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      login(data.token)
      setLoadings([false])
      setLoginOpen(false)
    }, 5000);
    }
  } catch(err) {
    setError(err)
    console.log(error)
  }
  };
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    if (token) {
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  }
}

    return(
        <>
        <div>
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
      maxWidth: 600
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'There is a box with no username. Fill it out!',
        },
      ]}
    >
      <Input
      type="username"
      onChange={(e) => {setUsername(e.target.value)}}
      value={username}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Stop messing around. Enter your password!',
        },
      ]}
    >
      <Input.Password 
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      />
    </Form.Item>
    {error ? <h4 className="errorH">{error}</h4> : null}

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
      htmlType="submit"
      loading={loadings[0]} 
      onClick={() => enterLoading(0)}
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
        </>
    )
}

export default LoginForm