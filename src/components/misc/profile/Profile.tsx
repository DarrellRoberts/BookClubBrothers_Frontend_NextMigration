import React, { useEffect, useState } from "react"
import style from "./Profile.module.css"
import Image from "next/image"
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg"
import Link from "next/link"

type Props = {
  imageURL: string
  isLink?: boolean
  username?: string
  width?: number
  height?: number
}

const Profile: React.FC<Props> = ({
  imageURL,
  isLink,
  username,
  width,
  height,
}) => {
  return isLink && imageURL ? (
    <div className={style.profileCon}>
      <Link href={`/brothers/library/${username}`}>
        <Image
          src={imageURL}
          width={width ?? 200}
          height={height ?? 300}
          alt="Profile picture"
          loading="eager"
        />
      </Link>
    </div>
  ) : imageURL ? (
    <div className={style.profileCon}>
      <Image
        src={imageURL}
        width={width ?? 200}
        height={height ?? 300}
        alt="Profile picture"
      />
    </div>
  ) : (
    <div className={style.profileCon}>
      <Image
        src={ProfileUnknownUserImage.src}
        width={width ?? 200}
        height={height ?? 300}
        alt="Profile picture"
      />
    </div>
  )
}

export default React.memo(Profile)
