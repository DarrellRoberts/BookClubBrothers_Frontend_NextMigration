import Link from "next/link"
import {useState} from "react"

const HeaderLinksMobile: React.FC = () => {
const [showMenu, setShowMenu] = useState(false)
return (
<>
<span
onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)} 
className="text-4xl">|||</span>
{showMenu ? (
<>
<div className="headerLinksMobile">
    <div className="bookMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/books" onClick={() => setShowMenu(false)}>Book</Link>
    <ul>
        <li onClick={() => setShowMenu(false)}><Link href="/books/library">Book Library</Link></li>
        <li onClick={() => setShowMenu(false)}><Link href="/books/randomiser">Book Randomiser</Link></li>
        <li onClick={() => setShowMenu(false)}><Link href="/books/quiz">Quiz</Link></li>
        <li className="w-[85%]" onClick={() => setShowMenu(false)}><Link href="/books/stats">Book Stats</Link></li>
    </ul>
    </div>

    <div className="clubMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/club" onClick={() => setShowMenu(false)}>Club</Link>
    </div>

    <div className="brothersMenuMobile">
    <div className="bookMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/brothers" onClick={() => setShowMenu(false)}>Brothers</Link>
    <ul>
        <li onClick={() => setShowMenu(false)}><Link href="/brothers/library">Brothers Library</Link></li>
        <li className="w-[85%]" onClick={() => setShowMenu(false)}><Link href="/brothers/stats">Brothers Stats</Link></li>
    </ul>
    </div>
    </div>
    </div>
</>
) : null}
</>
)
}

export default HeaderLinksMobile