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
}

const Profile: React.FC<Props> = ({
  imageURL,
  scaleMultiplier,
  isLink,
  username,
}) => {
  return (
    <>
      {isLink ? (
        <Link href={`/brothers/library/${username}`}>
          <div
            className={style.profileCon}
            style={{ transform: `scale(${scaleMultiplier})` }}
          >
            <Image
              src={imageURL ? imageURL : ProfileUnknownUserImage}
              width={150}
              height={300}
              alt="Profile picture"
            />
          </div>
        </Link>
      ) : (
        <div
          className={style.profileCon}
          style={{ transform: `scale(${scaleMultiplier})` }}
        >
          <Image
            src={imageURL ? imageURL : ProfileUnknownUserImage}
            width={150}
            height={300}
            alt="Profile picture"
          />
        </div>
      )}
    </>
  )
}

export default Profile
