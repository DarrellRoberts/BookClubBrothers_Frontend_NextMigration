import { Button, Modal, Form } from "antd";
// import Signup from "./Signup";
import { useState } from "react";
import LoginForm from "./LoginForm";
import "../../style/login.css"

const Login: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState(<LoginForm setLoginOpen={setLoginOpen} />);

  const showModal = () => {
    setLoginOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setLoginOpen(false);
      setConfirmLoading(false);
    }, 2000);
    setModalText(<LoginForm setLoginOpen = {setLoginOpen}/>);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setLoginOpen(false);
  };
  return (
    <>
    <div className="flex items-center">
      <Button
        className="m-5"
        ghost
        type="primary"
        onClick={showModal}
      >
        Login
      </Button>
      </div>
      <Modal
        title="Login"
        open={loginOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
        <Form.Item>
          {/* Or
          <Link
            onClick={() => {
              setLoginOpen(false);
            }}
          > */}
            {/* <Signup /> */}
          {/* </Link> */}
        </Form.Item>
      </Modal>
    </>
  );
}

export default Login