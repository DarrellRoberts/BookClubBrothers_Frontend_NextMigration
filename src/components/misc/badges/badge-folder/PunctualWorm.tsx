/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import PunctualWormImage from "@/assets/badges/Badge-punctual-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";
import { Badge } from "antd";

type Props = {
  punctualWorm: number;
};

const PunctualWorm: React.FC<Props> = ({ punctualWorm }) => {
  const badge = PunctualWormImage.src;

  const content = (
    <>
      <p>Scored a book before the book meeting date</p>
      <Link className="underline" href="/club/badges">
        what's this?
      </Link>
    </>
  );
  return (
    <>
      {punctualWorm ? (
        <Badge color="#005c00" count={punctualWorm}>
          <BadgeTemplate
            title={`Mad Hatter Worm (x${punctualWorm})`}
            content={content}
            badgeImageURL={badge}
          />
        </Badge>
      ) : null}
    </>
  );
};

export default PunctualWorm;
