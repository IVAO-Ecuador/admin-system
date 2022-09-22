import { adminPage, adminSection, optionSection, staffInfoSection, titleSection } from "./adminPage.js";

export const createEvent = (staffInfo) => {

    /* Main change */
    titleSection.innerHTML = `<h1>Crear un nuevo evento</h1></h1>
    <button class='goBackButton'>Volver atrás</button>`;
    optionSection.remove();

    /* Adding an event listener to the button. */
    const goBackButton = document.querySelector(".goBackButton");
    goBackButton.addEventListener("click", () => {
        adminPage(staffInfo);
    });


    const createEventsSection = document.createElement("div");
    createEventsSection.className = "createEventsSection";
    createEventsSection.innerHTML = `
    

    <div class='cardEventPreview'>
        <p class='eventDate'>Martes 10 de Agosto de 2021</p>
        <img src="./src/assets/ejem.png">
        <div>
            <h3>RFE event for the first anniversary of the Ecuador division in IVAO!</h3>
            <p>To celebrate our first anniversary being part of IVAO, we want to invite you to participate in an "ECUADOR RFE" that will take place on July 10th at our two main airports (SEQM and SEGU) in the time slot from 19z to 23z. For this, we have arranged a flight reservation system so that you as a pilot can select a flight for that day.</p>
            <div>
                <span>19:00z - 20:00z</span>
                <span>SEQM - SEMT</span>
                <span>Activo</span>
            </div>
        </div>
    </div>

    <div class='eventForm'>
        <form>
            <p>Formulario para crear evento</p>

            <label>Titulo del evento</label>
            <input>

            <label>Descripcion del evento</label>
            <input>

            <label>Link de la imagen (Imgur)</label>
            <input>

            <label>Fecha del evento (Texto)</label>
            <input>

            <label>Fecha del evento (Seleccionar)</label>
            <input>

            <label>Hora del evento</label>
            <input>

            <label>Lugares del evento</label>
            <input>

            <label>Estado del evento</label>
            <input>
        </form>
    </div>

    `;

    adminSection.insertBefore(createEventsSection, staffInfoSection);

}