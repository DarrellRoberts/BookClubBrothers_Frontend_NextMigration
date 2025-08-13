/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link"
import { Button } from "antd"

const ClubHomepage: React.FC = () => {
  return (
    <div className="h-[calc(85vh-100px)] max-xs:h-[calc(85vh-75px)]">
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        The Club
      </h1>
      <div className="flex justify-evenly w-full">
        <Link href="/club/about">
          <Button size="large">About Us</Button>
        </Link>

        <Link href="/club/badges">
          <Button size="large">Badges</Button>
        </Link>
      </div>
      <div
        className="flex justify-center mt-10 h-2/3"
        style={{
          backgroundImage: `url('/club-dashboard-club-background-image.webp')`,
          backgroundPosition: "50% 40%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  )
}

export default ClubHomepage
