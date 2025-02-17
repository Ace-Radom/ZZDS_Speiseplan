function getWeekdays(){
    let today = new Date();
    let day = today.getDay();

    let monday = new Date(today);
    monday.setDate(today.getDate() - (day == 0 ? 6 : day - 1));

    let weekdays = [];
    for (let i = 0; i < 5; i++)
    {
        let thisWeekDay = new Date(monday);
        thisWeekDay.setDate(monday.getDate() + i);
        thisMonth = thisWeekDay.getMonth() + 1;
        thisDate = thisWeekDay.getDate();
        thisMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;
        thisDate = thisDate < 10 ? `0${thisDate}` : thisDate;
        weekdays.push(`${thisDate}/${thisMonth}`);
    }

    return weekdays;
}

document.addEventListener("DOMContentLoaded", function() {
    let weekdays = getWeekdays();

    document.getElementById("date_interval").textContent = `Mo. ${weekdays[0]} ~ Fr. ${weekdays[4]}, ${new Date().getFullYear()}`
    document.getElementById("date_mo").textContent = `Montag (${weekdays[0]})`;
    document.getElementById("date_di").textContent = `Dienstag (${weekdays[1]})`;
    document.getElementById("date_mi").textContent = `Mittwoch (${weekdays[2]})`;
    document.getElementById("date_do").textContent = `Donnerstag (${weekdays[3]})`;
    document.getElementById("date_fr").textContent = `Freitag (${weekdays[4]})`;
});
