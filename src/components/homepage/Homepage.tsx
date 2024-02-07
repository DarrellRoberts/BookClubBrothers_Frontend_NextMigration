import "../../style/homepage.css"
import "../../style/homepageRes.css"
import Link from "next/link"

const Homepage: React.FC = () => {
    return (
        <>
        <div className="flex justify-center mt-10 text-center">
        <h1 className="homepageTitle">The Book Club Brothers</h1>
        </div>

        <div className="brothersCon">
        
        <div className="book">

            <Link href="/books">
            <div className="bookEgg">
                <h2 className="mt-5">Book</h2>
            </div>
            </Link>


            <Link href="/club">
            <div className="clubEgg">
                <h2 className="mt-5">Club</h2>
            </div>
            </Link>

            <Link href="/brothers">
            <div className="brothersEgg">
                <h2 className="mt-10">Brothers</h2>
            </div>
            </Link>

        </div>

        </div>

        </>
    )
}

export default Homepage