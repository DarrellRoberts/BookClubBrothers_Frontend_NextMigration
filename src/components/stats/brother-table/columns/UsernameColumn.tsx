import React from "react";
import styles from "./username.module.css";

type Props = {
  usernames: string[];
};

const UsernameColumn: React.FC<Props> = ({ usernames }) => {
  return (
    <div className={styles.usernameColumn}>
      <h2 className="underline">Username</h2>
      {usernames?.map((username, index) => (
        <h2 key={index}>{username}</h2>
      ))}
    </div>
  );
};

export default UsernameColumn;
