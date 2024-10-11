import React from 'react';
import style from "./Profile.module.css";
import Image from "next/image";
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg";

type Props = {
  imageURL: string
}

const Profile: React.FC<Props> = ({imageURL}) => {
  return (
    <div className={style.profileCon}>
      <Image src={imageURL ? imageURL : ProfileUnknownUserImage} width={150} height={300} alt="Profile picture"/>
    </div>
  );
};

export default Profile;
