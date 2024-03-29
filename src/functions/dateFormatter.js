// use date string as argument
function dateFormatter(dateValue) {
    let dateString = dateValue?.split('T')[0];
    const date = new Date(dateString);
    console.log("Date line 3:  " + date)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"]
    const monthName = monthsOfYear[date.getMonth()];
    console.log("Month Name, Line 7:" + monthName)
    const dayName = daysOfWeek[date.getDay()];
    console.log("Day Name, Line 9:" + monthName)
    const year = date.getUTCFullYear();
    const day = date.getUTCDate().toString().padStart(2, '0');
    console.log("Day Name, Line 11" + monthName)
    const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
    return formattedDate;
}

export { dateFormatter };