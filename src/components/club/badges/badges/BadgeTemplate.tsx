import React, { ReactNode } from "react"
import { Popover } from "antd"
import "./popover.css"
import "./icon-number.css"
import Image from "next/image"
import { UiPopover } from "@/components/ui/popover/UiPopover"

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
    <UiPopover popContent={title} popTitle={content}>
      <Image
        data-testid="badge-image"
        className="rounded-full border-1 border-bc-font"
        src={badgeImageURL}
        alt={title}
        width={isVertical ? 100 : 55}
        height={isVertical ? 100 : 55}
      />
    </UiPopover>
  )
}

export default BadgeTemplate
