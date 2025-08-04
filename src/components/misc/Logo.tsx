import Link from "next/link"
import React from "react"
import Image from "next/image"

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/book-club-logo.svg"
        alt="book_club_logo"
        width={75}
        height={75}
        className="mr-6 grayscale"
      />
    </Link>
  )
}

export default Logo
