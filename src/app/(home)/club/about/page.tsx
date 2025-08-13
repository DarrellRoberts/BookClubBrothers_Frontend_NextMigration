/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import Meeting1 from "@/assets/clubimages/meeting1.jpg"
import Meeting2 from "@/assets/clubimages/meeting2.jpg"
import Meeting3 from "@/assets/clubimages/meeting3.jpg"
import BerlinMeet1 from "@/assets/clubimages/berlinMeet1.jpg"
import BerlinMeet2 from "@/assets/clubimages/berlinMeet2.jpg"
import Gargoyle from "@/assets/clubimages/club-gargoyle-image.webp"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/store/lib/hooks"

const Club: React.FC = () => {
  const darkMode = useAppSelector((state) => state.darkMode)
  console.log(darkMode.darkMode)
  return (
    <div className="flex flex-col items-center w-full my-4">
      <div className="flex justify-between w-full px-4">
        <Image
          className={
            darkMode.darkMode
              ? "brightness-50 w-75 max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
              : "brightness-100 w-75 max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
          }
          src={Gargoyle}
          alt="gargoyle_with_trumpet"
        />
        <Image
          className="w-50 aspect-[9/16] border-15 border-black max-lg:w-35 max-sm:w-25"
          src={BerlinMeet1}
          alt="clubmeeting4"
        />
        <Image
          className={
            darkMode.darkMode
              ? "brightness-50 w-75 scale-x-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
              : "brightness-100 w-75 scale-x-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
          }
          src={Gargoyle}
          alt="gargoyle_with_trumpet"
        />
      </div>
      <h1 className="text-8xl my-2 max-sm:text-6xl">The Club</h1>
      <div className="flex justify-evenly w-full">
        <Image
          className="w-75 aspect-square border-15 border-black max-lg:w-50 max-sm:w-25 max-sm:h-25"
          src={Meeting2}
          alt="clubmeeting2"
        />
        <Image
          className="w-50 aspect-[9/16] border-15 border-black max-lg:w-35 max-sm:w-25"
          src={Meeting1}
          alt="clubmeeting1"
        />
        <Image
          className="w-75 aspect-square border-15 border-black max-lg:w-50 max-sm:w-25 max-sm:h-25"
          src={Meeting3}
          alt="clubmeeting3"
        />
      </div>
      <div className="p-4">
        <p className="text-center text-xl">
          Many years ago, we all went to Oxted Secondary School in a little,
          posh town called Oxted, which resides in Surrey, England. This is
          where we all met. Fast forward to late 2020, in the early mist and
          confusion of the Covid pandemic, upon a long discussion we all
          realised we were wannabe book worms. By then, I (Darrell) had just
          moved to Berlin and was rarely in the UK, meanwhile Hugo was about to
          move to Australia, and Seb and Josh had plans to travel the world.
          Perhaps influenced by the social isolation of Covid, we decided to
          form a book club primarily as a way of staying in contact. We never
          took it too seriously and with every online meeting, we spent 50% of
          the time talking about the book, and the other half catching up.
          <br />
          <br />
          Nevertheless, we still scored each book and Josh took care of the book
          graphics which you can view in the{" "}
          <Link
            target="_blank"
            href="/books/library"
            className="underline font-bold"
          >
            book library
          </Link>
          . It was then a matter of discussion what the next book would be. By
          2024 we had read and scored 12 books, and had no plans in stopping.
          However, this created a problem. We had all this data of scores and
          graphics but it was only stored on our whatsapp group. This made it a
          nightmare if we wanted to review scores from years ago. Hence, I came
          up with the idea of creating a website, so that anytime, any one of us
          could visit this site.
          <br />
          <br />
          As I created a Fullstack application for this purpose, it meant
          anything was possible. For example, I could store the data as a json
          via a database platform and create my own API. With this API, I could
          manipulate the data however I saw fit, such as calculating our average
          rating, whether we read all the books and what were our best and most
          hated. I did just that, and you can view our stats, for example,{" "}
          <Link
            target="_blank"
            className="underline font-bold"
            href="/brothers/stats"
          >
            {" "}
            here
          </Link>
          . Furthermore, I could add CRUD operations and user login, meaning we
          could rate the book and add another directly on the website.
          <br />
          <br />
          This of course is just a small example of what is possible, and what I
          achieved so far on this website. We are always coming up with ideas
          and the more challenging, the better.
          <br />
          I am incredibly excited of what this could become!!
          <br />
          <br />
          If you have any inquiries, please feel free to email me at:
          mrdarrellroberts@gmail.com.
          <br />
          <br />
          To view the source code, here is the GitHub{" "}
          <Link
            target="_blank"
            className="underline font-bold"
            href="https://github.com/DarrellRoberts/BookClubBrothers_Frontend_NextMigration"
          >
            repo
          </Link>
          .
        </p>
      </div>
      <Image
        className="w-75 aspect-square border-15 border-black"
        src={BerlinMeet2}
        alt="clubmeeting5"
      />
      <div className="flex justify-between w-full px-4">
        <Image
          className={
            darkMode.darkMode
              ? "brightness-50 w-75 scale-y-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
              : "brightness-100 w-75 scale-y-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
          }
          src={Gargoyle}
          alt="gargoyle_with_trumpet"
        />
        <Image
          className={
            darkMode.darkMode
              ? "brightness-50 w-75 scale-y-[-1] scale-x-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
              : "brightness-100 w-75  scale-y-[-1] scale-x-[-1] max-lg:w-50 max-lg:h-50 max-sm:w-25 max-sm:h-25"
          }
          src={Gargoyle}
          alt="gargoyle_with_trumpet"
        />
      </div>
    </div>
  )
}

export default Club
