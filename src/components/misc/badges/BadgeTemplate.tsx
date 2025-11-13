/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from "react"
import { Popover } from "antd"
import "./popover.css"
import "./icon-number.css"
import Image from "next/image"

type Props = {
  badgeImageURL: string
  title: string
  content: string | ReactNode
  isVertical?: boolean
}

const BadgeTemplate: React.FC<Props> = ({
  badgeImageURL,
  title,
  content,
  isVertical,
}) => {
  return (
    <Popover title={title} content={content}>
      <Image
        data-testid="badge-image"
        className="rounded-full border-1 border-bc-font"
        src={badgeImageURL}
        alt={title}
        width={isVertical ? 100 : 55}
        height={isVertical ? 100 : 55}
      />
    </Popover>
  )
}

export default BadgeTemplate
