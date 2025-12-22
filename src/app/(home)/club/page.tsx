import React from "react"
import { UiButton } from "@/components/ui/button/UiButton"

const ClubHomepage: React.FC = () => {
  const dashboardLinks = [
    {
      text: "About Us",
      link: "/club/about",
    },
    {
      text: "Badges",
      link: "/club/badges",
    },
  ]
  return (
    <div className="h-[calc(85vh-100px)] max-xs:h-[calc(85vh-75px)]">
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        The Club
      </h1>
      <div className="flex justify-evenly w-full">
        {dashboardLinks.map((btn) => (
          <UiButton
            isLink
            href={btn.link}
            textContent={btn.text}
            key={btn.text}
          />
        ))}
      </div>
      <div
        className="flex justify-center mt-5 h-2/3"
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
