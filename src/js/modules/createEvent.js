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
        <p class='eventDate' id='preview_dateText'>Martes 10 de Agosto de 2022</p>
        <img src="./src/assets/ejem.png" id='preview_img'>
        <div>
            <h3 id='preview_title'>Este es un titulo de prueba usado en esta tarjeta de previsualización!</h3>
            <p id='preview_desc'>En este espacio irá la descripción del evento, asegúrate de una correcta escritura para su buen entendimiento.
             Más abajo estarán los detalles del evento como el el lugar, hora y estado. Estos datos luego podrán ser cambiados en el editor de eventos.
             Todo evento primero deberá ser aprobado antes de ser publicado.
             </p>
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
            <input type='text' id='eventName' placeholder='Escribe el titulo para el evento'>

            <label>Descripcion del evento</label>
            <input type='text' id='eventDesc' placeholder='Describe el evento aquí'>

            <label>Link de la imagen <a href='https://imgur.com/'>(Imgur)</a></label>
            <input type='text' id='eventImg' placeholder='Pega aqui el link Imgur de la imagen del evento'>

            <div class='form-section' style='--sc: 2;'>
                <div>
                    <label>Fecha del evento (Texto)</label>
                    <input type='text' id='eventDateText' placeholder='25 de agosto de 2022' maxlength="35">
                </div>

                <div>
                    <label>Fecha del evento (Seleccionar)</label>
                    <input type='date' id='eventDate' placeholder='25/08/2022'>
                </div>
            </div>

            <div class='form-section' style='--sc: 3;'>
                <div>
                    <label>Hora del evento</label>
                    <input type='text' id='eventHour' placeholder='19:00z - 20:00z' maxlength="15">
                </div>
                <div>
                    <label>Lugares del evento</label>
                    <input type='text' id='eventPlaces' placeholder='SEQM - SEGU' maxlength="20" min="2017-01-01">
                </div>
                <div>
                    <label>Estado del evento</label>
                    <select id='eventStatus' placeholder=''>
                        <option value='Activo' selected>Activo</option>
                        <option value='Inactivo'>Inactivo</option>
                        <option value='Finalizado'>Finalizado</option>
                    </select>
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

    var fecha = new Date();
    var year = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth() + 1;
    if(_mes < 10){
        var mes = "0" + _mes;
    }else{
        var mes = _mes.toString;
    }
    document.getElementById("eventDate").min = year+'-'+mes+'-'+dia; 

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

    eventStatus.addEventListener("change", () => {
        preview_status.innerHTML = eventStatus.value;
    });

}