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
        <p class='eventDate' id='preview_dateText'>Martes 10 de Agosto de 2021</p>
        <img src="./src/assets/ejem.png" id='preview_img'>
        <div>
            <h3 id='preview_title'>RFE event for the first anniversary of the Ecuador division in IVAO!</h3>
            <p id='preview_desc'>To celebrate our first anniversary being part of IVAO, we want to invite you to participate in an "ECUADOR RFE" that will take place on July 10th at our two main airports (SEQM and SEGU) in the time slot from 19z to 23z. For this, we have arranged a flight reservation system so that you as a pilot can select a flight for that day.</p>
            <div>
                <span id='preview_hour'>19:00z - 20:00z</span>
                <span id='preview_places'>SEQM - SEMT</span>
                <span id='preview_status'>Activo</span>
            </div>
        </div>
    </div>

    <div class='eventForm'>
        <form>
            <h3>Formulario para crear evento</h3>

            <label>Titulo del evento</label>
            <input type='text' id='eventName'>

            <label>Descripcion del evento</label>
            <input type='text' id='eventDesc'>

            <label>Link de la imagen <a href='https://imgur.com/'>(Imgur)</a></label>
            <input type='text' id='eventImg'>

            <div class='form-section' style='--sc: 2;'>
                <div>
                    <label>Fecha del evento (Texto)</label>
                    <input type='text' id='eventDateText'>
                </div>

                <div>
                    <label>Fecha del evento (Seleccionar)</label>
                    <input type='date' id='eventDate'>
                </div>
            </div>

            <div class='form-section' style='--sc: 3;'>
                <div>
                    <label>Hora del evento</label>
                    <input type='text' id='eventHour'>
                </div>
                <div>
                    <label>Lugares del evento</label>
                    <input type='text' id='eventPlaces'>
                </div>
                <div>
                    <label>Estado del evento</label>
                    <input type='text' id='eventStatus'>
                </div>
            </div>

            <button class='createEventButton'>Crear evento</button>

        </form>
    </div>

    `;

    adminSection.insertBefore(createEventsSection, staffInfoSection);

    const eventName = document.querySelector("#eventName");
    const eventDesc = document.querySelector("#eventDesc");
    const eventImg = document.querySelector("#eventImg");
    const eventDateText = document.querySelector("#eventDateText");
    const eventDate = document.querySelector("#eventDate");
    const eventHour = document.querySelector("#eventHour");
    const eventPlaces = document.querySelector("#eventPlaces");
    const eventStatus = document.querySelector("#eventStatus");

    const preview_dateText = document.querySelector("#preview_dateText");
    const preview_img = document.querySelector("#preview_img");
    const preview_title = document.querySelector("#preview_title");
    const preview_desc = document.querySelector("#preview_desc");
    const preview_hour = document.querySelector("#preview_hour");
    const preview_places = document.querySelector("#preview_places");
    const preview_status = document.querySelector("#preview_status");


    eventName.addEventListener("keyup", () => {
        preview_title.innerHTML = eventName.value;
    });

    eventDesc.addEventListener("keyup", () => {
        preview_desc.innerHTML = eventDesc.value;
    });

    eventImg.addEventListener("keyup", () => {
        preview_img.src = eventImg.value;
    });

    eventDateText.addEventListener("keyup", () => {
        preview_dateText.innerHTML = eventDateText.value;
    });

    eventHour.addEventListener("keyup", () => {
        preview_hour.innerHTML = eventHour.value;
    });

    eventPlaces.addEventListener("keyup", () => {
        preview_places.innerHTML = eventPlaces.value;
    });

    eventStatus.addEventListener("keyup", () => {
        preview_status.innerHTML = eventStatus.value;
    });

}