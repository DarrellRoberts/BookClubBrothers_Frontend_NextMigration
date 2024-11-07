/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { handleLogout } from "@/functions/handleLogout";
import "../../style/login.css";

// type Props = {
//   propsToken: string;
// };

const Logout: React.FC = () =>
  // { propsToken }
  {
    const [loadings, setLoadings] = useState([]);

    const { logout } = useContext(AuthContext);

    const handleClick = () => {
      setLoadings([true]);
      setTimeout(() => {
        // token ? handleLogout(token) : handleLogout(propsToken);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        // propsToken = null;
        setLoadings([false]);
        logout();
      }, 3000);
    };
    return (
      <>
        <div className="flex items-center">
          <Button
            className="m-5"
            type="primary"
            ghost
            htmlType="submit"
            loading={loadings[0]}
            onClick={handleClick}
          >
            Logout
          </Button>
        </div>
      </>
    );
  };

export default Logout;
