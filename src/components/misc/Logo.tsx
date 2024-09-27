import Link from 'next/link';
import React from 'react';
import style from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="border-4 border-white border-solid pr-5 pl-5 pt-2 pb-2 mr-5 mb-2 mt-2">
        <h2 className={style.logo}>B</h2>
      </div>
    </Link>
  );
};

export default Logo;
