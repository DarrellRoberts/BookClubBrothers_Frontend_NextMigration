import { Skeleton } from "antd"
import React from "react"

const SkeletonColumn = () => {
  return (
    <div className="border-r-2 border-black border-dashed pr-5">
      <h2 className="underline">Username</h2>
      <Skeleton.Node active={true} />
    </div>
  )
}

export default SkeletonColumn
