import React from "react"

type Props = {
  usernames: string[]
}

const UsernameColumn: React.FC<Props> = ({ usernames }) => {
  return (
    <div className="border-r-2 border-black border-dashed pr-5">
      <h2 className="underline">Username</h2>
      {usernames?.map((username, index) => (
        <h2 key={index}>{username}</h2>
      ))}
    </div>
  )
}

export default UsernameColumn
