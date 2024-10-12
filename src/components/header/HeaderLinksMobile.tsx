/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { useState } from "react";
import "../../style/header.css";
import "../../style/headerRes.css";

const HeaderLinksMobile: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showBooks, setShowBooks] = useState<boolean>(false);
  const [showBrothers, setShowBrothers] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const handleLinkClick = () => {
    setShowMenu(false);
    setShowBooks(false);
    setShowBrothers(false);
  };

  return (
    <>
      <span
        onClick={() => {
          setShowMenu(!showMenu);
          setShowAnimation(true);
        }}
        className="text-4xl"
      >
        |||
      </span>
      <div
        className={
          showMenu
            ? "headerLinksMobile"
            : showAnimation
              ? "noHeaderLinksMobile"
              : ""
        }
      >
        {showMenu ? (
          <>
            <div className="bookMenuMobile">
              <h2
                className="underline text-3xl"
                onClick={() => {
                  setShowBooks(!showBooks);
                  setShowBrothers(false);
                }}
              >
                Book
              </h2>
              <ul className="submenuLinks">
                <li onClick={() => handleLinkClick()}>
                  <Link href="/books">Book Dashboard</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/books/library">Book Library</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/books/library/3d">3D Book Library</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/books/randomiser">Book Randomiser</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/books/quiz">Quiz</Link>
                </li>
                <li className="w-[85%]" onClick={() => handleLinkClick()}>
                  <Link href="/books/stats">Book Stats</Link>
                </li>
              </ul>
            </div>

            <div className="clubMenuMobile">
              <Link
                className="underline text-3xl"
                href="/club"
                onClick={() => handleLinkClick()}
              >
                Club
              </Link>
              <ul className="submenuLinks">
                <li onClick={() => handleLinkClick()}>
                  <Link href="/club">Club Dashboard</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/club/about">About Us</Link>
                </li>
                <li onClick={() => handleLinkClick()}>
                  <Link href="/club/badges">Club Badges</Link>
                </li>
              </ul>
            </div>

            <div className="brothersMenuMobile">
              <div className="bookMenuMobile">
                <h2
                  className="underline text-3xl"
                  onClick={() => {
                    setShowBrothers(!showBrothers);
                    setShowBooks(false);
                  }}
                >
                  Brothers
                </h2>
                <ul className="submenuLinks">
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/brothers">Brothers Dashboard</Link>
                  </li>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/brothers/library">Brothers Library</Link>
                  </li>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/brothers/stats">Brothers Stats</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default HeaderLinksMobile;
