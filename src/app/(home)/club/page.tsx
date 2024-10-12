/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";

const ClubHomepage: React.FC = () => {
  return (
    <>
      <h1 className="booksTitle">The Club</h1>
      <div className="flex justify-center ">
        <div className="bookHomeGrid">
          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/club/about">
              <h2>About Us</h2>
            </Link>
          </div>

          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/club/badges">
              <h2>Badges</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubHomepage;
