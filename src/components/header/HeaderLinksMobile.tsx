/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { useState } from "react";

const HeaderLinksMobile: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showBooks, setShowBooks] = useState<boolean>(false);
  const [showBrothers, setShowBrothers] = useState<boolean>(false);

  const handleLinkClick = () => {
    setShowMenu(false);
    setShowBooks(false);
    setShowBrothers(false);
  };

  return (
    <>
      <span
        onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
        className="text-4xl"
      >
        |||
      </span>
      {showMenu ? (
        <>
          <div className="headerLinksMobile">
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
              {showBooks ? (
                <ul>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/books">Book Dashboard</Link>
                  </li>
                  <hr/>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/books/library">Book Library</Link>
                  </li>
                  <hr/>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/books/randomiser">Book Randomiser</Link>
                  </li>
                  <hr/>
                  <li onClick={() => handleLinkClick()}>
                    <Link href="/books/quiz">Quiz</Link>
                  </li>
                  <hr/>
                  <li className="w-[85%]" onClick={() => handleLinkClick()}>
                    <Link href="/books/stats">Book Stats</Link>
                  </li>
                  <hr/>
                </ul>
              ) : null}
            </div>

            <div className="clubMenuMobile">
              <Link
                className="underline text-3xl"
                href="/club"
                onClick={() => handleLinkClick()}
              >
                Club
              </Link>
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
                {showBrothers ? (
                  <ul>
                    <li onClick={() => handleLinkClick()}>
                      <Link href="/brothers">Brothers Dashboard</Link>
                    </li>
                    <hr/>
                    <li onClick={() => handleLinkClick()}>
                      <Link href="/brothers/library">Brothers Library</Link>
                    </li>
                    <hr/>
                    <li className="w-[85%]" onClick={() => handleLinkClick()}>
                      <Link href="/brothers/stats">Brothers Stats</Link>
                    </li>
                    <hr/>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HeaderLinksMobile;
