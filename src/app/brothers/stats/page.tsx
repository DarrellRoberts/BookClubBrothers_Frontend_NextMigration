import "../../../style/brotherStats.css"

async function getUserData() {
    const response = await fetch("https://bookclubbrothers-backend.onrender.com/users", { method: "GET"});
    return response.json();
}

async function getBookData() {
    const response = await fetch("https://bookclubbrothers-backend.onrender.com/books", { method: "GET"});
    return response.json();
}

const BrothersStats: React.FC = async () => {
const userPromise = getUserData();
const bookPromise = getBookData();

const user = await userPromise;
const book = await bookPromise;

const readBooks = book.filter((book) => book.read === true);

// const percentageBooks = parseFloat(((findUser?.userInfo?.books?.score?.length / readBooks?.length) * 100).toFixed(2));
//   const averageScore = parseFloat(
//     (
//       findUser?.userInfo?.books?.score?.reduce((a, c) => a + c, 0) /
//       findUser?.userInfo?.books?.score?.length
//     ).toFixed(2)
//   );

console.log(user)
return (
<>
<h1 className="statsTitle">Brothers Stats</h1>
<div className="leagueCon">
<div className="leagueTable">
    <div className="usernameColumn">
        <h2>Username</h2>
        {user?.map((title, index) => (
        <h2 key={index}>{title.username}</h2>
        ))}
    </div>
    <div className="booksReadColumn">
        <h2>Books read %</h2>
        {user?.map((title, index) => (
        <h2 key={index}>{parseFloat((title.userInfo?.books?.score?.length/readBooks?.length * 100).toFixed(2))}</h2>
        ))}
    </div>
</div>
</div>
</>
    )
}

export default BrothersStats