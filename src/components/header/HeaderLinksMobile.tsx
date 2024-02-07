import Link from "next/link"
import {useState} from "react"

const HeaderLinksMobile: React.FC = () => {
const [showMenu, setShowMenu] = useState(false)
return (
<>
{/* <div className="headerLinksMobCon"> */}
<span
onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)} 
className="text-4xl">|||</span>
{showMenu ? (
<>
<div className="headerLinksMobile">
    <div className="bookMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/books">Book</Link>
    <ul>
        <li><Link href="/books/library">Book Library</Link></li>
        <li><Link href="/books/randomiser">Book Randomiser</Link></li>
        <li><Link href="/books/quiz">Quiz</Link></li>
        <li className="w-[85%]"><Link href="/books/stats">Book Stats</Link></li>
    </ul>
    </div>

    <div className="clubMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/club">Club</Link>
    </div>

    <div className="brothersMenuMobile">
    <Link className="underline ml-5 text-3xl" href="/brothers">Brothers</Link>
    </div>
    </div>
{/* </ul> */}

{/* <div className="bookHover">
</div> */}
</>
) : null}
{/* </div> */}
</>
)
}

export default HeaderLinksMobile