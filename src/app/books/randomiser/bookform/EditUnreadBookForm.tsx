import { useState, useContext } from "react"
import { AuthContext } from "../../../../context/authContext";
import { 
    Button, 
    Form, 
    Input, 
    Space, 
    Select, 
} from 'antd';
import "../../../../style/createbook.css"

const { Option } = Select

type BookProps = {
  editBookId: number,
  prevTitle: string, 
  prevAuthor: string,
  prevPages: number,
  prevYearPublished: number, 
  prevGenre: string[],
  prevImageURL: string
}

const EditUnreadBookForm:React.FC<BookProps> = (
  {
  editBookId, 
  prevTitle, 
  prevAuthor, 
  prevPages, 
  prevYearPublished, 
  prevGenre, 
  prevImageURL
}
  ) => {
const [editTitle, setEditTitle] = useState<string>(prevTitle)    
const [editAuthor, setEditAuthor] = useState<string>(prevAuthor)
const [editPages, setEditPages] = useState<number>(prevPages)
const [editYearPublished, setYearPublished] = useState<number>(prevYearPublished)
const [editGenre, setEditGenre] = useState(prevGenre)
const [editImageURL, setEditImageURL] = useState(prevImageURL)
const [error, setError] = useState("")
const [loadings, setLoadings] = useState([])

const { token } = useContext(AuthContext);

const handleSubmit = async () => {
    try {
        setError(null);
        const response = await fetch(`https://bookclubbrothers-backend.onrender.com/books/${editBookId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
          body: JSON.stringify({                 
            editTitle,
            editAuthor,
            editPages,
            editYearPublished,
            editGenre,
            editImageURL }),
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
console.log(editBookId);
console.log(`https://bookclubbrothers-backend.onrender.com/books/${editBookId}`)
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

{/* Title */}
<Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          message: "Please write the name of book! How else we will know which book it is?",
        },
      ]}
    >
      <Input
      type="text"
      onChange={(e) => setEditTitle(e.target.value)}
      value={editTitle}
      defaultValue={editTitle}
      />
    </Form.Item>


    {/* Author */}
    <Form.Item
      label="Author"
      name="author"
      rules={[
        {
          required: true,
          message: "Please write the name of the author!",
        },
      ]}
    >
      <Input
      type="text"
      onChange={(e) => setEditAuthor(e.target.value)}
      value={editAuthor}
      defaultValue={editAuthor}
      />
    </Form.Item>

    <Form.Item
      label="Pages"
      name="pages"
      rules={[
        {
          required: true,
          message: "Please write the number of pages (i'm curious)!",
        },
      ]}
    >
      <Input
      type="number"
      onChange={(e) => setEditPages(Number(e.target.value))}
      value={editPages}
      defaultValue={editPages}
      />
    </Form.Item>

    <Form.Item
      label="Year Published"
      name="year"
      rules= {[
        {
          required: true,
          message: "Please write the year it was published (I'm curious)!",
        },
      ]}
    >
      <Input
      type="number"
      onChange={(e) => setYearPublished(Number(e.target.value))}
      value={editYearPublished}
      defaultValue={editYearPublished}
      />
      </Form.Item>


{/* select genres */}
<Form.Item
label="Genres"
htmlFor="genre"
name="Genres"
rules={[
    { required: true },
    ]}
>
<Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="Select the genres"
    optionLabelProp="label"
    value={editGenre}
    onChange={setEditGenre}
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

{/* ImageURL */}
<Form.Item
      label="Image URL"
      name="image"
    >
      <Input
      type="text"
      onChange={(e) => setEditImageURL(e.target.value)}
      value={editImageURL}
      defaultValue={editImageURL}
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

export default EditUnreadBookForm