/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import "../../../style/brothersHomepage.css";
import "../../../style/brothersHomepageRes.css";

const BrothersHomepage: React.FC = () => {
  return (
    <div className="h-screen">
      <h1 className="booksTitle">The Brothers</h1>
      <div className="flex justify-center ">
        <div className="bookHomeGrid">
          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/brothers/library">
              <h2>Brothers Library</h2>
            </Link>
          </div>

          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/brothers/stats">
              <h2>Brothers Stats</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrothersHomepage;
