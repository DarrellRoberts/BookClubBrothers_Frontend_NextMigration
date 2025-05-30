import React from "react"
import style from "./Profile.module.css"
import Image from "next/image"
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg"
import Link from "next/link"

type Props = {
  imageURL: string
  scaleMultiplier?: number
  isLink?: boolean
  username?: string
  width?: number
  height?: number
}

const Profile: React.FC<Props> = ({
  imageURL,
  scaleMultiplier,
  isLink,
  username,
  width,
  height
}) => {
  return (
    <>
      {isLink ? (
        <div className={style.profileCon}>
          <Link
            href={`/brothers/library/${username}`}
            // style={{ transform: `scale(${scaleMultiplier})` }}
          >
            <Image
              src={imageURL ? imageURL : ProfileUnknownUserImage}
              width={width ?? 200}
              height={height ?? 300}
              alt="Profile picture"
            />
          </Link>
        </div>
      ) : (
        <div className={style.profileCon}>
          <Image
            src={imageURL ? imageURL : ProfileUnknownUserImage}
            width={width ?? 200}
            height={height ?? 300}
            alt="Profile picture"
            // style={{ transform: `scale(${scaleMultiplier})` }}
          />
        </div>
      )}
    </>
  )
}

export default Profile
