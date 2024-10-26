import React from 'react';
import style from "./profileSmall.module.css";
import Image from "next/image";
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg";

type Props = {
  imageURL: string
}

const Profile: React.FC<Props> = ({imageURL}) => {
  return (
    <div className={style.profileCon}>
      <Image src={imageURL ? imageURL : ProfileUnknownUserImage} width={100} height={150} alt="Profile picture"/>
    </div>
  );
};

export default Profile;
