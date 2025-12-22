/* eslint-disable react/react-in-jsx-scope */
import { UiButton } from "@/components/ui/button/UiButton"
import { Button } from "antd"
import Link from "next/link"

const BrothersHomepage: React.FC = () => {
  const dashboardLinks = [
    {
      text: "Brothers Library",
      link: "/brothers/library",
    },
    {
      text: "Brothers Stats",
      link: "/brothers/stats",
    },
  ]
  return (
    <div className="h-[calc(85vh-100px)] max-xs:h-[calc(85vh-75px)]">
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        The Brothers
      </h1>
      <div className="flex justify-center ">
        <div className="grid grid-cols-2 gap-20">
          {dashboardLinks.map((btn) => (
            <UiButton
              isLink
              href={btn.link}
              textContent={btn.text}
              key={btn.text}
            />
          ))}
          {/* <Link href="/brothers/library">
            <Button size="large" type="primary">
              Brothers Library
            </Button>
          </Link>

          <Link href="/brothers/stats">
            <Button size="large" type="primary">
              Brothers Stats
            </Button>
          </Link> */}
        </div>
      </div>
      <div
        className="flex justify-center mt-5 h-2/3"
        style={{
          backgroundImage: `url('/brother-dashboard-background-image.webp')`,
          backgroundPosition: "50% 80%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  )
}

export default BrothersHomepage
