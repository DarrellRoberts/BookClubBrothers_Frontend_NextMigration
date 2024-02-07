import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Button, Form, Select, Space } from "antd";

const { Option } = Select

interface props {
  id: string;
  inGenre: [string] | null;
}

const EditGenre: React.FC<props> = ({ id, inGenre }) => {
  const [favGenre, setFavGenre] = useState(inGenre?.map(genre => `${genre}`));
  const [error, setError] = useState("");
  const [loadings, setLoadings] = useState([]);
  const { token } = useContext(AuthContext);

console.log(favGenre)
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
            userInfo: { favGenre },
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
        {/* Genre */}
    <Form.Item
    htmlFor="favGenre"
    name="Genres"
      >
      <Select
      mode="multiple"
      style={{
      width: '100%',
    }}
    placeholder="Select the genres"
    optionLabelProp="label"
    value={favGenre}
    defaultValue={favGenre}
    onChange={setFavGenre}
  >
    <Option value="Horror" label="Horror">
      <Space>
        <span role="img" aria-label="Horror">
        🧟
        </span>
        Horror
      </Space>
    </Option>
    <Option value="Thriller" label="Thriller" >
      <Space>
        <span role="img" aria-label="Thriller">
        🔪
        </span>
        Thriller
      </Space>
    </Option>
    <Option value="Comedy" label="Comedy">
      <Space>
        <span role="img" aria-label="Comedy">
        🥸
        </span>
        Comedy
      </Space>
    </Option>
    <Option value="Romance" label="Romance">
      <Space>
        <span role="img" aria-label="Romance">
        🌹
        </span>
        Romance
      </Space>
    </Option>
    <Option value="Fantasy" label="Fantasy">
      <Space>
        <span role="img" aria-label="Fantasy">
        🧙‍♂️
        </span>
        Fantasy
      </Space>
    </Option>
    <Option value="Adventure" label="Adventure">
      <Space>
        <span role="img" aria-label="Adventure">
        🏝️
        </span>
        Adventure
      </Space>
    </Option>
    <Option value="Anti-war" label="Anti-war">
      <Space>
        <span role="img" aria-label="Anti-war">
        🪖
        </span>
        Anti-war
      </Space>
    </Option>
    <Option value="Drama" label="Drama">
      <Space>
        <span role="img" aria-label="Drama">
        🎭
        </span>
        Drama
      </Space>
    </Option>
    <Option value="Action" label="Action">
      <Space>
        <span role="img" aria-label="Action">
        💥
        </span>
        Action
      </Space>
    </Option>
    <Option value="Science-fiction" label="Science-fiction">
      <Space>
        <span role="img" aria-label="Science-fiction">
        🤖
        </span>
        Science-fiction
      </Space>
    </Option>
    <Option value="Dystopian" label="Dystopian">
      <Space>
        <span role="img" aria-label="Dystopian">
        👁️
        </span>
        Dystopian
      </Space>
    </Option>
    <Option value="Postmodern" label="Postmodern">
      <Space>
        <span role="img" aria-label="Postmodern">
        🟥
        </span>
        Postmodern
      </Space>
    </Option>
    <Option value="Anthology" label="Anthology">
      <Space>
        <span role="img" aria-label="Anthology">
        🤸
        </span>
        Anthology
      </Space>
    </Option>
    <Option value="Non-fiction" label="Non-fiction">
      <Space>
        <span role="img" aria-label="Non-fiction">
        📈
        </span>
        Non-fiction
      </Space>
    </Option>
  </Select>
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

export default EditGenre;
