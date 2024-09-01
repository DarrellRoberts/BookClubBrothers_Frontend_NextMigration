/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/react-in-jsx-scope */
import Meeting1 from "../../../assets/clubimages/meeting1.jpg";
import Meeting2 from "../../../assets/clubimages/meeting2.jpg";
import Meeting3 from "../../../assets/clubimages/meeting3.jpg";
import BerlinMeet1 from "../../../assets/clubimages/berlinMeet1.jpg";
import BerlinMeet2 from "../../../assets/clubimages/berlinMeet2.jpg";
import Image from "next/image";
import "../../../style/club.css";
import "../../../style/clubRes.css";

const Club: React.FC = () => {
  return (
    <div className="clubGridCon flex justify-center ml-10 mt-10">
      <div className="clubGrid">
        <Image className="clubImage1" src={Meeting1} alt="clubmeeting1" />
        <h1 className="clubTitle text-center">The Club</h1>
        <Image className="clubImage2" src={BerlinMeet1} alt="clubmeeting4" />
        <div className="clubInfo">
          <p className="text-center">
            Many years ago, we all went to Oxted Secondary School in a little,
            posh town called Oxted, which resides in Surrey, England. This is
            where well met. Fast forward to late 2020, in the early mist and
            confusion of the Covid pandemic, upon a long discussion we all
            realised we were wannabe book worms. By then, I (Darrell) had just
            moved to Berlin and was rarely in the UK, meanwhile Hugo was about
            to move to Australia, and Seb and Josh had plans to travel the
            world. Perhaps influenced by the social isolation of Covid, we
            decided to form a book club primarily as a way of staying in
            contact. We never took it too seriously and with every online
            meeting, we spent 50% of the time talking about the book, and the
            other half catching up.
            <br />
            <br />
            Nevertheless, we still scored each book and Josh took care of the
            book graphics which you can view in the{" "}
            <a
              target="_blank"
              href="/books/library"
              className="underline font-bold"
            >
              book library
            </a>
            . It was then a matter of discussion what the next book would be. By
            2024 we had read and scored 12 books, and had no plans in stopping.
            However, this created a problem. We had all this data of scores and
            graphics but it was only stored on our whatsapp group. This made it
            a nightmare if we wanted to review scores from years ago. Hence, I
            came up with the idea of creating a website, so that anytime, any
            one of us could visit this site.
            <br />
            <br />
            As I created a Fullstack application for this purpose, it meant
            anything was possible. For example, I could store the data as a json
            via a database platform and create my own API. With this API, I
            could manipulate the data however I saw fit, such as calculating our
            average rating, whether we read all the books and what were our best
            and most hated. I did just that, and you can view our stats, for
            example,{" "}
            <a
              target="_blank"
              className="underline font-bold"
              href="/brothers/stats"
            >
              {" "}
              here
            </a>
            . Furthermore, I could add CRUD operations and user login, meaning
            we could rate the book and add another directly on the website.
            <br />
            <br />
            This of course is just a small example of what is possible, and what
            I achieved so far on this website. We are always coming up with ideas
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
            <a
              target="_blank"
              className="underline font-bold"
              href="https://github.com/DarrellRoberts/BookClubBrothers_Frontend_NextMigration"
            >
              repo
            </a>
            .
          </p>
        </div>
        <Image className="clubImageWide1" src={Meeting2} alt="clubmeeting2" />
        <Image className="clubImageWide2" src={Meeting3} alt="clubmeeting3" />
        <Image
          className="clubImageWide3"
          src={BerlinMeet2}
          alt="clubmeeting5"
        />
      </div>
    </div>
  );
};

export default Club;
