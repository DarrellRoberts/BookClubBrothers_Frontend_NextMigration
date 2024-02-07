import Link from "next/link"

const HeaderLinks: React.FC = () => {
return (
<>
{/* <div className="headerLinks"> */}
    <div className="bookMenu">
    <Link href="/books">Book</Link>
    <ul className="bookHover">
        <li><Link href="/books/library">Book Library</Link></li>
        <li><Link href="/books/randomiser">Book Randomiser</Link></li>
        <li><Link href="/books/quiz">Quiz</Link></li>
        <li className="w-[85%]"><Link href="/books/stats">Book Stats</Link></li>
    </ul>
    </div>

    <Link href="/club">Club</Link>

    <Link href="/brothers">Brothers</Link>
{/* </div> */}

{/* <div className="bookHover">

</div>  */}
</>
)
}

export default HeaderLinks