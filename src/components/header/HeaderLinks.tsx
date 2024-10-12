/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import "../../style/header.css";
import "../../style/headerRes.css";

const HeaderLinks: React.FC = () => {
  return (
    <>
      <div className="bookMenu">
        <Link href="/books">Book</Link>
        <ul className="bookHover">
          <li>
            <Link href="/books">Books Dashboard</Link>
          </li>
          <li>
            <Link href="/books/library">Book Library</Link>
          </li>
          <li>
            <Link href="/books/library/3d">3D Book Library</Link>
          </li>
          <li>
            <Link href="/books/randomiser">Book Randomiser</Link>
          </li>
          <li>
            <Link href="/books/quiz">Quiz</Link>
          </li>
          <li className="w-[85%]">
            <Link href="/books/stats">Book Stats</Link>
          </li>
        </ul>
      </div>

      <div className="bookMenu">
        <Link href="/club">Club</Link>
        <ul className="bookHover">
          <li>
            <Link href="/club">Club Dashboard</Link>
          </li>
          <li>
            <Link href="/club/about">About Us</Link>
          </li>
          <li>
            <Link href="/club/badges">Club Badges</Link>
          </li>
        </ul>
      </div>

      <div className="bookMenu">
        <Link href="/brothers">Brothers</Link>
        <ul className="bookHover">
          <li>
            <Link href="/brothers">Brothers Dashboard</Link>
          </li>
          <li>
            <Link href="/brothers/library">Brothers Library</Link>
          </li>
          <li className="w-[85%]">
            <Link href="/brothers/stats">Brothers Stats</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderLinks;
