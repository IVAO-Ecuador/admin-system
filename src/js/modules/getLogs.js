import { adminPage, adminSection, optionSection, staffInfoSection, titleSection } from "./adminPage.js";

export const getLogs = async (staffInfo) => {

    /* Main change */
    titleSection.innerHTML = `<h1>Registros de actividad</h1></h1>
    <button class='goBackButton'>Volver atrás</button>`;
    optionSection.remove();

    const goBackButton = document.querySelector(".goBackButton");
    goBackButton.addEventListener("click", () => {
        adminPage(staffInfo);
    })

    /** Variables */
    let logsArray = [], countLogs;

    await fetch("/logs")
    .then(response => response.json())
    .then(data => logsArray = data);

    countLogs = logsArray.length;

    const logsSection = document.createElement("div");
    logsSection.className = "logsSection";
    logsSection.innerHTML = `
    
    <p class='totalLogs'>Se encontraron ${countLogs} registros de actividad reciente</p>

    <table id='results'>
        <tr>
            <th class='adjustWidth firstTD' style='--aw: 50px; --aw1440: 100px'>VID</th>
            <th class='adjustWidth' style='--aw: 150px; --aw1440: 250px'>Nombre</th>
            <th class='adjustWidth' style='--aw: 350px; --aw1440: 150px'>Descripción</th>
            <th class='adjustWidth lastTD' style='--aw: 50px; --aw1440: 150px'>Fecha</th>
        </tr>
    </table>`

    adminSection.insertBefore(logsSection, staffInfoSection);

    const logsTable = document.querySelector("#results > tbody");


    if(logsArray != "NoResults"){
        logsArray.forEach(log => {

            const rowElement = document.createElement('tr');
            rowElement.className = "logRow";
            rowElement.innerHTML = `
                <td class='firstTD'>${log.vid}</td>
                <td>${log.nombre}</td>
                <td>${log.descripcion}</td>
                <td class='lastTD'>${log.fecha}</td>
            `

            logsTable.appendChild(rowElement);
        })
    }
}