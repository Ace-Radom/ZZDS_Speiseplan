async function getMenu(){
    try {
        let response = await fetch("https://ace-radom.github.io/ZZDS_Speiseplan/data/menu.json");
        let menuData = await response.json();
        menuData.last_update = new Date(menuData.last_update * 1000);
        return menuData;
    } catch (error) {
        console.error("Read menu.json failed.", error);
        return null;
    }
}

function getWeekdays(today){
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
        weekdays.push(`${thisDate}.${thisMonth}`);
    }

    return weekdays;
}

function populateMenu(elemId, data){
    const menuTable = document.getElementById(elemId);

    const eCell = document.createElement('td');
    const evCell = document.createElement('td');
    eCell.innerHTML = `<strong>${data.e}</strong>`;
    evCell.innerHTML = `<strong>${data.ev}</strong>`;
    const rowE = document.createElement('tr');
    rowE.appendChild(eCell);
    rowE.appendChild(evCell);

    const dCell = document.createElement('td');
    const dvCell = document.createElement('td');
    dCell.innerHTML = `<p class="dessert">${data.d}</p>`;
    dvCell.innerHTML = `<p class="dessert">${data.dv}</p>`;
    const rowD = document.createElement('tr');
    rowD.appendChild(dCell);
    rowD.appendChild(dvCell);
    
    menuTable.appendChild(rowE);
    menuTable.appendChild(rowD)
}

document.addEventListener("DOMContentLoaded", async function() {
    let menu = await getMenu();
    let weekdays = getWeekdays(menu.last_update);

    document.getElementById("date_interval").innerHTML = `Mo. ${weekdays[0]} ~ Fr. ${weekdays[4]}, ${menu.last_update.getFullYear()}`
    document.getElementById("date_mo").innerHTML = `Montag (${weekdays[0]})`;
    document.getElementById("date_di").innerHTML = `Dienstag (${weekdays[1]})`;
    document.getElementById("date_mi").innerHTML = `Mittwoch (${weekdays[2]})`;
    document.getElementById("date_do").innerHTML = `Donnerstag (${weekdays[3]})`;
    document.getElementById("date_fr").innerHTML = `Freitag (${weekdays[4]})`;
    let formatter = new Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    document.getElementById("date_last_update").innerHTML = `Letztes Update: ${formatter.format(menu.last_update)}`;

    populateMenu("menu_table_mo", menu.menu[0]);
    populateMenu("menu_table_di", menu.menu[1]);
    populateMenu("menu_table_mi", menu.menu[2]);
    populateMenu("menu_table_do", menu.menu[3]);
    populateMenu("menu_table_fr", menu.menu[4]);

    let today = new Date();
    let dateDiff = today.getTime() - menu.last_update.getTime();
    dateDiff = Math.floor(dateDiff / 86400000);
    if (dateDiff < 7 && dateDiff >= 0 && today.getDay() >= menu.last_update.getDay())
    {
        switch (today.getDay())
        {
            case 1: document.getElementById("menu_mo").classList.replace("menu-day", "menu-today"); break;
            case 2: document.getElementById("menu_di").classList.replace("menu-day", "menu-today"); break;
            case 3: document.getElementById("menu_mi").classList.replace("menu-day", "menu-today"); break;
            case 4: document.getElementById("menu_do").classList.replace("menu-day", "menu-today"); break;
            case 5: document.getElementById("menu_fr").classList.replace("menu-day", "menu-today"); break;
            default: break;
        }
    }
});
